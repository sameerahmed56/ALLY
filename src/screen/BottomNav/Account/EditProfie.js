import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newNotification } from '../../../redux/actions';
import store from '../../../redux/store'
import * as Animatable from "react-native-animatable";
// import DeviceInfo from 'react-native-simple-device-info';
// import { MyContext } from '../../../navigation/AppNavigation'
import colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Header from '../../../component/Header'
import urls from '../../../constants/urls'
import { isNetworkConnected, postRequest, getRequest } from '../../../services/NetworkRequest'
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../../../constants/storageKeys';

class EditProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        };
    }
    async componentDidMount() {
        let loginData = await AsyncStorage.getItem(storageKeys.LOGIN_DATA)
        if (loginData) {
            loginData = JSON.parse(loginData)
            const isAdmin = loginData.admin
            this.setState({ isAdmin: isAdmin })
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
    render() {
        const theme = colors


        return (
            <View style={{ flex: 1 }}>
                <Header headerText="Edit Profile" showBackBtn={false} />
                <TouchableOpacity onPress={() => { this.pickDocument() }} style={{ flexDirection: 'column', width: 120, height: 120, alignSelf: 'center', marginLeft: 20, marginVertical: 10 }}>
                    <Image style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: theme.TEXT_PRIMARY }} source={{ uri: 'https://i.ibb.co/Z8fQZG6/Profile-PNG-Icon-715x715.png' }} />
                    <View style={{ position: "absolute", bottom: 5, right: 5, backgroundColor: theme.THEME_ORANGE, borderRadius: 5, paddingVertical: 2, paddingHorizontal: 3 }}>
                        <Icon name="camera" size={26} color={theme.TILE} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default EditProfile

