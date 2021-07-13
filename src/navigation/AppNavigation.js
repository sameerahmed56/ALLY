import React, {useState} from 'react';
import { View, Text, Image, TouchableHighlight, Animated, PanResponder, StatusBar,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import {createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/colors';
import Home from '../screen/BottomNav/HomeScreens/Home';
import Account from '../screen/BottomNav/Account/Account';
import SplashScreen, {isLoggedIn} from '../screen/Splash/SplashScreen';
import Login from '../screen/LoginScreen/Login';
import Signup from '../screen/LoginScreen/Signup';
import VerifyOtp from '../screen/LoginScreen/VerifyOtp';
import { AnimatedTabBarNavigator,IAppearanceOptions , TabButtonLayout, TabElementDisplayOptions, DotSize } from "react-native-animated-nav-tab-bar";
import { color } from 'react-native-reanimated';
import ForgotPassword from '../screen/LoginScreen/ForgotPassword';
import ChangePassword from '../screen/LoginScreen/ChangePassword';
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { switchTheme, newNotification, loggedIn } from '../redux/actions'
import store from '../redux/store'
import GiveHelp from '../screen/BottomNav/HomeScreens/GiveHelp';
import Helps from '../screen/BottomNav/RequestHelpScreens/Helps';
import AddBasicDetails from '../screen/BottomNav/RequestHelpScreens/AddHelpRequest/AddBasicDetails';
import AddImage from '../screen/BottomNav/RequestHelpScreens/AddHelpRequest/AddImage';
import AddPaymentInfo from '../screen/BottomNav/RequestHelpScreens/AddHelpRequest/AddPaymentInfo';
import NotificationScreen from '../screen/BottomNav/Account/NotificationScreen';
import ShowNotification from '../screen/BottomNav/Account/ShowNotification';
const SIZE = 80;

export default class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      LoggedIn: false,
    };
  }

  componentDidMount() {
    // store.dispatch(loggedIn(false))
  }

  logout = async () => {
    let removeItem = [storageKeys.SAVED_CREDENTIALS]; //add key you don't want to delete on logout
    let keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < removeItem.length; i++) {
      keys.splice(keys.indexOf(removeItem[i]), 1);
    }
    await AsyncStorage.multiRemove(keys);
    this.setState({LoggedIn: false});
  };

  login = () => {
    this.setState({LoggedIn: true});
  };

  splashComplete = async () => {
    let loggedInStatus = await isLoggedIn();
    if (loggedInStatus) {
      this.setState({isLoading: false, LoggedIn: true});
    } else {
      this.setState({isLoading: false, LoggedIn: false});
    }
  };

  render() {
    const {isLoading, LoggedIn} = this.state;
    return this.state.isLoading ? (
      <SplashScreen complete={this.splashComplete} />
    ) : (
      <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
        {
          this.props.loggedIn ? 
          <TabNavigator />
          // <LoginStack />
          :
          <TabNavigator />
          // <LoginStack />
        }
        
      </View>
    );
  }
}


const StackNavigator = createStackNavigator();

const LoginStack = props => (
  <StackNavigator.Navigator
    initialRouteName="Signup"
    mode="modal"
    headerMode="none">
    <StackNavigator.Screen name="Login" component={Login} />
    <StackNavigator.Screen name="Signup" component={Signup} />
    <StackNavigator.Screen name="Verify Otp" component={VerifyOtp} />
    <StackNavigator.Screen name="Forgot Password" component={ForgotPassword} />
    <StackNavigator.Screen name="Change Password" component={ChangePassword} />
  </StackNavigator.Navigator>
);
const HomeStack = (props) => (
    <StackNavigator.Navigator
        initialRouteName="Home"
        mode="card"
        headerMode="none"
    >
        <StackNavigator.Screen name="Home" component={Home} />
        <StackNavigator.Screen name="Give Help" component={GiveHelp} />
    </StackNavigator.Navigator>

)
const HelpStack = (props) => (
  <StackNavigator.Navigator
      initialRouteName="Helps"
      mode="card"
      headerMode="none"
  >
      <StackNavigator.Screen name="Helps" component={Helps} />
      <StackNavigator.Screen name="Add Basic Details" component={AddBasicDetails} />
      <StackNavigator.Screen name="Add Image" component={AddImage} />
      <StackNavigator.Screen name="Add Payment Info" component={AddPaymentInfo} />

  </StackNavigator.Navigator>

)
const AccountStack = (props) => (
  <StackNavigator.Navigator
      initialRouteName="Account"
      mode="card"
      headerMode="none"
  >
      <StackNavigator.Screen name="Helps" component={Account} />
      <StackNavigator.Screen name="Notification Screen" component={NotificationScreen} />
      <StackNavigator.Screen name="Show Notification" component={ShowNotification} />

  </StackNavigator.Navigator>

)
const Tab = AnimatedTabBarNavigator();
const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      IAppearanceOptions="float"
      tabBarOptions={{
        // activeTintColor: colors.WHITE,
        activeBackgroundColor: colors.PRIMARY, //60708d
        inactiveBackgroundColor: colors.WHITE, //00223d
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.TEXT_SECONDARY,    
        adaptive: true,
        tabStyle: {marginBottom: 10, marginHorizontal: 10, borderRadius: 50},
        style: {
          height: 55,
        },
      }}
      appearance={{
        // floating: true,
        shadow: true
      }}
      >
      <Tab.Screen name="Home" component={HomeStack} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name={focused ? 'home' : 'home-outline'}
                size={size ? size : 24}
                color={focused ? colors.WHITE : colors.TEXT_SECONDARY}
                focused={focused}
            />
        )
      }}/>
      <Tab.Screen name="Helps" component={HelpStack} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
                name={focused ? 'hands-helping' : 'hand-holding-heart'}
                size={size ? size : 24}
                color={focused ? colors.WHITE : colors.TEXT_SECONDARY}
                focused={focused}
            />
        )
      }}
      />
      <Tab.Screen name="Account" component={AccountStack} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Icon
                name={focused ? 'account' : 'account-outline'}
                size={size ? size : 24}
                color={focused ? colors.WHITE : colors.TEXT_SECONDARY}
                focused={focused}
            />
        )
      }}
      />
    </Tab.Navigator>
  );
};

