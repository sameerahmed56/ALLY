import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newNotification } from '../../../redux/actions';
import store from '../../../redux/store'
import * as Animatable from "react-native-animatable";
// import DeviceInfo from 'react-native-simple-device-info';
import { MyContext } from '../../../navigation/AppNavigation'
import colors from '../../../constants/colors';
import * as ImagePicker from 'react-native-image-picker';
import { Snackbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Header from '../../../component/Header'
import urls from '../../../constants/urls'
import { isNetworkConnected, postRequest, getRequest } from '../../../services/NetworkRequest'
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../../../constants/storageKeys';
import { getToken, requestPermission, checkPermission, sendNotification } from '../../../services/pushNotification'
import DeviceInfo from 'react-native-simple-device-info';
class Account extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      loading: true,
      title: '',
      description: '',
      refreshing: false,
      showAlert: false,
      selectedImageUri: '',
      selectedImageName: '',
      selectedImageType: '',
      imageHeight: 1,
      imageWidth: 1,
      fileName: '',
      fileType: '',
      base64Image: '',
      file: '',
      profile_pic: 'https://i.ibb.co/Z8fQZG6/Profile-PNG-Icon-715x715.png',
      name: '',
      gender: '',
      email: '',
      selectedTab: 'Notification'
    };
  }
  async componentDidMount() {
    let loginData = await AsyncStorage.getItem(storageKeys.LOGIN_DATA)
    console.log('loginData:', loginData)
    if (loginData) {
      loginData = JSON.parse(loginData)
      const isAdmin = loginData.admin
      this.setState({ isAdmin: isAdmin, })
    }
    try {
      let profileResponse = await getRequest(urls.PROFILE)
      console.log('profileResponse:', profileResponse)
      this.setState({ profile_pic: profileResponse.profile_pic, email: profileResponse.email, gender: profileResponse.gender, name: profileResponse.name })
    } catch (error) {
      console.log('error2:', error)

    }
    // this.setData()
  }
  setData = async () => {
    try {
      if (isNetworkConnected) {
        try {
          let response = await getRequest(urls.PROFILE)
          console.log('response:', response)
        } catch (error) {
          console.log('error:', error)
        }
      }
      else {
        console.log("no internet")
      }
    } catch (error) {

    }
  }
  addImage = async () => {
    const per = await this.checkStorageAndCameraPermission()
    console.log('per:', per)
    if (per) {
      this.setState({ showAlert: true })
      this.chooseFromGallery()
    }
    else {
      Alert.alert('Permission Denied  ');
    }
  }
  openCamera() {
    let options = {
      title: 'You can choose one image',
      quality: 1,
      includeBase64: true,
      saveToPhotos: true,
      mediaType: 'photo',// other values 'video', 'mixed',
      storageOptions: {
        skipBackup: true
      }
    }
    this.setState({ showAlert: false })
    ImagePicker.launchCamera(options, response => {
      console.log('response:', response)
      this.setState({ showAlert: false })
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        this.setState({ showAlert: false })
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({ showAlert: false })
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({ showAlert: false })
      } else {
        this.setState({ showAlert: false })
        this.setState({ selectedImageUri: response.uri, base64Image: response.base64, selectedImageName: response.fileName, selectedImageType: response.type })
      }
    });
  }
  checkStorageAndCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])

        const permissionCamera = await PermissionsAndroid.check('android.permission.CAMERA')
        console.log('permissionCamera:', permissionCamera)
        const permissionWriteStorage = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE')
        console.log('permissionWriteStorage:', permissionWriteStorage)

        if (!permissionCamera || !permissionWriteStorage) {
          return false
        }
        else {
          return true
        }
      } catch (error) {
        console.log('error:', error)
        return false
      }
    }
  }
  uploadImage = async (uri, name, type) => {
    const url = urls.PROFILE_PIC_UPLOAD
    let formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: type,
      name: name
    });
    // formData.append('file', uri, name);
    // formData.append('fileName', name)
    console.log('formDATA', formData._parts)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      })
      console.log('response', response)
      let fileUploadResp = await response.json()
      console.log(fileUploadResp)
      if (fileUploadResp.msg == "success") {
        this.setState({ fileName: name, uploadedFName: fileUploadResp.data, snackbarMsg: 'File successfully uploaded', snackbarVisibility: true, file: fileUploadResp.url })
        let profileResponse = await getRequest(urls.PROFILE)
        console.log('profileResponse:', profileResponse)
        this.setState({ profile_pic: profileResponse.profile_pic, email: profileResponse.email, gender: profileResponse.gender, name: profileResponse.name })
      }
      return (fileUploadResp)
    } catch (err) {
      //error uploading image
      console.log(err)
      this.setState({ snackbarVisibility: true, snackbarMsg: 'Error Uploading File!', attaching: false, })
    }

  }
  chooseFromGallery() {
    let options = {
      title: 'You can choose one image',
      quality: 0.8,
      includeBase64: true,
      saveToPhotos: true,
      mediaType: 'photo',// other values 'video', 'mixed',
      storageOptions: {
        skipBackup: true
      }
    }

    this.setState({ showAlert: false })
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response:', response)
      this.setState({ showAlert: false })
      if (response.didCancel) {
        this.setState({ showAlert: false })
        console.log('User cancelled photo picker');
      } else if (response.error) {
        this.setState({ showAlert: false })
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        this.setState({ showAlert: false })
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ showAlert: false })
        let source = response.assets[0]
        // console.log('source:', source)
        // this.setState({ selectedImageUri: response.uri, base64Image: response.base64, selectedImageName: response.fileName, selectedImageType: response.type })

        this.setState({ selectedImageUri: source.uri, base64Image: source.base64, imageHeight: source.height, imageWidth: source.width, selectedImageType: source.type, selectedImageName: source.fileName })
        this.uploadImage(source.uri, source.fileName, source.type)

      }
    });
  }
  logout = async (logout) => {
    const { email } = this.state
    const token = await getToken()
    console.log('token:', token)
    if (token) {
      const device_id = await DeviceInfo.getUniqueID()
      const fcmInsertBody = JSON.stringify({
        fcm_token: token,
        device_id: device_id,
        email: email
      })
      console.log('fcmInsertBody:', fcmInsertBody)
      try {

        let response = await postRequest(urls.FCM_DELETE, fcmInsertBody)
        console.log('response:', response)
        if (response.msg === 'fcm deleted successfully') {
          const logoutResponse = await getRequest(urls.LOGOUT)
          console.log('logoutResponse:', logoutResponse)
          if (logoutResponse.msg === 'logout success') {
            let keys = await AsyncStorage.getAllKeys()
            await AsyncStorage.multiRemove(keys)
            setTimeout(logout, 800)
          }
          else {
            console.log('logout not done')
          }
        }
        else {
          console.log('logout not done')
        }

      } catch (e) {
        console.log('e:', e)
        //failed to set fcm
      }
    }
  }
  render() {
    const theme = colors
    const badgeCount = store.getState().reducer.newNotification
    console.log(badgeCount.count)
    const { selectedTab } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
        <Header headerText="Account" showBackBtn={false} />
        <View style={{ backgroundColor: theme.WHITE, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginHorizontal: 20, borderRadius: 15, elevation: 3, marginTop: 30, paddingVertical: 5, marginBottom: 20, justifyContent: 'flex-start' }} >
          <TouchableOpacity onPress={() => { this.addImage() }} style={{ flexDirection: 'column', width: 60, height: 60, alignSelf: 'center', marginLeft: 10, marginVertical: 10 }}>
            <Image style={{ width: 60, height: 60, borderRadius: 60, borderWidth: 1, borderColor: theme.PRIMARY }} source={{ uri: this.state.profile_pic }} />
            <View style={{ position: "absolute", bottom: 5, right: 0, backgroundColor: theme.THEME_ORANGE, borderRadius: 5, paddingVertical: 2, paddingHorizontal: 3 }}>
              <Icon name="camera" size={10} color={theme.TILE} />
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: theme.TEXT_PRIMARY, fontSize: 20, letterSpacing: 0.8 }}>{this.state.name}</Text>
            <Text style={{ color: theme.TEXT_SECONDARY, fontSize: 15, letterSpacing: 0.8 }}>{this.state.gender}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => { this.setState({ selectedTab: 'Notification' }), this.props.navigation.navigate('Notification Screen') }}>
          <View style={{ marginHorizontal: 20, paddingHorizontal: 20, marginVertical: 3, paddingVertical: 18, flexDirection: 'row', borderRadius: 15, backgroundColor: selectedTab === 'Notification' ? theme.PRIMARY_DARK : theme.BACKGROUND, alignItems: 'center' }}>
            <IconWithBadge name="bell" size={27} color={selectedTab === 'Notification' ? theme.WHITE : theme.PRIMARY_DARK} badgeCount={badgeCount.count} />
            <Text style={{ color: selectedTab === 'Notification' ? theme.TEXT_WHITE : theme.TEXT_PRIMARY, fontSize: 16, letterSpacing: 0.36, lineHeight: 25, marginLeft: 27 }}>Notification</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.setState({ selectedTab: 'Admin' }), this.props.navigation.navigate('Admin') }}>
          <View style={{ marginHorizontal: 20, paddingHorizontal: 20, marginVertical: 3, paddingVertical: 18, flexDirection: 'row', borderRadius: 15, backgroundColor: selectedTab === 'Admin' ? theme.PRIMARY_DARK : theme.BACKGROUND, alignItems: 'center' }}>
            <Image
              source={require('../../../assets/setting.png')}
              style={{ height: 17, width: 17, tintColor: selectedTab === 'Admin' ? theme.WHITE : theme.TEXT_PRIMARY }}
              resizeMode="contain"
            />
            <Text style={{ color: selectedTab === 'Admin' ? theme.TEXT_WHITE : theme.TEXT_PRIMARY, fontSize: 16, letterSpacing: 0.36, lineHeight: 25, marginLeft: 27 }}>Admin</Text>
          </View>
        </TouchableOpacity>
        <MyContext.Consumer>
          {
            value => (
              <TouchableOpacity onPress={() => { this.setState({ selectedTab: 'Log Out' }), this.logout(value) }}>
                <View style={{ marginHorizontal: 20, paddingHorizontal: 20, marginVertical: 3, paddingVertical: 18, flexDirection: 'row', borderRadius: 15, backgroundColor: selectedTab === 'Log Out' ? theme.PRIMARY_DARK : theme.BACKGROUND, alignItems: 'center' }}>
                  <Image
                    source={require('../../../assets/logout.png')}
                    style={{ height: 17, width: 17, tintColor: selectedTab === 'Log Out' ? theme.WHITE : theme.TEXT_PRIMARY }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: selectedTab === 'Log Out' ? theme.TEXT_WHITE : theme.TEXT_PRIMARY, fontSize: 16, letterSpacing: 0.36, lineHeight: 25, marginLeft: 27 }}>Log Out</Text>
                </View>
              </TouchableOpacity>
            )
          }
        </MyContext.Consumer>

      </View>
    )
  }
}
const mapStateToProps = state => ({
  notification: state.reducer.newNotification

})
const mapDispatchToProps = dispatch => ({
  newNotification: bindActionCreators(newNotification, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <Animatable.View animation={badgeCount ? "rubberBand" : ''} iterationCount={"infinite"} style={{ width: size, height: size, }}>
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
            marginRight: 5
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </Animatable.View>
  );
}
