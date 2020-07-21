import React , {Component} from 'react';
import {View, FlatList,Text, Button} from 'react-native';
import {Tile} from 'react-native-elements';
import Dishdetail from './DishdetailComponent';

//Redux Implementation
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }


class Menu extends Component{


    render(){

        const renderMenuItem = ({item, index}) => {

            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}> 
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigation.navigate('Dishdetail',{dishId : item.id,})}
                        imageSrc={{ uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };

        const navigation = this.props.navigation;

        if (this.props.dishes.isLoading) {
          return(
              <Loading />
          );
      }
      else if (this.props.dishes.errMess) {
          return(
              <View>            
                  <Text>{props.dishes.errMess}</Text>
              </View>            
          );
      }
      else {
          return (
              <FlatList 
                  data={this.props.dishes.dishes}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id.toString()}
                  />
          );
      }
    }
    
}

export default connect(mapStateToProps)(Menu);