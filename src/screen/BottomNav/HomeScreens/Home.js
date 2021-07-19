import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Snackbar, TextInput, Card } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import Header from '../../../component/Header'
import colors from '../../../constants/colors'
import urls from '../../../constants/urls'
import { getRequest } from '../../../services/NetworkRequest'
class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      pendingList: [],
    }
  }
  async componentDidMount() {
    this.setData()
  }
  setData = async () => {
    try {
      const response = await getRequest(urls.ALL_POST)
      console.log('response:', response)
      this.setState({ pendingList: response })
    } catch (error) {
      console.log('error:', error)
    }
  }
  goToGiveHelp = (item) => {
    console.log('item:', item)
    this.props.navigation.navigate('Give Help', {
      onePostData: item
    })
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
            <TouchableOpacity onPress={() => this.goToGiveHelp(item)} activeOpacity={0.8}>
              <Card style={{ backgroundColor: theme.WHITE, paddingVertical: 10, marginVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, width: DeviceWidth - 20 }}>
                <Text style={{ fontSize: 18, color: theme.TEXT_PRIMARY, letterSpacing: 1 }}>{item.user_name}</Text>
                <Image
                  source={{ uri: item.image }}
                  style={{ height: (DeviceWidth - 40) * (item.image_ht / item.image_width), width: DeviceWidth - 40 }}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 15, color: theme.TEXT_PRIMARY, }}>{item.request_title}</Text>
                <Text style={{ fontSize: 14, color: theme.TEXT_SECONDARY, }}>{item.request_description}</Text>
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