import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Snackbar, TextInput, Card } from 'react-native-paper';
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
            comingRequest: [
                {
                    title: 'Need Help With Medicine',
                    description: 'Need Help With Medicine , Need Help With Medicine, Need Help With Medicine, Need Help With Medicine',
                    gpay: '7905332677',
                    accountNo: '0862100028059',
                    ifscCode: 'PSIB5656',
                },
                {
                    title: 'Need Help With Medicine',
                    description: 'Need Help With Medicine , Need Help With Medicine, Need Help With Medicine, Need Help With Medicine',
                    gpay: '7905332677',
                    accountNo: '0862100028059',
                    ifscCode: 'PSIB5656',
                },
                {
                    title: 'Need Help With Medicine',
                    description: 'Need Help With Medicine , Need Help With Medicine, Need Help With Medicine, Need Help With Medicine',
                    gpay: '7905332677',
                    accountNo: '0862100028059',
                    ifscCode: 'PSIB5656',
                }
            ],
            pendingList: [{
                "acc_holder_name": "Vxxb",
                "acc_no": "56886",
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
                "user_id": 2
            }],
            requestRemarkList: [],
            showActionButton: []
        }
    }
    async componentDidMount() {
        const response = await getRequest(urls.ALL_POST)
        console.log('response:', response)
        this.setData()
    }
    setData = async () => {
        try {
            const response = await getRequest(urls.PENDING_REQUESTS)
            console.log('response:', response)
            let showActionButton = []
            let requestRemarkList = []
            let actionText = []
            response.forEach((element, index) => {
                actionText[index] = ''
                requestRemarkList[index] = ''
                showActionButton[index] = true
            });
            console.log('actionText:', actionText)
            console.log('requestRemarkList:', requestRemarkList)
            console.log('showActionButton:', showActionButton)
            this.setState({ requestRemarkList: requestRemarkList, showActionButton: showActionButton, actionText: actionText, pendingList: response })
        } catch (error) {

        }
    }
    remarkTxtChange(text, index) {
        const { requestRemarkList } = this.state
        requestRemarkList[index] = text
        this.setState({ requestRemarkList: requestRemarkList })
        console.log('working')
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
                                <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
                                    <Text style={{ color: theme.THEME_ORANGE, fontSize: 16 }}>{item.acc_holder_name}</Text>
                                    <Text style={{ color: theme.THEME_ORANGE, fontSize: 16 }}> ( {item.acc_no} )</Text>
                                </View>
                                <Text style={{ color: theme.TEXT_SECONDARY, paddingVertical: 2 }}>{item.phone}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
                                    <Text style={{ color: theme.TEXT_PRIMARY }}>{item.upi_id}</Text>
                                    <Text style={{ color: theme.TEXT_PRIMARY }}>{item.request_description}</Text>
                                </View>
                                <Text style={{ color: theme.THEME_ORANGE, paddingVertical: 2 }}>Grievance</Text>
                                <Text style={{ color: theme.TEXT_PRIMARY, paddingVertical: 2 }}>{item.request_title}</Text>
                            </View>

                            {
                                this.state.showActionButton[index] === true ?
                                    <View>
                                        <View style={{ marginHorizontal: 0 }}>
                                            <TextInput
                                                style={{ backgroundColor: color.WHITE, borderRadius: 5, paddingHorizontal: 5, fontSize: 15, }}
                                                value={this.state.requestRemarkList[index]}
                                                mode='flat'
                                                theme={{ colors: { primary: color.THEME_LIGHT_ORANGE }, multiline: true }}
                                                label='Remark'
                                                onChangeText={(text) => this.remarkTxtChange(text, index)}
                                                placeholder='Write Your Remark'
                                                multiline />
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <TouchableOpacity onPress={() => { this.approveRejectRequest(item, index, 'APPROVED') }} style={{ ...styles.requestBtn }}>
                                                <Icon name={'check'} color={color.ATT_GREEN} size={25} />
                                                <Text style={{ color: theme.TEXT_PRIMARY }}>APPROVE</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ ...styles.requestBtn }} onPress={() => { this.approveRejectRequest(item, index, 'REJECTED') }}>
                                                <Icon name={'close'} color={color.ATT_RED} size={25} />
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
    greenTxt: {
        color: color.ATT_GREEN
    },
    redTxt: {
        color: color.ATT_RED
    },
    orangeTxt: {
        color: color.ATT_ORANGE
    },
    blackTxt: {
        color: color.TEXT_PRIMARY
    }
});
