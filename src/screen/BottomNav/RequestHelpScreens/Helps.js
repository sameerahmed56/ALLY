import React, { PureComponent } from 'react'
import { View,Text } from 'react-native'
import Header from '../../../component/Header'
import color from '../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import storageKeys from '../../../constants/storageKeys'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FloatingAction } from "react-native-floating-action";

class Helps extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    const theme = color
    return (
      <View style={{flex: 1}}>
        <Header headerText="Helps" showBackBtn={true}/>
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

export default Helps;;
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