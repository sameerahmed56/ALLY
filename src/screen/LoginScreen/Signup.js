import React, {Component} from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Animation, Image } from 'react-native';
import colors from '../../constants/colors';
import {Snackbar, Checkbox, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
// import {MyContext} from '../../navigation/AppNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import GradientButton from '../../component/GradientButton';
import DropDownComponent from '../../component/DropDownComponent';
import {getRequest, postRequest, isNetworkConnected} from '../../services/NetworkRequest'
import urls from '../../constants/urls'

class Signup extends Component {
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
    this.setValue = this.setValue.bind(this);
  }
  setOpen(open) {
    this.setState({
      open
    });
    console.log(this.state.value)
  }
  setValue(callback) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setGenderList(callback) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }
  signUp = async() =>{
    const {email, password, value, fullName} = this.state
    console.log('DDD')
    if(isNetworkConnected){
      if(email.trim() !== '' && password.trim() !== '' && fullName.trim() !== '' && value.trim() !== '' ){
        try {
          const signUpBody = JSON.stringify({
            email: email,
            gender: value,
            name: fullName,
            password: password
          })
          let response =  await postRequest(urls.REGISTER, signUpBody)
          console.log('response:', response)
        } catch (error) {
          console.log('error:', error)
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
          value={this.state.fullName}
          mode='flat'
          theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
          label='Full Name'
          onChangeText={(fullName) => this.setState({ fullName: fullName })}
          placeholder='Enter Full Name'
          />
        </View>
        <View style={{marginVertical: 15,alignItems: 'center'}}>
          <DropDownComponent 
          dropDownWidth={DeviceWidth - 30} 
          open={this.state.open}
          value={this.state.value}
          setOpen={ (e) => this.setOpen(e)}
          setValue={ (e) => this.setValue(e)}
          setItems={ (e) => this.setGenderList(e)}
          items={this.state.genderList} 
          placeholderTxt="Select Gender" 
          textSize={15} 
          upperContainerHeight={50}/>
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
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 40, }} onPress={() =>{
          // this.signUp()
          this.props.navigation.navigate('Verify Otp')
        }}>
          <GradientButton 
          colorArray={[theme.PRIMARY_LIGHT, theme.PRIMARY_DARK]}
          paddingHorizontal={25}
          paddingVertical={10}
          btnWidth={200}
          borderRadius={5}
          MiddleComponent={() =><Text style={{color: theme.TEXT_WHITE, fontSize: 18}}>Sign Up </Text>}
          />
        </TouchableOpacity>
        <View style={{marginHorizontal: 15, flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
          <Text style={{fontSize: 16}}>Already have a account ? </Text>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
            <Text style={{fontSize: 16, color: theme.TEXT_SECONDARY}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Signup;
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
