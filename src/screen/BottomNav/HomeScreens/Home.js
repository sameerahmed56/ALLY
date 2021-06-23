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
    return (
      <View style={{flex: 1,backgroundColor: theme.TILE}}>
        <Header headerText="Home" showBackBtn={false}/>
        <FlatList
          data={this.state.comingRequest}
          extraData={this.state.comingRequest}
          initialNumToRender={5}
          renderItem={({ item, index }) => 
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Give Help')}>
              <Card style={{ backgroundColor: theme.WHITE, paddingVertical: 10, marginVertical: 5, marginHorizontal: 10, alignItems: 'center', width: DeviceWidth - 20 }}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.TEXT_PRIMARY}}>{item.title}</Text>
                <Image
                  source={require("../../../assets/hands.png")}
                  style={{ height: DeviceWidth - 180 , width: DeviceWidth - 120 , marginHorizontal: 5, }}
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