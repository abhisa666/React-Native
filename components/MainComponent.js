import React , {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import LoginTabNavigator from './LoginComponent';
import { View,Text,Image,StyleSheet,ToastAndroid,Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList ,DrawerContentScrollView } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import * as Notifications from 'expo-notifications';


import {Icon} from 'react-native-elements';

//Redux Implementation
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

// import { baseUrl } from '../shared/baseUrl';
// Not required tho
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContentComponent (props) {

    return(
    <DrawerContentScrollView {...props} >
      <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
    );
}   

function HomeNavigator(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions= { ({navigation}) => ({

                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#512DA8' },
                headerTitleStyle: { color: "#fff"},
                headerLeft: () => (
                                 <Icon name="menu" size={27}
                                         color='white'
                                         onPress={()=>navigation.toggleDrawer()} 
                                 />),

            }) }
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

function ContactNavigator(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions= { ({navigation}) => ({

                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#512DA8' },
                headerTitleStyle: { color: "#fff"},
                headerLeft: () => (
                                <Icon name="menu" size={27}
                                        color='white'
                                        onPress={()=>navigation.toggleDrawer()} 
                                />)

            }) }
        >
            <Stack.Screen name="Contact Us" component={Contact}  />
        </Stack.Navigator>
    );
}

function AboutNavigator(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions= { ({navigation}) => ({

                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#512DA8' },
                headerTitleStyle: { color: "#fff"},
                headerLeft: () => (
                                <Icon name="menu" size={27}
                                        color='white'
                                        onPress={()=>navigation.toggleDrawer()} 
                                />)

            }) }
        >
            <Stack.Screen name="About Us" component={About}  />
        </Stack.Navigator>
    );
}

function ReservationNavigator(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions= { ({navigation}) => ({

                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#512DA8' },
                headerTitleStyle: { color: "#fff"},
                headerLeft: () => (
                                <Icon name="menu" size={27}
                                        color='white'
                                        onPress={()=>navigation.toggleDrawer()} 
                                />)

            }) }
        >
            <Stack.Screen name="Reserve Table" component={Reservation}  />
        </Stack.Navigator>
    );
}

function FavoriteNavigator(){
    return(
        <Stack.Navigator
            headerMode="screen"
            screenOptions= { ({navigation}) => ({

                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#512DA8' },
                headerTitleStyle: { color: "#fff"},
                headerLeft: () => (
                                <Icon name="menu" size={27}
                                        color='white'
                                        onPress={()=>navigation.toggleDrawer()} 
                                />)

            }) }
        >
            <Stack.Screen name="Favorites" component={Favorites}  />
        </Stack.Navigator>
    );
}

function LoginNavigator(){
    return(
        <Stack.Navigator
            
            headerMode="screen"
            screenOptions= { ({navigation}) => ({
                headerTitle:" ",
                headerTintColor: '#fff',
                headerStyle: { backgroundColor: '#512DA8' },
                headerTitleStyle: { color: "#fff"},
                headerLeft: () => (
                                <Icon name="menu" size={27}
                                        color='white'
                                        onPress={()=>navigation.toggleDrawer()} 
                                />)

            }) }
        >
            <Stack.Screen name="Login"  component={LoginTabNavigator}  />
            {/* <Tab.Screen name="Register" component={RegisterTab} /> */}
        </Stack.Navigator>
    );
}


function MenuNavigator(){
    return(
        <Stack.Navigator
                        initialRouteName="Menu"
                        headerMode="screen"
                        screenOptions={{
                            headerTintColor: '#fff',
                            headerStyle: { backgroundColor: '#512DA8' },
                            headerTitleStyle: { color: "#fff"},
                        }}
                    >
                    <Stack.Screen name="Menu" component={Menu} 
                                options={({navigation})=>({
                                    headerLeft: () => (
                                        <Icon name="menu" size={27}
                                        color='white'
                                        onPress={()=>navigation.toggleDrawer()} 
                                        />
                                    )
                                })}
                    />
                    <Stack.Screen name="Dishdetail" component={Dishdetail} options={{ title: 'Dish Details' }} />
                    
        </Stack.Navigator>
    );
}

class Main extends Component{

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

      

        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type, ToastAndroid.LONG)
        });
        
        NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
        window.value=NetInfo.addEventListener((connectionInfo)=>this.handleConnectivityChange(connectionInfo)) ;
        // NetInfo.fetch()
        // .then((connectionInfo) => {
        //     ToastAndroid.show('Initial Network Connectivity Type: '
        //         + connectionInfo.type,
        //         ToastAndroid.LONG)
        // });

        // // NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
        // window.value=NetInfo.addEventListener((connectionInfo)=>this.handleConnectivityChange(connectionInfo)) ;
    }


    componentWillUnmount() {
        window.value();
        // NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }

handleConnectivityChange = (connectionInfo) => {
      switch (connectionInfo.type) {
          case 'none': 
              ToastAndroid.show ('You are now offline', ToastAndroid.LONG);
              break;
          case 'wifi':
              ToastAndroid.show ('You are now on WiFi', ToastAndroid.LONG);
              break;
          case 'cellular':
              ToastAndroid.show ('You are now on Cellular', ToastAndroid.LONG);
              break;
          case 'unknown' :
              ToastAndroid.show ('You are now have an Unknown connection', ToastAndroid.LONG);
              break;
          default: 
      }
  }

    
    render(){
        return(
            
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home"
                    drawerStyle={{backgroundColor: '#D1C4E9' }}
                    drawerContent={CustomDrawerContentComponent}
                >


                    <Drawer.Screen name="Login" component={LoginNavigator}
                                   options={{ drawerIcon : ({tintColor}) => (
                                       <Icon name='sign-in'
                                             type='font-awesome'
                                             size={24}
                                             color= {tintColor} />   
                                   ) }}
                    />

                    <Drawer.Screen name="Home" component={HomeNavigator}
                                   options={{ drawerIcon : ({tintColor}) => (
                                       <Icon name='home'
                                             type='font-awesome'
                                             size={24}
                                             color= {tintColor} />   
                                   ) }}
                    />
                    <Drawer.Screen name="About Us" component={AboutNavigator}
                                    options={{ drawerIcon : ({tintColor}) => (
                                        <Icon name='info-circle'
                                              type='font-awesome'
                                              size={24}
                                              color= {tintColor} />   
                                    ) }}
                    />
                    <Drawer.Screen name="Menu" component={MenuNavigator} 
                                    options={{ drawerIcon : ({tintColor}) => (
                                        <Icon name='list'
                                              type='font-awesome'
                                              size={24}
                                              color= {tintColor} />   
                                    ) }}
                    />
                    <Drawer.Screen name="Contact Us" component={ContactNavigator} 
                                    options={{ drawerIcon : ({tintColor}) => (
                                        <Icon name='address-card'
                                              type='font-awesome'
                                              size={22}
                                              color= {tintColor} />   
                                    ) }}
                    />

                    <Drawer.Screen name="My Favorites" component={FavoriteNavigator} 
                                    options={{ drawerIcon : ({tintColor}) => (
                                        <Icon name='heart'
                                              type='font-awesome'
                                              size={24}
                                              color= {tintColor} />   
                                    ) }}
                    />

                    <Drawer.Screen name="Reserve Table" component={ReservationNavigator} 
                                    options={{ drawerIcon : ({tintColor}) => (
                                        <Icon name='cutlery'
                                              type='font-awesome'
                                              size={24}
                                              color= {tintColor} />   
                                    ) }}
                    />

                    
                </Drawer.Navigator>
                    
            </NavigationContainer>

                

        
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Main);