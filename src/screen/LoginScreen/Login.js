import React, {Component} from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Animation, Image } from 'react-native';
import colors from '../../constants/colors';
import {Snackbar, Checkbox, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import {MyContext} from '../../navigation/AppNavigation';
import {postRequest, getRequest, isNetworkConnected} from '../../services/NetworkRequest';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import GradientButton from '../../component/GradientButton';
import DropDownComponent from '../../component/DropDownComponent';
import urls from '../../constants/urls'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fullName: '',
      showPassword: false,
      password: '',
      genderList: [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'}
      ],
      open: false,
      value: null,
    };
  }
  
  login = async() =>{
    const {email, password,} = this.state
    try {
      // const isNetworkConnected = await isNetworkConnected
      // console.log('isNetworkConnected:', isNetworkConnected)
      const loginBody = {
        email: 'sameer.1923co1066@kiet.edu',
        password: '12345'
      }
      let loginResponse = await postRequest(urls.LOGIN, JSON.stringify(loginBody));
      console.log('loginResponse:', loginResponse)
      const response = await JSON.parse(loginResponse)
      console.log('response:', response)
      //login 
      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   "email": "ritika.1923cs1076@kiet.edu",
      //   "password": "12345"
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };

      // var myHeaders = new Headers();

      // var requestOptions = {
      //   method: 'GET',
      //   headers: myHeaders,
      //   redirect: 'follow'
      // };

      // fetch("https://c389b148d157.ngrok.io/logout", requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error:', error)
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
          value={this.state.email}
          mode='flat'
          theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
          label='KIET email'
          onChangeText={(email) => this.setState({ email: email })}
          placeholder='Enter your KIET email'
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
          style={styles.textInputStyle}
          value={this.state.password}
          mode='flat'
          theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
          label='Password'
          onChangeText={(password) => this.setState({ password: password })}
          placeholder='Enter your password'
          />
        </View>
        <View style={{marginHorizontal: 15, flexDirection: 'row', justifyContent:  'flex-end', marginTop: 10}}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Change Password')}}>
            <Text style={{fontSize: 16, color: theme.TEXT_SECONDARY}}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}} onPress={() => {this.login()}}>
          <GradientButton 
          colorArray={[theme.PRIMARY_LIGHT, theme.PRIMARY_DARK]}
          paddingHorizontal={25}
          paddingVertical={10}
          btnWidth={200}
          borderRadius={5}
          MiddleComponent={() =><Text style={{color: theme.TEXT_WHITE, fontSize: 18}}>Sign In </Text>}
          />
        </TouchableOpacity>
        <View style={{marginHorizontal: 15, flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <Text style={{fontSize: 16}}>Don't have a account?  </Text>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Signup')}}>
            <Text style={{fontSize: 16, color: theme.TEXT_SECONDARY}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
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