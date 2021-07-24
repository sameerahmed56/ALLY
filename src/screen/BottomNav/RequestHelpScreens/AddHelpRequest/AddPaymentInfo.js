import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import Header from '../../../../component/Header'
import colors from '../../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Snackbar, TextInput, Chip } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import urls from '../../../../constants/urls'
import { getRequest, postRequest, isNetworkConnected } from '../../../../services/NetworkRequest'
class AddPaymentInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            selectedImageUri: '',
            gpay: '',
            phonePe: '',
            amazonPay: '',
            paytm: '',
            upi: '',
            accountNo: '',
            accountHolderName: '',
            ifsc: 'HDFC0001913',
            isIfscValid: false,
            phoneNo: '',
            bankName: '',
            branch: "",
            address: '',
            height: 0,
            width: 0,
            categoryHelp: '',
            snackbarVisibility: false,
            snackbarMsg: ''
        }
    }
    componentDidMount() {
        const params = this.props.route.params
        console.log('params:', params)
        this.setState({ title: params.title, description: params.description, selectedImageUri: params.selectedImageUri, file: params.file, height: params.height, width: params.width, categoryHelp: params.categoryHelp })
    }
    verifyIfsc = async () => {
        try {
            const url = urls.IFSC_VERIFY + this.state.ifsc
            let bankDetail = await getRequest(url)
            console.log('bankDetail:', bankDetail)
            if (typeof bankDetail == 'object') {
                this.setState({ branch: bankDetail.BRANCH, bankName: bankDetail.BANK, address: bankDetail.ADDRESS, isIfscValid: true, snackbarVisibility: true, snackbarMsg: 'IFSC veriifed' })
            }
            else {
                this.setState({ snackbarVisibility: true, snackbarMsg: 'IFSC Invalid' })
                this.setState({ isIfscValid: false })
            }
        } catch (error) {
            this.setState({ snackbarVisibility: true, snackbarMsg: 'Error while trying to verify IFSC' })
            console.log('error:', error)
            this.setState({ isIfscValid: false })
        }
    }
    gotToSubmitRequest = async () => {
        const { title, description, selectedImageUri, file, gpay, isIfscValid, phonePe, amazonPay, paytm, upi, accountNo, accountHolderName, categoryHelp, ifsc, phoneNo, height, width } = this.state
        if (isIfscValid) {
            if (accountNo.trim() !== '' && accountHolderName.trim() !== '' && ifsc.trim() !== '' && upi.trim() !== '') {
                const submitBody = JSON.stringify({
                    amazon_pay: amazonPay,
                    upi_id: upi,
                    acc_no: accountNo,
                    acc_holder_name: accountHolderName,
                    ifsc: ifsc,
                    category_help: categoryHelp,
                    phone: phoneNo,
                    gpay: gpay,
                    paytm: paytm,
                    phone_pay: phonePe,
                    file: file,
                    title: title,
                    description: description,
                    height: height,
                    width: width
                })
                console.log('submitBody:', submitBody)
                try {
                    const response = await postRequest(urls.REQUEST_HELP, submitBody)
                    console.log('response:', response)
                    this.setState({ snackbarVisibility: true, snackbarMsg: response.msg })
                    setTimeout(() => {
                        this.props.navigation.navigate('Home')
                    }, 3000);
                } catch (error) {
                    console.log('error:', error)
                }
            }
            else {
                this.setState({ snackbarVisibility: true, snackbarMsg: 'Fill all mandatory fields correctly' })
            }
        }
        else {
            this.setState({ snackbarVisibility: true, snackbarMsg: 'Fill all mandatory fields correctly' })
        }
    }
    render() {
        const theme = colors
        const { gpay, phonePe, amazonPay, paytm, upi, accountNo, accountHolderName, ifsc, isIfscValid, phoneNo, bankName, branch, address } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: theme.WHITE }}>
                <Header headerText="Add Payment Details" showBackBtn={true} />
                <ScrollView style={{ marginVertical: 10 }}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={this.state.accountNo}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Account Number *'
                            onChangeText={(accountNo) => this.setState({ accountNo: accountNo })}
                            placeholder='Enter Account Number(required)'
                            keyboardType="number-pad"
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={this.state.accountHolderName}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Account Holder Name *'
                            onChangeText={(accountHolderName) => this.setState({ accountHolderName: accountHolderName })}
                            placeholder='Enter Account Holder Name(required)'
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, alignItems: 'center' }}>
                        <FontAwesome name="send" size={26} style={{ marginHorizontal: 10 }} color={theme.PRIMARY} onPress={() => this.verifyIfsc()} />
                        <TextInput
                            style={{ ...styles.textInputStyle, flex: 1 }}
                            value={this.state.ifsc}
                            onChangeText={() => { this.setState({ isIfscValid: false }) }}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='IFSC *'
                            onChangeText={(ifsc) => this.setState({ ifsc: ifsc })}
                            placeholder='Enter IFSC(required)'
                        />
                    </View>
                    {
                        isIfscValid &&
                        <ScrollView horizontal style={{ paddingVertical: 10 }}>
                            <Chip mode='outlined' style={{ height: 35, alignItems: 'center', backgroundColor: theme.PRIMARY, marginHorizontal: 3, paddingHorizontal: 3, borderColor: theme.BORDER, borderWidth: 2 }} textStyle={{ fontSize: 15, color: theme.TEXT_WHITE }} >{bankName}</Chip>
                            <Chip mode='outlined' style={{ height: 35, alignItems: 'center', backgroundColor: theme.PRIMARY, marginHorizontal: 3, paddingHorizontal: 3, borderColor: theme.BORDER, borderWidth: 2 }} textStyle={{ fontSize: 15, color: theme.TEXT_WHITE }} >{branch}</Chip>
                            <Chip mode='outlined' style={{ height: 35, alignItems: 'center', backgroundColor: theme.PRIMARY, marginHorizontal: 3, paddingHorizontal: 3, borderColor: theme.BORDER, borderWidth: 2 }} textStyle={{ fontSize: 15, color: theme.TEXT_WHITE }} >{address}</Chip>
                        </ScrollView>
                    }
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, alignItems: 'center' }}>
                        <TextInput
                            style={{ ...styles.textInputStyle, flex: 1 }}
                            value={this.state.upi}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='UPI Id *'
                            onChangeText={(upi) => this.setState({ upi: upi })}
                            placeholder='Enter UPI Id(required)'
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../assets/g-pay.png')}
                            style={{ height: 30, width: 50 }}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={{ ...styles.textInputStyle, flex: 1 }}
                            value={this.state.gpay}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Google Pay'
                            onChangeText={(gpay) => this.setState({ gpay: gpay })}
                            placeholder='Enter G-Pay Number'
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../assets/phone-pe.png')}
                            style={{ height: 30, width: 50 }}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={{ ...styles.textInputStyle, flex: 1 }}
                            value={this.state.phonePe}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Phone Pe'
                            onChangeText={(phonePe) => this.setState({ phonePe: phonePe })}
                            placeholder='Enter PhonePe Number'
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../assets/amazon-pay.png')}
                            style={{ height: 30, width: 50, tintColor: theme.ATT_ORANGE }}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={{ ...styles.textInputStyle, flex: 1 }}
                            value={this.state.amazonPay}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Amazon pay'
                            onChangeText={(amazonPay) => this.setState({ amazonPay: amazonPay })}
                            placeholder='Enter Amazon Pay Number'
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse', marginHorizontal: 20, alignItems: 'center' }}>
                        <Image
                            source={require('../../../../assets/paytm.png')}
                            style={{ height: 30, width: 50 }}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={{ ...styles.textInputStyle, flex: 1 }}
                            value={this.state.paytm}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Paytm'
                            onChangeText={(paytm) => this.setState({ paytm: paytm })}
                            placeholder='Enter Paytm Number'
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={this.state.phoneNo}
                            mode='flat'
                            theme={{ colors: { primary: theme.PRIMARY, placeholder: theme.TEXT_SECONDARY, text: theme.TEXT_PRIMARY }, multiline: true }}
                            label='Mobile Number *'
                            onChangeText={(phoneNo) => this.setState({ phoneNo: phoneNo })}
                            placeholder='Enter Mobile Number(required)'
                            keyboardType="phone-pad"
                        />
                    </View>
                    <TouchableOpacity onPress={() => { this.gotToSubmitRequest() }} style={{ backgroundColor: theme.PRIMARY, marginHorizontal: 20, marginVertical: 15, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 8 }}>
                        <Text style={{ color: theme.TEXT_WHITE, fontSize: 16, letterSpacing: 0.3, lineHeight: 18, fontWeight: 'bold', }}>Proceed</Text>
                    </TouchableOpacity>
                </ScrollView>
                <Snackbar
                    visible={this.state.snackbarVisibility}
                    style={{ backgroundColor: theme.PRIMARY_DARK, marginBottom: 60, borderRadius: 5 }}
                    duration={2000}
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
        )
    }
}
export default AddPaymentInfo
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 10,
        fontSize: 15,
    },
    textInputContainer: {
        marginHorizontal: 20,
    },
});