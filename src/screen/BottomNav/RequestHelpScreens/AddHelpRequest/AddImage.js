import React, { Component } from 'react'
import { View,  Text,Dimensions, StyleSheet, TouchableOpacity, Image, Alert, PermissionsAndroid, ScrollView, ScrollViewComponent} from 'react-native'
import Header from '../../../../component/Header'
import colors from '../../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import {Snackbar, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as ImagePicker from 'react-native-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts'
import DocumentPicker from 'react-native-document-picker';
import strings from '../../../../constants/strings'
export default class AddImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            refreshing: false,
            showAlert: false,
            selectedImageUri: '',
            imageHeight: 1,
            imageWidth: 1,
            fileName: '',
            fileType: '',
            base64Image: '',
        }
    }
    checkStorageAndCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ])

                const permissionCamera = await PermissionsAndroid.check('android.permission.CAMERA')
                const permissionWriteStorage = await PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE')

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
                let source = { uri: response.uri };
                // console.log({ source });
                this.setState({ selectedImageUri: source.uri, base64Image: response.base64 })
            }
        });
    }
    uploadImage = async (uri, name, type) => {
        const url = 'https://6a7b3eb4e958.ngrok.io/upload'
        let formData = new FormData();
        formData.append('file',{
            uri: uri,
            type:type,
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
                    'Content-Type': 'multipart/form-data;'
                },
            })
            console.log('response', response)
            let fileUploadResp = await response.json()
            console.log(fileUploadResp)
            if (fileUploadResp.msg == "uploaded") {
                this.setState({ fileName: name, uploadedFName: fileUploadResp.data, snackbarMsg: 'File successfully uploaded', snackbarVisibility: true })
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
                this.setState({ selectedImageUri: source.uri, base64Image: source.base64, imageHeight: source.height, imageWidth: source.width, fileType: source.type, fileName: source.fileName })
            }
        });
    }
    pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            if (res.size > strings.MAX_UPLOAD_SIZE) {
                this.setState({ snackbarVisibility: true, snackbarMsg: 'File Size Limit Exceeded' })
                return {}
            }

            let availableType = strings.ALLOWED_UPLOAD_FORMATS
            if (availableType.indexOf(res.type) == -1) {
                this.setState({ snackbarVisibility: true, snackbarMsg: 'File Format Not Allowed' })
                return {}
            }
            this.setState({ attaching: true })
            const fileUploadResp = await this.uploadImage(res.uri, res.name, res.type)
            return fileUploadResp
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                this.setState({ snackbarVisibility: true, snackbarMsg: "Error Uploading Document" })
            } else {
                this.setState({ snackbarVisibility: true, snackbarMsg: "Some Error Occurred" })
                throw err;
            }
        }
    }
    render() {
        const theme = colors
        const { selectedImageUri, base64Image, imageHeight, imageWidth, fileName, fileType } = this.state
        return (
            <View style={{flex: 1, backgroundColor:  theme.BACKGROUND}}>
                <ScrollView>
                    <Text>{base64Image == '' ? 'Not any selected Image' : 'Your selected Image'}</Text>
                    {
                        base64Image != '' &&
                        <Image style={{ width: DeviceWidth - 30, height: (DeviceWidth - 30) * (imageHeight / imageWidth), borderColor: theme.PRIMARY, marginHorizontal: 15, borderWidth: 2 , marginTop: 20}} source={{
                            uri: selectedImageUri
                        }} />
                    }
                </ScrollView>
                <View style={{position: 'absolute', left: 30, bottom: 30, elevation: 5, backgroundColor: theme.WHITE, height: 56, width: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
                    <TouchableOpacity 
                    // onPress={() => { this.addImage() }}
                    onPress={() => { this.pickDocument() }}
                    > 
                        <Icon name="camera" size={30} color={theme.PRIMARY} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: theme.PRIMARY, position: 'absolute', bottom: 30, right: 30, borderRadius: 28, height: 56, width: 56, elevation: 8, justifyContent: 'center', alignItems: 'center' }}  >
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => { this.uploadImage(selectedImageUri, fileName, fileType)}}>
                        <Icon name="send" color={theme.TEXT_WHITE} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;
