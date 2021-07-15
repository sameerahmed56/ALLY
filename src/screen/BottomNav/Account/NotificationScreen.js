import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, BackHandler, Image, Alert } from 'react-native'
import urls from '../../../constants/urls'
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import storageKeys from '../../../constants/storageKeys'
import { TouchableRipple, Snackbar } from 'react-native-paper';
import colors from '../../../constants/colors';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newNotification } from '../../../redux/actions'
import Swipeout from 'react-native-swipeout';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Header from '../../../component/Header'

export class NotificationScreen extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            loading: false,
            data: [],
            available: true,
            prompt: false,
            delete: () => { },
            snackbarVisibility: false,
            snackbarMsg: '',
            undo: () => { },
            // imageLoadError:false,
            clickable: false
        }
    }
    async componentDidMount() {

        let notificationData = this.props.notification
        notificationData.count = null;
        await AsyncStorage.removeItem(storageKeys.NEW_NOTIFICATION)
        this.props.updateNotification(notificationData)
        let data = await AsyncStorage.getItem(storageKeys.NOTIFICATION_DATA)
        console.log('data33:', data)
        data = JSON.parse(data)
        if (data == null || data.length == []) {
            this.setState({ available: false, loading: false })
        } else {
            this.setState({ data: data, available: true, loading: false })
        }
    }


    handleBackButtonClick = () => {
        this.props.navigation.navigate("Account");
        return true;
    }

    deleteNotification = async (index) => {
        const { data } = this.state
        const deleted = data.splice(index, 1)
        if (data.length == 0) {
            await AsyncStorage.removeItem(storageKeys.NOTIFICATION_DATA)
            this.setState({ available: false })
            this.setState({
                data: data, snackbarMsg: 'Successfully Deleted', snackbarVisibility: true, available: false,
                undo: () => {
                    this.undoNotifiction(deleted, index)
                    this.setState({ available: true })
                }
            })
        } else {
            await AsyncStorage.setItem(storageKeys.NOTIFICATION_DATA, JSON.stringify(data))
            this.setState({
                data: data, snackbarMsg: 'Successfully Deleted', snackbarVisibility: true,
                undo: () => { this.undoNotifiction(deleted, index) }
            })
        }
    }

    undoNotifiction = async (notification, index) => {
        let { data } = this.state
        data.splice(index, 0, notification[0])
        this.setState({ data: data })
        await AsyncStorage.setItem(storageKeys.NOTIFICATION_DATA, JSON.stringify(data))
    }

    notificationTile = (props) => {
        const { data, index } = props
        // if (!data.imageUrl) {
        //     data.imageUrl = "no image"
        // }
        const swipeoutBtns = [
            {
                text: 'DELETE',
                type: 'delete',
                // color:'white',
                scroll: false,
                onPress: () => {
                    this.deleteNotification(index)
                }
            }
        ]
        return (
            <Swipeout
                style={{ ...styles.Tile, flexDirection: 'row', padding: 0 }}
                right={swipeoutBtns}
                // left={swipeoutBtns}
                buttonWidth={DeviceWidth * 4 / 5}

                autoClose={true}

            >
                <TouchableRipple
                    style={{ ...styles.Tile, backgroundColor: colors.TILE, flexDirection: 'row', padding: 10, marginTop: 0 }}
                    onPress={() => { this.props.navigation.navigate('Show Notification', { data: data }) }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={{ flexDirection: 'column', flex: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5 }}>
                            <Text style={{ color: colors.TEXT_PRIMARY, fontSize: 17 }}>{data.title}</Text>
                            <Text style={{ color: colors.TEXT_PRIMARY, fontSize: 17 }}>{data.body}</Text>
                            <Text style={{ color: colors.TEXT_SECONDARY, fontSize: 13, margin: 5, alignSelf: 'flex-end', marginLeft: 15 }}>received on ~ {data.timeStamp}</Text>
                        </View>
                    </View>


                </TouchableRipple>
            </Swipeout>

        )
    }


    render() {

        return (

            <View style={{ ...styles.Container, backgroundColor: colors.BACKGROUND, }}>
                <Header headerText="Notification" showBackBtn={true} />

                {
                    this.state.available &&
                    <ScrollView >
                        {
                            this.state.data.map((data, index) => {
                                return (
                                    <this.notificationTile data={data} index={index} />
                                )
                            })
                        }
                    </ScrollView>
                }

                {
                    !this.state.loading && !this.state.available &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 200, width: 200, tintColor: colors.PRIMARY_DARK }} source={require('../../../assets/noPreview.png')} />
                        <Text style={{ alignSelf: "center", margin: 10, color: colors.TEXT_PRIMARY }}>Nothing To Show Here</Text>
                    </View>
                }
                {/* <ConfirmDialog
                        visible={this.state.prompt}
                        title="Are You Sure To Delete ?"
                        positiveButton={{
                            title: "Delete",
                            onPress: () => {
                            this.state.delete()
                            this.setState({prompt:false,delete:()=>{}})
                        }
                        }} 
                        negativeButton={{
                            title: "CANCEL",
                            onPress: () => this.setState({prompt:false})
                        }}
                        > 
                        
                    </ConfirmDialog> */}


                <Snackbar
                    visible={this.state.snackbarVisibility}
                    onDismiss={() => this.setState({ snackbarVisibility: false })}
                    duration={4000}
                    action={{
                        label: "UNDO",
                        onPress: () => {
                            this.state.undo()
                            this.setState({ snackbarVisibility: false })
                        }
                    }}
                    action={{
                        label: "UNDO",
                        onPress: () => {
                            this.state.undo()
                            this.setState({ snackbarVisibility: false })
                        }
                    }}
                >
                    {this.state.snackbarMsg}
                </Snackbar>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    notification: state.reducer.newNotification,
})

const mapDispatchToProps = dispatch => ({
    updateNotification: bindActionCreators(newNotification, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationScreen)

const DeviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    Tile: {
        padding: 10,
        width: DeviceWidth,
        marginTop: 10
    },
});
const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};
