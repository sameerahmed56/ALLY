import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, StyleSheet, Dimensions, BackHandler, Modal, Linking, StatusBar } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom';
import colors from '../../../constants/colors';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from "react-native-animatable";
import Header from '../../../component/Header'

export class ShowNotification extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: true,
            notificationData: {},
            imageVisible: false,
            width: 20,
            height: 20,
            imageLoadError: false
        }
    }
    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (!this.props.route.params.data.imageUrl) {
            this.props.route.params.data.imageUrl = "no image"
        }
        this.setState({ notificationData: this.props.route.params.data, loading: false }, () => {
            this.getImageSize(this.state.notificationData.imageUrl)
        })
    }

    getImageSize = (uri) => {
        Image.getSize(uri, (width, height) => {
            // let ratio = height/width
            // let reqHeight = height
            // let reqWidth = width
            // if(ratio<1){
            //     reqWidth=Dimensions.get('window').width
            //     reqHeight=ratio*height
            // }else if(ratio>1){
            //     reqHeight=Dimensions.get('window').height
            //     reqWidth=height/ratio
            // }
            // this.setState({ width: reqWidth, height: reqHeight });
            this.setState({ width: width, height: height });
        });
    }

    handleBackButtonClick = () => {
        this.props.navigation.navigate("Account");
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    render() {
        const { notificationData, width, height } = this.state

        return (

            <View style={{ ...styles.Container, backgroundColor: colors.BACKGROUND, }}>
                <Header headerText="Notification" showBackBtn={true} />

                <ScrollView>
                    <View style={{ ...styles.Tile, backgroundColor: colors.TILE }}>
                        <Text style={{ color: colors.TEXT_PRIMARY, fontSize: 15, padding: 10, }}> {notificationData.title} </Text>
                        <Text style={{ color: colors.TEXT_PRIMARY, fontSize: 15, padding: 10, }}> {notificationData.body} </Text>
                    </View>




                </ScrollView>

                <Modal
                    visible={this.state.imageVisible}
                    style={{ backgroundColor: colors.BACKGROUND }}
                    animationType={"fade"}
                    transparent={true}
                    onRequestClose={() => { this.setState({ imageVisible: false }) }}
                >
                    <ImageZoom
                        style={{ flex: 1, backgroundColor: colors.BACKGROUND }}
                        cropWidth={DeviceWidth}
                        cropHeight={Dimensions.get('window').height}
                        onSwipeDown={() => { this.setState({ imageVisible: false }) }}
                        enableSwipeDown={true}
                        imageWidth={DeviceWidth * 4 / 5}
                        imageHeight={DeviceWidth * 4 / 5}
                    >
                        <Image style={{ width: DeviceWidth * 4 / 5, height: DeviceWidth * 4 / 5 }}
                            source={{ uri: notificationData.imageUrl }} />
                    </ImageZoom>
                </Modal>
            </View>

        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowNotification)

const DeviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    Tile: {
        width: DeviceWidth,
        marginTop: 10
    },
    SubmitButton: {
        margin: 10,
    }
});
// {
//     !this.state.imageLoadError &&
//     <TouchableOpacity style={{ margin: 10 }} onPress={() => { this.setState({ imageVisible: true }) }}>
//         <ImageBackground onError={(e) => { this.setState({ imageLoadError: true }) }} imageStyle={{ borderRadius: DeviceWidth * 4 / 5, }} style={{ width: DeviceWidth * 4 / 5, height: DeviceWidth * 4 / 5 }}
//             source={{ uri: notificationData.imageUrl }}>
//             <View>
//                 {
//                     <Animatable.View style={{ position: 'absolute', alignSelf: 'center', top: DeviceWidth * 2 / 5 }} animation="fadeOut" iterationCount={2} >
//                         <MaterialIcon size={50} name="touch-app" color={"tomato"} />
//                     </Animatable.View>
//                 }


//             </View>

//         </ImageBackground>
//     </TouchableOpacity>
// }
// {
//     this.state.imageLoadError &&
//     <View>
//         <Image style={{ width: DeviceWidth * 4 / 5, height: DeviceWidth * 4 / 5, borderRadius: DeviceWidth * 4 / 5, margin: 10, opacity: 1, tintColor: colors.THEME_ORANGE }} source={require('../../../assets/noPreview.png')} />
//         {/* <Text style={{color:theme.TEXT_PRIMARY,position:'absolute',top:DeviceWidth*2/5+70,alignSelf:"center",fontSize:18,fontWeight:'bold'}}>Image Unavailable</Text> */}
//     </View>
// }