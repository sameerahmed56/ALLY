import React, { PureComponent } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../../../component/Header'
import color from '../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import storageKeys from '../../../constants/storageKeys'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FloatingAction } from "react-native-floating-action";
import urls from '../../../constants/urls'
import { getRequest } from '../../../services/NetworkRequest'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'

class Helps extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  async componentDidMount() {
    // const response = await getRequest(urls.MY_REQUESTS)
    // console.log('response:', response)
  }
  render() {
    const theme = color
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Help" showBackBtn={false} />
        <FloatingAction
          color={theme.PRIMARY}
          actions={actions}
          onPressItem={name => {
            this.filterBy = name
            this.props.navigation.navigate('Add Basic Details')
          }}
        />
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
    text: "Medical Help",
    icon: <AntDesign name="user" color={color.WHITE} size={20} />,
    name: "normal",
    position: 1,
    color: color.PRIMARY
  }, {
    text: "Financial Help",
    icon: <Entypo name={'location-pin'} color={color.WHITE} size={20} />,
    name: "od",
    position: 2,
    color: color.PRIMARY
  },
]