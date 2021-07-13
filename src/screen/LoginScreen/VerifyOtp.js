import React, {Component} from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, StyleSheet,} from 'react-native';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/colors';
import {Snackbar, Checkbox, Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import GradientButton from '../../component/GradientButton';
import {getRequest, postRequest, isNetworkConnected} from '../../services/NetworkRequest'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,} from 'react-native-confirmation-code-field';
import urls from '../../constants/urls'

class VerifyOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarVisibility: false,
      email: 'sameer.1923co1066@kiet.edu',
      snackbarMsg: '',
      otpStatus: '0',
      otpValue: ''
    };
  }

  async componentDidMount() {
    const response = await getRequest(urls.LOGOUT)
    console.log('response:', response)
    // this.setData()
  }
  setData = async() => {
    const {email} = this.state
    if(isNetworkConnected){
      try {
        const mailBody = JSON.stringify({
          email: email,
        })
        let response =  await postRequest(urls.MAIL_SENT, mailBody)
        console.log('response:', response)
      } catch (error) {
        console.log('error:', error)
      }
    }
    else{
      console.log("no internet")
    }
  }
  verify = async() =>{
    const {email, otpValue} = this.state
    console.log('otpValue:', otpValue)
    if(isNetworkConnected){
      if(otpValue.length === 4){
        try {
          const otpBody = JSON.stringify({
            email: email,
            otp: otpValue
          })
          let response =  await postRequest(urls.VERIFY_OTP, otpBody)
          console.log('response:', response)
          if(response.msg == 'verified'){
            this.props.navigation.navigate('Login')
          }
          else{
            console.log('not verified')
          }
        } catch (error) {
          console.log('error:', error)  
        }
      }
      else{
        console.log('fill otp')
      }
    }
    else{
      console.log("no internet")
    }
  }
  render() {
    const theme = colors
    return (
      <View style={{flex: 1, backgroundColor: theme.WHITE}}>
        <TouchableOpacity
          style={{ backgroundColor: theme.WHITE, elevation: 15, alignSelf: 'flex-start', borderRadius: 25, marginLeft: 30, marginTop: 40, marginBottom: 40,}}
          onPress={() => {
            this.props.navigation.navigate('Signup');
          }}>
          <Entypo name={'chevron-left'} color={theme.BLACK} size={25} />
        </TouchableOpacity>
        <ScrollView>
          <View style={{marginHorizontal: 60}}>
            <CodeField
              // ref={ref}
              value={this.state.otpValue}
              onChangeText={otpValue => {
                this.setState({otpValue});
              }}
              cellCount={4}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 100, }} onPress={() =>{
            this.verify()
            // this.props.navigation.navigate('Signup')
          }}>
            <GradientButton 
            colorArray={[theme.PRIMARY_LIGHT, theme.PRIMARY_DARK]}
            paddingHorizontal={25}
            paddingVertical={10}
            btnWidth={200}
            borderRadius={5}
            MiddleComponent={() =><Text style={{color: theme.TEXT_WHITE, fontSize: 18}}>Verify</Text>}
            />
          </TouchableOpacity>
        </ScrollView>
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{
            backgroundColor: theme.WHITE,
            marginBottom: 10,
            borderRadius: 5,
          }}
          duration={4000}
          onDismiss={() => this.setState({snackbarVisibility: false})}
          action={{
            label: 'Ok',
            color: theme.PRIMARY,
            onPress: () => {
              this.setState({snackbarVisibility: false});
            },
          }}>
          <Text style={{color: theme.PRIMARY, fontSize: 15}}>
            {this.state.snackbarMsg}
          </Text>
        </Snackbar>
      </View>
    );
  }
}

export default VerifyOtp;
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.GREY,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  focusCell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
