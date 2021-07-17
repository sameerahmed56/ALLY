import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Snackbar, TextInput, Card, Chip } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import Header from '../../../component/Header'
import colors from '../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import urls from '../../../constants/urls';
import { isNetworkConnected, getRequest, postRequest } from '../../../services/NetworkRequest';

class Admin extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            pendingList: [{
                "acc_holder_name": "Aman Ahmed",
                "acc_no": "00862100028059",
                "ifsc": "HDFC0001913",
                "image": "http://res.cloudinary.com/riz0000000001/image/upload/v1626265739/lffkokrcxekzpl1xt357.jpg",
                "paytm": "7905@paytm",
                "phone": "7905332677",
                "phone_pay": "7905@ybl",
                "request_description": "Need help sjahdkhdjhkshdks dajdhadha dkahdkad ahdkahd",
                "request_id": 3,
                "request_title": "Help Dedo Bhai",
                "request_type": 1,
                "upi_id": "790533267@apl",
                "user_id": 2,
                "user_name": "Sameer Ahmed"

            }, {
                "acc_holder_name": "Aman Ahmed",
                "acc_no": "08621000038059",
                "ifsc": "HDFC0001913",
                "image": "http://res.cloudinary.com/riz0000000001/image/upload/v1626265739/lffkokrcxekzpl1xt357.jpg",
                "paytm": "898",
                "phone": "565654",
                "phone_pay": "",
                "request_description": "Need help",
                "request_id": 3,
                "request_title": "Help",
                "request_type": 1,
                "upi_id": "Bcn",
                "user_id": 2,
                "user_name": "Sameer Ahmed"
            }],
            requestRemarkList: [],
            showActionButton: []
        }
    }
    async componentDidMount() {
        // const response = await getRequest(urls.ALL_POST)
        // console.log('response:', response)
        this.setData()
    }
    setData = async () => {
        try {
            console.log('------------------------')
            // const response = await getRequest(urls.PENDING_REQUESTS)
            // console.log('response:', response)
            let showActionButton = []
            let requestRemarkList = []
            let actionText = []
            this.state.pendingList.forEach((element, index) => {
                actionText[index] = ''
                requestRemarkList[index] = ''
                showActionButton[index] = true
            });
            console.log('actionText:', actionText)
            console.log('requestRemarkList:', requestRemarkList)
            console.log('showActionButton:', showActionButton)
            this.setState({ requestRemarkList: requestRemarkList, showActionButton: showActionButton, actionText: actionText, })
        } catch (error) {
            console.log('error:', error)

        }
    }
    remarkTxtChange(text, index) {
        const { requestRemarkList } = this.state
        requestRemarkList[index] = text
        this.setState({ requestRemarkList })
        console.log('requestRemarkList:', requestRemarkList)
    }
    approveRejectRequest = async (item, index, status) => {
        const { requestRemarkList } = this.state
        try {
            let approveRejectBody = JSON.stringify({
                id: item.request_id,
                remark: requestRemarkList[index],
                status: status
            })
            console.log('approveRejectBody:', approveRejectBody)
            const response = await postRequest(urls.APPROVE_REJECT_REQUEST, approveRejectBody)
            console.log('response:', response)
        } catch (error) {
            console.log('error:', error)
        }
    }
    render() {
        const theme = colors
        return (
            <View style={{ flex: 1, backgroundColor: theme.TILE }}>
                <Header headerText="Admin" showBackBtn={true} />
                <FlatList
                    data={this.state.pendingList}
                    extraData={this.state.pendingList}
                    initialNumToRender={4}
                    renderItem={({ item, index }) =>
                        <Card style={{ backgroundColor: theme.WHITE, marginVertical: 3, marginHorizontal: 5, paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View>
                                <Text>{item.user_name}</Text>
                                <Text>{item.request_title}</Text>
                                <Text>{item.request_description}</Text>
                                <View>
                                    <Chip mode='outlined' style={{ height: 25, alignItems: 'center', backgroundColor: theme.PRIMARY, borderColor: theme.BORDER, borderWidth: 2, alignSelf: 'flex-start' }} textStyle={{ fontSize: 12, color: theme.TEXT_WHITE }} >Account Details</Chip>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>{item.acc_holder_name}</Text>
                                        <Text>{item.acc_no}</Text>
                                    </View>
                                    <Text>{item.ifsc}</Text>
                                </View>
                                <Chip mode='outlined' style={{ height: 25, alignItems: 'center', backgroundColor: theme.PRIMARY, borderColor: theme.BORDER, borderWidth: 2, alignSelf: 'flex-start' }} textStyle={{ fontSize: 12, color: theme.TEXT_WHITE }}>UPI Details</Chip>
                            </View>
                            {
                                this.state.showActionButton[index] === true ?
                                    <View>
                                        <View style={{ marginHorizontal: 0 }}>
                                            <TextInput
                                                style={{ backgroundColor: theme.WHITE, borderRadius: 5, paddingHorizontal: 5, fontSize: 15, }}
                                                value={this.state.requestRemarkList[index]}
                                                mode='flat'
                                                theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
                                                label='Remark'
                                                onChangeText={(text) => this.remarkTxtChange(text, index)}
                                                placeholder='Write Your Remark'
                                                multiline />
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <TouchableOpacity onPress={() => { this.approveRejectRequest(item, index, 'APPROVED') }} style={{ ...styles.requestBtn }}>
                                                <Icon name={'check'} color={theme.ATT_GREEN} size={25} />
                                                <Text style={{ color: theme.TEXT_PRIMARY }}>APPROVE</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ ...styles.requestBtn }} onPress={() => { this.approveRejectRequest(item, index, 'REJECTED') }}>
                                                <Icon name={'close'} color={theme.ATT_RED} size={25} />
                                                <Text style={{ color: theme.TEXT_PRIMARY }}>REJECT</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        {/* <Text style={{ color: theme.ATT_RED, textAlign: 'center', fontSize: 17, paddingVertical: 5 }}>{this.state.actionText[index]}</Text> */}
                                    </View>
                            }
                        </Card>
                    } />
            </View>
        )
    }
}

export default Admin
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    Tile: {
        width: DeviceWidth,
        marginTop: 10
    },
    tabStyle: {},
    scrollStyle: {
        backgroundColor: 'white',
        paddingLeft: 65,
        paddingRight: 65,
        // justifyContent: 'center',
    },
    tabBarTextStyle: {
        fontSize: 15,
        fontWeight: 'normal',
    },
    underlineStyle: {
        height: 2.5,
        width: DeviceWidth / 2,
        borderRadius: 3,
    },
    requestBtn: {
        flex: 1 / 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8
    },

});
