import React, { PureComponent } from 'react'
import { View,Text } from 'react-native'
import Header from '../../component/Header'
import colors from '../../constants/colors'

class AddHelpRequest extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText="AddHelpRequest" showBackBtn={true}/>
        <View style={{position: 'absolute', bottom: 10, right: 10, borderRadius: 30, height: 60, width: 60, backgroundColor: colors.PRIMARY}}>

        </View>
      </View>
    )
  }
}

export default AddHelpRequest