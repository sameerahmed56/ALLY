import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newNotification } from '../../../redux/actions';
import store from '../../../redux/store'
import * as Animatable from "react-native-animatable";
// import DeviceInfo from 'react-native-simple-device-info';
// import { MyContext } from '../../../navigation/AppNavigation'
import  colors from '../../../constants/colors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Header from '../../../component/Header'


class Account extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const theme = colors
    const badgeCount =store.getState().reducer.newNotification
    console.log(badgeCount.count)

    return (
      <View style={{flex: 1}}>
        <Header headerText="Account" showBackBtn={false}/>
         <TouchableOpacity onPress={() => { this.props.navigation.navigate("Notification Screen") }} activeOpacity={0.8}>
              <View style={{ backgroundColor: colors.BACKGROUND, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingVertical: 15, borderRadius: 3, elevation: 2 }}>
                  <IconWithBadge name="bell" size={27} color={colors.THEME_ORANGE} badgeCount={badgeCount.count} />
                  <Text style={{ color: colors.TEXT_PRIMARY, fontSize: 16, paddingLeft: 15 }}>Notification</Text>
              </View>
          </TouchableOpacity>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  notification: state.reducer.newNotification

})
const mapDispatchToProps = dispatch => ({
  newNotification: bindActionCreators(newNotification, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
      <Animatable.View animation={badgeCount ? "rubberBand" : ''} iterationCount={"infinite"} style={{ width: size, height: size, }}>
          <Icon name={name} size={size} color={color} />
          {badgeCount > 0 && (
              <View
                  style={{
                      position: 'absolute',
                      right: -6,
                      top: -3,
                      backgroundColor: 'red',
                      borderRadius: 6,
                      width: 12,
                      height: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5
                  }}
              >
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {badgeCount}
                  </Text>
              </View>
          )}
      </Animatable.View>
  );
}
