import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Animation, Image } from 'react-native';
import colors from '../../constants/colors';
import { Snackbar, Checkbox, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import { MyContext } from '../../navigation/AppNavigation';
import { postRequest, getRequest, isNetworkConnected } from '../../services/NetworkRequest';
import Entypo from 'react-native-vector-icons/Entypo';
import { getToken, requestPermission, checkPermission, sendNotification } from '../../services/pushNotification'
import DeviceInfo from 'react-native-simple-device-info';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import GradientButton from '../../component/GradientButton';
import DropDownComponent from '../../component/DropDownComponent';
import urls from '../../constants/urls'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'sameer.1923co1066@kiet.edu',
      showPassword: false,
      password: '123456',
      snackbarVisibility: false,
      snackbarMsg: ''
    };
  }
  async componentDidMount() {
    const { email, password } = this.state
    // const token = await getToken()
    // console.log('token:', token)
    // if (token) {
    //   const device_id = await DeviceInfo.getUniqueID()
    //   const fcmInsertBody = JSON.stringify({
    //     fcm_token: token,
    //     device_id: device_id,
    //     email: email
    //   })
    //   console.log('fcmInsertBody:', fcmInsertBody)
    //   try {

    //     let response = await postRequest(urls.FCM_DELETE, fcmInsertBody)
    //     console.log('response:', response)

    //   } catch (e) {
    //     console.log('e:', e)
    //     //failed to set fcm
    //   }
    // }
    // const response = await getRequest(urls.LOGOUT)
    // console.log('response:', response)
    // this.setData()
  }
  setNotification = async () => {
    const { email, password } = this.state
    const NotificationPermission = await checkPermission()
    if (!NotificationPermission) {
      const requestPerm = await requestPermission()
      if (!requestPerm) {
        this.setState({ snackbarVisibility: true, snackbarMsg: "You Wont Receive Any Notification" })
        return
      }
    }
    const token = await getToken()
    console.log('token:', token)
    // check generated token here
    if (token) {
      const device_id = await DeviceInfo.getUniqueID()
      const fcmInsertBody = JSON.stringify({
        fcm_token: token,
        device_id: device_id,
        email: email
      })
      console.log('fcmInsertBody:', fcmInsertBody)
      try {

        let response = await postRequest(urls.FCM_INSERT, fcmInsertBody)
        console.log('response:', response)

      } catch (e) {
        console.log('e:', e)
        //failed to set fcm
      }
    }

  }

  login = async (login) => {
    const { email, password } = this.state
    // console.log('isNetworkConnected:', isNetworkConnected())
    if (true) {
      console.log('sss')
      if (email.trim() !== '' && password.trim() !== '') {
        try {
          const loginBody = JSON.stringify({
            email: email,
            password: password
          })
          let response = await postRequest(urls.LOGIN, loginBody)
          console.log('response:', response)
          if (response.msg === 'login success') {
            await AsyncStorage.setItem(storageKeys.LOGIN_DATA, JSON.stringify(response))
            await this.setNotification()
            setTimeout(login, 800)
          }
          else {
            this.setState({ snackbarVisibility: true, snackbarMsg: response.msg })
          }
        } catch (error) {
          console.log('error:', error)
          this.setState({ snackbarVisibility: true, snackbarMsg: 'Some error occurred' })
        }
      }
      else {
        console.log('fill all form')
        this.setState({ snackbarVisibility: true, snackbarMsg: 'Fill all fields' })
      }
    }
    else {
      console.log("no internet")
      this.setState({ snackbarVisibility: true, snackbarMsg: 'No internet Connection' })
    }
  }
  render() {
    const theme = colors
    return (
      <View style={{ flex: 1, backgroundColor: theme.BACKGROUND, paddingHorizontal: 15, }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ tintColor: theme.PRIMARY, height: 200, width: 200 }}
            resizeMode="contain"
            source={require('../../assets/ally-logo.png')}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInputStyle}
            value={this.state.email}
            mode='flat'
            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
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
            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
            label='Password'
            secureTextEntry={!this.state.showPassword}
            onChangeText={(password) => this.setState({ password: password })}
            placeholder='Enter your password'
          />
        </View>
        {/* <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Change Password') }}>
            <Text style={{ fontSize: 16, color: theme.TEXT_SECONDARY }}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View> */}

        <MyContext.Consumer>
          {
            value => (
              <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }} onPress={() => {
                this.login(value)
                // this.props.navigation.navigate('Signup')
              }}>
                <GradientButton
                  colorArray={[theme.PRIMARY_LIGHT, theme.PRIMARY_DARK]}
                  paddingHorizontal={25}
                  paddingVertical={10}
                  btnWidth={200}
                  borderRadius={5}
                  MiddleComponent={() => <Text style={{ color: theme.TEXT_WHITE, fontSize: 18 }}>Sign In </Text>}
                />
              </TouchableOpacity>
            )
          }
        </MyContext.Consumer>
        <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Don't have a account?  </Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Signup') }}>
            <Text style={{ fontSize: 16, color: theme.TEXT_SECONDARY }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{ backgroundColor: theme.PRIMARY_DARK, marginBottom: 30, borderRadius: 5 }}
          duration={3000}
          onDismiss={() => this.setState({ snackbarVisibility: false })}
          action={{
            label: 'Ok',
            color: theme.TEXT_WHITE,
            onPress: () => {
              this.setState({ snackbarVisibility: false })
            },
          }}>
          <Text style={{ color: theme.TEXT_WHITE, fontSize: 15 }}>{this.state.snackbarMsg}</Text>
        </Snackbar>
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
    fontSize: 15,
    color: colors.TEXT_PRIMARY
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: colors.BORDER,
    elevation: 5,
    marginVertical: 10
  },
});
