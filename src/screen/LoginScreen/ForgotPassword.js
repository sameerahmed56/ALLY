import React, {Component} from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Animation, Image } from 'react-native';
import colors from '../../constants/colors';
import {Snackbar, Checkbox, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../constants/storageKeys';
import {MyContext} from '../../navigation/AppNavigation';
import {postRequest, getRequest} from '../../services/APIRequest';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import GradientButton from '../../component/GradientButton';
import DropDownComponent from '../../component/DropDownComponent';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fullName: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      showPassword: false,
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
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 60}}>
          <GradientButton 
          colorArray={[theme.PRIMARY_LIGHT, theme.PRIMARY_DARK]}
          paddingHorizontal={25}
          paddingVertical={10}
          btnWidth={DeviceWidth / 1.2}
          borderRadius={5}
          MiddleComponent={() =><Text style={{color: theme.TEXT_WHITE, fontSize: 18}}>Send Recovery Mail</Text>}
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

export default ForgotPassword;
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
