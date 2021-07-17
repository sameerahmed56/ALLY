import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Snackbar, TextInput, Card } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import Header from '../../../component/Header'
import colors from '../../../constants/colors'
class Home extends PureComponent {
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
    }
  }

  render() {
    const theme = colors
    return (
      <View style={{ flex: 1, backgroundColor: theme.TILE }}>
        <Header headerText="Home" showBackBtn={false} />
        <FlatList
          data={this.state.pendingList}
          extraData={this.state.pendingList}
          initialNumToRender={5}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Give Help')}>
              <Card style={{ backgroundColor: theme.WHITE, paddingVertical: 10, marginVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, width: DeviceWidth - 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.TEXT_PRIMARY }}>{item.user_name}</Text>
                <Image
                  source={require("../../../assets/hands.png")}
                  style={{ height: DeviceWidth - 180, width: DeviceWidth - 120, marginHorizontal: 5, }}
                  resizeMode="contain"
                />
              </Card>
            </TouchableOpacity>
          } />
      </View>
    )
  }
}

export default Home
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;