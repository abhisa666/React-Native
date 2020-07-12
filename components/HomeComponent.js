import React, { Component } from 'react';
import { ScrollView,Text, Animated,Easing, View } from 'react-native';
import { Card } from 'react-native-elements';
// import { DISHES } from '../shared/dishes';
// import { PROMOTIONS } from '../shared/promotions';
// import { LEADERS } from '../shared/leaders';
//Redux Implementation
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

function RenderItem(props) {
    
        const item = props.item;
        
        if (props.isLoading) {
            return(
                    <Loading />
            );
        }
        else if (props.errMess) {
            return(
                <View> 
                    <Text>{props.erreMess}</Text>
                </View>
            );
        }
        else {        
            if (item != null) {
                return(
                    <Card
                        featuredTitle={item.name}
                        featuredSubtitle={item.designation}
                        image={{uri: baseUrl + item.image}}>
                        <Text
                            style={{margin: 10}}>
                            {item.description}</Text>
                    </Card>
                );
            }
            else {
                return(<View></View>);
            }
        }
}

class Home extends Component {

    constructor(props){
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount () {
        this.animate()
    }

    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 8,
            duration: 8000,
            useNativeDriver: true,
            easing: Easing.linear
          }
        ).start(() => this.animate())
    }

    render() {

        const ypos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const ypos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const ypos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200 ]
        })
        
        return(
            
            <ScrollView >

                <Animated.View style={{ width: '100%', transform: [{translateY: ypos1}]}}>
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        isLoading={this.props.dishes.isLoading}
                        erreMess={this.props.dishes.erreMess} 
                        />
                </Animated.View>

                <Animated.View style={{ width: '100%',  transform: [{translateY: ypos2}]}}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        erreMess={this.props.promotions.erreMess} 
                        />
                </Animated.View>

                <Animated.View style={{ width: '100%',  transform: [{translateY: ypos3}]}}>
                    <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        isLoading={this.props.leaders.isLoading}
                        erreMess={this.props.leaders.erreMess} 
                        />

                </Animated.View>
            </ScrollView>
          
        );
    }
}

export default connect(mapStateToProps)(Home);