export const MyContext = React.createContext(
  () => {
      //do nothing 
  }
)
// const mapStateToProps = state => ({
//   theme: state.reducer.theme,
//   notification: state.reducer.newNotification,
//   loggedIn: state.reducer.loggedIn
// })

// const mapDispatchToProps = dispatch => ({
//   switchTheme: bindActionCreators(switchTheme, dispatch),
//   newNotification: bindActionCreators(newNotification, dispatch),
//   loggedIn: bindActionCreators(loggedIn, dispatch)

// })

//function to generate view for bottom nav bar icon with badge
function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <Animatable.View
      animation={badgeCount ? 'rubberBand' : ''}
      iterationCount={'infinite'}
      style={{width: size, height: size, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </Animatable.View>
  );
}
 // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     let iconName;
      //     let imageName;
      //     let sizeIcon = focused ? size + 7 : size;
      //     let colorIcon = focused ? colors.THEME_ORANGE : colors.WHITE; // 51b9db
      //     if (route.name === 'Home') {
      //       // focused ? 'home_active_icon' : 'home_active_icon';
      //       return (
      //         <View style={{justifyContent: 'center', alignItems: 'center'}}>
      //           {focused ? (
      //             <Image source={require('../assets/home_active_icon.png')} />
      //           ) : (
      //             <View
      //               style={{justifyContent: 'center', alignItems: 'center'}}>
      //               <Image
      //                 style={{tintColor: colors.WHITE}}
      //                 source={require('../assets/orders_inactive_icon.png')}
      //               />
      //               <Text style={{color: colors.WHITE}}>Home</Text>
      //             </View>
      //           )}
      //         </View>
      //       );
      //     } else if (route.name === 'Order') {
      //       return (
      //         <View style={{justifyContent: 'center', alignItems: 'center'}}>
      //           {focused ? (
      //             <Image source={require('../assets/orders_active_icon.png')} />
      //           ) : (
      //             <View
      //               style={{justifyContent: 'center', alignItems: 'center'}}>
      //               <Image
      //                 style={{tintColor: colors.WHITE}}
      //                 source={require('../assets/orders_inactive_icon.png')}
      //               />
      //               <Text style={{color: colors.WHITE}}>Orders</Text>
      //             </View>
      //           )}
      //         </View>
      //       );
      //     } else if (route.name === 'Recipe') {
      //       return (
      //         <View style={{justifyContent: 'center', alignItems: 'center'}}>
      //           {focused ? (
      //             <Image
      //               source={require('../assets/recipes_active_icon.png')}
      //             />
      //           ) : (
      //             <View
      //               style={{justifyContent: 'center', alignItems: 'center'}}>
      //               <Image
      //                 style={{tintColor: colors.WHITE}}
      //                 source={require('../assets/recipes_inactive_icon.png')}
      //               />
      //               <Text style={{color: colors.WHITE}}>Recipes</Text>
      //             </View>
      //           )}
      //         </View>
      //       );
      //     } else if ((route.name = 'Recurring')) {
      //       return (
      //         <View style={{justifyContent: 'center', alignItems: 'center'}}>
      //           {focused ? (
      //             <Image
      //               source={require('../assets/recurring_active_icon.png')}
      //             />
      //           ) : (
      //             <View
      //               style={{justifyContent: 'center', alignItems: 'center'}}>
      //               <Image
      //                 style={{tintColor: colors.WHITE}}
      //                 source={require('../assets/recurring_inactive_icon.png')}
      //               />
      //               <Text style={{color: colors.WHITE}}>Recurring</Text>
      //             </View>
      //           )}
      //         </View>
      //       );
      //     }
      //   },
      // })}