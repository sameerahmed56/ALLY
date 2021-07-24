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
      snackbarVisibility: false,
      snackbarMsg: ''
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
      this.setState({ snackbarVisibility: true, snackbarMsg: 'Some error occurred' })
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
    const { pendingList } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: theme.TILE }}>
        <Header headerText="Home" showBackBtn={false} />
        {
          pendingList.length !== 0 ?
            <FlatList
              data={this.state.pendingList}
              extraData={this.state.pendingList}
              initialNumToRender={5}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => this.goToGiveHelp(item)} activeOpacity={0.8}>
                  <Card style={{ backgroundColor: theme.WHITE, paddingVertical: 10, marginVertical: 5, paddingHorizontal: 10, marginHorizontal: 10, width: DeviceWidth - 20 }}>
                    <Text style={{ fontSize: 18, color: theme.TEXT_PRIMARY, letterSpacing: 1 }}>{item.user_name}</Text>
                    <Image
                      // source={{ uri: item.image }}
                      source={require('../../../assets/help.jpeg')}
                      style={{ height: (DeviceWidth - 40), width: DeviceWidth - 40 }}
                      resizeMode="contain"
                    />
                    <Text style={{ fontSize: 15, color: theme.TEXT_PRIMARY, }}>{item.request_title}</Text>
                    <Text style={{ fontSize: 14, color: theme.TEXT_SECONDARY, }}>{item.request_description}</Text>
                  </Card>
                </TouchableOpacity>
              } />
            :
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={{ color: theme.TEXT_PRIMARY, fontSize: 16, color: theme.TEXT_SECONDARY }}>Not Any Pending Requests</Text>
            </View>
        }
        <Snackbar
          visible={this.state.snackbarVisibility}
          style={{ backgroundColor: theme.PRIMARY_DARK, marginBottom: 30, borderRadius: 5 }}
          duration={3000}
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

export default Home
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;