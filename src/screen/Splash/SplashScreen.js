import React, {useState} from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  MaskedViewIOS,
} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import color from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Video from 'react-native-video';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      showAlert: false,
      alertMsg: '',
      alertTitle: '',
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      this.fetchData();
    }, 1200);
    // this.moveImageUp()
    // this.moveImageDown()
    // this.fadeInOutK()
    // if (this.state.authenticate == false) {
    //     this.touchIdSupport()
    // }
    // else {
    //     this.fadeInHeight()
    //     this.fadeInWidth()
    // }
  }
  fetchData = () => {
    //api to request data
    this.props.complete();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.PRIMARY,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
        }}>
        <Image
          style={{tintColor: color.WHITE,  height: 200, width: 200}}
          resizeMode="contain"
          source={require('../../assets/ally-logo.png')}
        />
        {/* <Video
          source={require('../../assets/splash_loader.mp4')}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          muted={true}
          repeat={false}
          resizeMode="cover"
        /> */}
      </View>
    );
  }
}
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export const isLoggedIn = async () => {
  // let cookie = await AsyncStorage.getItem(storageKeys.COOKIE);
  // if (cookie) {
  // return true;
  // } else {
  return true;
  // }
};
