import React, {Component} from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Animation, Image } from 'react-native';
import colors from '../../constants/colors';
import {getRequest, postRequest, isNetworkConnected} from '../../services/NetworkRequest'
import {Snackbar, Checkbox, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import {MyContext} from '../../navigation/AppNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import GradientButton from '../../component/GradientButton';
import DropDownComponent from '../../component/DropDownComponent';
import urls from '../../constants/urls'

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      showPassword: false,
    };
  }
  changePassword = async() =>{
    const {email, currentPassword, newPassword} = this.state
    console.log('DDD')
    if(isNetworkConnected){
      if(currentPassword.trim() !== ''){
        if(newPassword === confirmNewPassword){
          try {
            const changePasswordBody = JSON.stringify({
              email: email,
              current_pass: currentPassword,
              new_pass:  newPassword
            })
            let response =  await postRequest(urls.PASSWORD_CHANGE, changePasswordBody)
            console.log('response:', response)
          } catch (error) {
            console.log('error:', error)
          }
        }
        else{
          console.log('password do not match')
        }
      }
      else{
        console.log('fill all form')
      }
    }
    else{
      console.log("no internet")
    }
  }

  render() {
    const theme = colors
    return (
      <View style={{flex: 1, backgroundColor: theme.BACKGROUND, paddingHorizontal: 15,}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{tintColor: theme.PRIMARY,  height: 200, width: 200}}
            resizeMode="contain"
            source={require('../../assets/ally-logo.png')}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
          style={styles.textInputStyle}
          value={this.state.currentPassword}
          mode='flat'
          theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
          label='Current Password'
          onChangeText={(currentPassword) => this.setState({ currentPassword: currentPassword })}
          placeholder='Enter your current password'
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
          style={styles.textInputStyle}
          value={this.state.newPassword}
          mode='flat'
          theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
          label='New Password'
          onChangeText={(newPassword) => this.setState({ newPassword: newPassword })}
          placeholder='Enter your new password'
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
          style={styles.textInputStyle}
          value={this.state.confirmNewPassword}
          mode='flat'
          theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
          label='Confirm New Password'
          onChangeText={(confirmNewPassword) => this.setState({ confirmNewPassword: confirmNewPassword })}
          placeholder='Re-enter your new password'
          />
        </View>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
          <GradientButton 
          colorArray={[theme.PRIMARY_LIGHT, theme.PRIMARY_DARK]}
          paddingHorizontal={25}
          paddingVertical={10}
          btnWidth={DeviceWidth / 1.2}
          borderRadius={5}
          MiddleComponent={() =><Text style={{color: theme.TEXT_WHITE, fontSize: 18}}>Change Password</Text>}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChangePassword;
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: colors.WHITE, 
    paddingHorizontal: 10, 
    fontSize: 15 
  },
  textInputContainer: {
    borderWidth: 1, 
    borderColor: colors.BORDER, 
    elevation: 5, 
    marginVertical: 10
  },
});
