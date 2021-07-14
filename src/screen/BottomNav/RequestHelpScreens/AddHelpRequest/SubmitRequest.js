import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Header from '../../../../component/Header'
import colors from '../../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Snackbar, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getRequest, postRequest, isNetworkConnected } from '../../../../services/NetworkRequest'
import urls from '../../../../constants/urls'

class SubmitRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            params: {}
        };
    }
    async componentDidMount() {

        const params = this.props.route.params
        console.log('params:', params)
        this.setState({ params: params })
    }
    submit = async () => {
        const { params } = this.state
        const submitBody = JSON.stringify({
            amazon_pay: params.amazonPay,
            upi_id: params.upi,
            acc_no: params.accountNo,
            acc_holder_name: params.accountHolderName,
            ifsc: params.ifsc,
            category_help: 1,
            phone: params.phoneNo,
            gpay: params.gpay,
            paytm: params.paytm,
            phone_pay: params.phonePe,
            file: params.file,
            title: params.title,
            description: params.description
        })
        console.log('submitBody:', submitBody)
        try {
            const response = await postRequest(urls.REQUEST_HELP, submitBody)
            console.log('response:', response)
        } catch (error) {
            console.log('error:', error)
        }
    }
    render() {
        const theme = colors
        const { params } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND, }}>
                <Header headerText="Submit Request" showBackBtn={true} />
                <Image style={{ width: (DeviceWidth / 2), height: (DeviceWidth / 2), borderColor: theme.PRIMARY, marginHorizontal: 15, borderWidth: 2, marginTop: 20 }} source={{
                    uri: params.selectedImageUri
                }} />
                <TouchableOpacity onPress={() => { this.submit() }} style={{ backgroundColor: theme.PRIMARY, marginHorizontal: 20, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 8 }}>
                    <Text style={{ color: theme.TEXT_WHITE, fontSize: 16, letterSpacing: 0.3, lineHeight: 18, fontWeight: 'bold', }}>Submit Request</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default SubmitRequest;
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 10,
        fontSize: 15
    },
    textInputContainer: {
        // borderWidth: 1, 
        // borderColor: colors/.BORDER, 
        // elevation: 5, 
        marginVertical: 10,
    },
});