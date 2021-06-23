import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Snackbar, TextInput, Card } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import Header from '../../../component/Header'
import colors from '../../../constants/colors'
class GiveHelp extends PureComponent {
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
      ]
    }
  }

  render() {
    const theme = colors
    const item = this.state.comingRequest[0]
    return (
      <View style={{flex: 1,backgroundColor: theme.TILE}}>
        <Header headerText="Give Help" showBackBtn={true}/>
        <Card style={{marginHorizontal: 5}}>
            <View style={{ alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10}} >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.TEXT_PRIMARY}}>{item.title}</Text>
          <Image
            source={require("../../../assets/hands.png")}
            style={{ height: DeviceWidth - 180 , width: DeviceWidth - 120 , marginHorizontal: 5, }}
            resizeMode="contain"
          />
          <Text>{item.description}</Text>
          <Text>{item.gpay}</Text>
          <Text>{item.accountNo}</Text>
          <Text>{item.ifscCode}</Text>
            </View>
        </Card>
      </View>
    )
  }
}

export default GiveHelp
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;