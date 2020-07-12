import React, { Component,useRef } from 'react';
import { Text, View, ScrollView, FlatList, Modal,Button, StyleSheet,PanResponder,Alert,Share } from 'react-native';
import { Card, Icon,Input,Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
})

function RenderDish(props) {

    const viewRef = useRef(null);

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    const recognizeDrag = ({ dx }) => {
        if (dx < -200) return true; // Right to left
        return false;
      };
    
    const recognizeComment = ({ dx }) => {
        if (dx > 200) return true; // Left to right
        return false;
      };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            viewRef.current.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
            },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            else if (recognizeComment(gestureState)) {
                    props.openCommentForm();
                  }

            return true;
        }
    })

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                                ref={viewRef} 
                                {...panResponder.panHandlers}
                >
                    <Card
                        featuredTitle={dish.name}
                        image={{uri: baseUrl + dish.image}}>
                            <Text style={{margin: 10}}>
                                {dish.description}
                            </Text>
                        <View style={styles.iconContainer}>
                            <Icon
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                />
                            <Icon 
                                raised
                                name="pencil"
                                type='font-awesome'
                                color='#512DA8'
                                onPress={()=>props.openCommentForm()}

                                />
                            <Icon
                                raised
                                reverse
                                name='share'
                                type='font-awesome'
                                color='#51D2A8'
                                // style={styles.cardItem}
                                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                            />
                        </View>       
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;

    
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={10}
                            startingValue={item.rating}
                            style={styles.rating}
                            readonly={true}
                            />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {


    constructor(props){
        super(props);
        this.state = {
        rating: '',
          author: 0,
          comment: '',
          showCommentForm: false
        }
    }



    openCommentForm() {
        this.setState({ showCommentForm: true });
      }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    closeCommentForm() {
        this.setState({ showCommentForm: false });
      }
    
    handleComment(dishId) {
        const { postComment } = this.props;
        const { author, comment, rating } = this.state;
        postComment(dishId, rating, author, comment);
        console.log(dishId);
        console.log(rating);
        console.log(author);
        console.log(comment);
      }

    render() {

        const { showCommentForm } = this.state;
        const dishId = this.props.route.params.dishId;
        
        return(           
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    openCommentForm={() => this.openCommentForm()}
                    />
                
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={showCommentForm}
                    onDismiss={() => this.closeCommentForm()}
                    onRequestClose={() => this.closeCommentForm()}
                    >
                    <Text style={styles.modalTitle}>Add Your Comment</Text>
                    <View style={{margin:10}} >
                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={40}
                            showRating
                            onFinishRating={rating => this.setState({rating:rating})}
                            />
                    </View>
                    <View >
                    <Input
                        placeholder=' Author'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        onChangeText={author => this.setState({author:author})}
                        />
                    </View>
                    <View>
                    <Input
                        placeholder=' Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        onChangeText={comment => this.setState({comment:comment})}
                        />
                    </View>

                    <View style={{marginLeft:10,marginRight:10,marginBottom:20}}>
                        <Button
                        onPress={() => {
                            {this.handleComment(dishId);this.closeCommentForm()}
                        }}
                        color="#512DA8"
                        title="Submit"
                        />
                    </View>

                    <View style={{marginLeft:10,marginRight:10}}>
                        <Button
                        onPress={() => {
                            this.closeCommentForm();
                        }}
                        color="#D3D3D3"
                        title="Cancel"
                        />
                    </View>    
                   
                </Modal>

                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    iconContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20,
      },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
      },
    rating: {
        alignSelf: "flex-start"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);