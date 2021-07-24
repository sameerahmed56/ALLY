import React, { PureComponent } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import Header from '../../../component/Header'
import color from '../../../constants/colors'
import { Button, Snackbar, TextInput, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import storageKeys from '../../../constants/storageKeys'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FloatingAction } from "react-native-floating-action";
import urls from '../../../constants/urls'
import { getRequest } from '../../../services/NetworkRequest'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'

class Helps extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      snackbarVisibility: false,
      snackbarMsg: '',
      pendingList: []
    }
  }

  async componentDidMount() {
    // const response = await getRequest(urls.MY_REQUESTS)
    // console.log('response:', response)
    this.setData();
  }
  setData = async () => {
    try {
      const response = await getRequest(urls.MY_REQUESTS)
      // const categoryResponse = await getRequest(urls.REQUEST_CATEGORY)
      // console.log(categoryResponse)
      console.log('response:', response)
      this.setState({ pendingList: response })
    } catch (error) {
      this.setState({ snackbarVisibility: true, snackbarMsg: 'Some error occurred' })
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
    const theme = color
    const { pendingList } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Your Help Requests" showBackBtn={false} />
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

                    <Text style={{ fontSize: 15, color: theme.TEXT_PRIMARY, }}>{item.request_title}</Text>
                    <Text style={{ fontSize: 14, color: theme.TEXT_SECONDARY, }}>{item.request_description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3 }}>
                      <Text style={{ fontSize: 15, color: theme.TEXT_PRIMARY, }}>Current Status : </Text>
                      <Text style={{ fontSize: 14, color: theme.TEXT_SECONDARY, }}>Pending</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              } />
            :
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={{ color: theme.TEXT_PRIMARY, fontSize: 16, color: theme.TEXT_SECONDARY }}>Not Any Request</Text>
            </View>
        }
        <FloatingAction
          color={theme.PRIMARY}
          actions={actions}
          onPressItem={position => {
            console.log('position:', position)
            this.filterBy = position
            this.props.navigation.navigate('Add Basic Details', {
              categoryHelp: position
            })
          }}
        />
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

export default Helps;
const DeviceWidth = Dimensions.get('window').width
const DeviceHeight = Dimensions.get('window').height

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


});

const actions = [
  {
    text: "Financial Help",
    icon: <FontAwesome name={'rupee'} color={color.WHITE} size={20} />,
    name: 1,
    position: 1,
    color: color.PRIMARY
  }, {
    text: "Medical Help",
    icon: <MaterialCommunityIcons name="medical-bag" color={color.WHITE} size={20} />,
    name: 2,
    position: 2,
    color: color.PRIMARY
  },
]