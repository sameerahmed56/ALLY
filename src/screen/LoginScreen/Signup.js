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
import {getRequest, postRequest} from '../../services/NetworkRequest'
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
    // const {email, password, value, fullName} = this.state
    console.log('DDD')
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Cookie", "session=.eJwlzjEOwyAMQNG7MHfABmOcy0SAbTVS24E0U9W7F6njX57-J-w-7byH7T0vu4X90LAFLSzQ1DAjwyAkHUmHKivVIa14ib1HLUKFDaNrlAKOVgVUkFE4jRozM7Vo3MCGiHUylyrL8A7CpMvIRM0zC4N05EqJIpeawhq5Tpv_G1jZ9Hm8wubtcdr3B2ekM0s.YNHTBA.SDtKrTWZ0Ap8cjC6FgDp59YOe2Q");
          
      var raw = JSON.stringify({
        "email": "ritika.1923cs1076@kiet.edu",
        "gender": "female",
        "name": "Ritika Signh",
        "password": "12345"
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://c389b148d157.ngrok.io/index", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      // const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      // const signUpBody= {
      //   name: fullName,
      //   gender: value,
      //   password: password,
      //   email: email
      // }
      // let signUpResponse = await postRequest(urls.REGISTER, { Cookie: '' }, JSON.stringify(signUpBody), headers)
      // console.log('signUpResponse:', signUpResponse)
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
          this.signUp()
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
