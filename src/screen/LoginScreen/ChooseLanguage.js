import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import color from '../../constants/colors';
class ChooseLanguage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      englishLanguageSelected: false,
      spanishLanguageSelected: false,
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.BACKGROUND,
        }}>
        <View style={{marginTop: 60, marginBottom: 25, marginHorizontal: 20}}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              letterSpacing: 1,
              color: color.THEME_ORANGE,
            }}>
            Choose your languages
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              englishLanguageSelected: !this.state.englishLanguageSelected,
            });
          }}
          activeOpacity={0.9}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.THEME_ORANGE,
              padding: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 25,
              marginHorizontal: 20,
            }}>
            <Image source={require('../../assets/american_flag_sqr.png')} />
            <Text
              style={{
                fontSize: 18,
                color: color.TEXT_PRIMARY,
                fontWeight: 'bold',
              }}>
              American English
            </Text>
            {this.state.englishLanguageSelected ? (
              <View
                style={{
                  borderColor: color.THEME_ORANGE,
                  borderRadius: 50,
                  borderWidth: 1,
                  padding: 5,
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={require('../../assets/orange_tick.png')} />
              </View>
            ) : (
              <View
                style={{
                  borderColor: color.THEME_ORANGE,
                  borderRadius: 50,
                  borderWidth: 1,
                  padding: 5,
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            )}
          </View>
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity
          onPress={() => {
            this.setState({
              spanishLanguageSelected: !this.state.spanishLanguageSelected,
            });
          }}
          activeOpacity={0.9}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: color.THEME_ORANGE,
              padding: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 25,
              marginHorizontal: 20,
            }}>
            <Image source={require('../../assets/spain_flag_sqr.png')} />
            <Text
              style={{
                fontSize: 18,
                color: color.TEXT_PRIMARY,
                fontWeight: 'bold',
              }}>
              Spanish
            </Text>
            {this.state.spanishLanguageSelected ? (
              <View
                style={{
                  borderColor: color.THEME_ORANGE,
                  borderRadius: 50,
                  borderWidth: 1,
                  padding: 5,
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={require('../../assets/orange_tick.png')} />
              </View>
            ) : (
              <View
                style={{
                  borderColor: color.THEME_ORANGE,
                  borderRadius: 50,
                  borderWidth: 1,
                  padding: 5,
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            right: 20,
          }}>
          {this.state.englishLanguageSelected ||
          this.state.spanishLanguageSelected ? (
            <Image
              source={require('../../assets/next_page_active_arrow.png')}
            />
          ) : (
            <Image
              source={require('../../assets/next_page_deactive_arrow.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ChooseLanguage;
