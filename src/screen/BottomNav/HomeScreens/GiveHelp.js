import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Snackbar, TextInput, Card } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import Header from '../../../component/Header'
import colors from '../../../constants/colors'
class GiveHelp extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      requestData: {},
    }
  }
  componentDidMount() {
    const onePostData = this.props.route.params.onePostData
    console.log('onePostData:', typeof onePostData.image_ht)
    this.setState({ requestData: onePostData })
  }
  render() {
    const theme = colors
    const { requestData } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: theme.TILE }}>
        <Header headerText="Give Help" showBackBtn={true} />
        <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: theme.WHITE }} >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.TEXT_PRIMARY }}>{requestData.request_title}</Text>
          <Image
            // source={{ uri: requestData.image }}
            source={require('../../../assets/help.jpeg')}

            style={{ height: (DeviceWidth - 40), width: DeviceWidth - 40, }}
            resizeMode="contain"
          />
          <View style={{}}>
            <Text style={{ fontSize: 14, color: theme.TEXT_SECONDARY }}>Description </Text>
            <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY }}>{requestData.request_description}</Text>
          </View>
          <View style={{ height: 0.5, backgroundColor: theme.GREY, marginVertical: 10 }}></View>
          <Text style={{ fontSize: 14, color: theme.TEXT_SECONDARY }}>Account Details </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY }}>{requestData.acc_holder_name}</Text>
            <Text style={{ fontSize: 14, color: theme.PRIMARY }}>{requestData.acc_no}</Text>
          </View>
          <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY }}>{requestData.ifsc}</Text>
          <View style={{ height: 0.5, backgroundColor: theme.GREY, marginVertical: 10 }}></View>
          {
            requestData.upi !== '' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
              <Image
                source={require('../../../assets/upi.png')}
                style={{ height: 60, width: 50, }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, }}>{requestData.upi_id}</Text>
            </View>
          }
          {
            requestData.gpay !== '' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
              <Image
                source={require('../../../assets/g-pay.png')}
                style={{ height: 30, width: 50, }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, }}>{requestData.gpay}</Text>
            </View>
          }
          {
            requestData.amazon_pay !== '' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
              <Image
                source={require('../../../assets/amazon-pay.png')}
                style={{ height: 30, width: 50, tintColor: theme.ATT_ORANGE }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, }}>{requestData.amazon_pay}</Text>
            </View>
          }
          {
            requestData.phone_pay !== '' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
              <Image
                source={require('../../../assets/phone-pe.png')}
                style={{ height: 30, width: 50, }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, }}>{requestData.phone_pay}</Text>
            </View>
          }
          {
            requestData.paytm !== '' &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
              <Image
                source={require('../../../assets/paytm.png')}
                style={{ height: 30, width: 50, }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 14, color: theme.TEXT_PRIMARY, }}>{requestData.paytm}</Text>
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default GiveHelp
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;