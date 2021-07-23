import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../../../../component/Header'
import colors from '../../../../constants/colors'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Snackbar, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
class AddBasicDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            title: '',
            description: '',
            fullName: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            showPassword: false,
            snackbarVisibility: false,
            snackbarMsg: '',
            genderList: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' }
            ],
            open: false,
            value: null,
            categoryHelp: ''
        };
    }
    componentDidMount() {
        const categoryHelp = this.props.route.params.categoryHelp
        console.log('categoryHelp:', categoryHelp)
        this.setState({ categoryHelp: categoryHelp })
    }
    goToPickImage = async () => {
        const { description, title, categoryHelp } = this.state
        if (title.trim() !== '' && description.trim() !== '') {
            this.props.navigation.navigate('Add Image', {
                title: title.trim(),
                description: description.trim(),
                categoryHelp: categoryHelp
            })
        }
        else {
            console.log('Fill all fields')
            this.setState({ snackbarVisibility: true, snackbarMsg: 'Fill all fields' })
        }
    }
    render() {
        const theme = colors
        return (
            <View style={{ flex: 1, backgroundColor: theme.BACKGROUND, }}>
                <Header headerText="Add Reason" showBackBtn={true} />
                <View style={{ marginHorizontal: 20 }}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={this.state.title}
                            mode='flat'
                            multiline
                            theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
                            label='Title'
                            onChangeText={(title) => this.setState({ title: title })}
                            placeholder='Enter Title for your help'
                        />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            value={this.state.description}
                            multiline
                            theme={{ colors: { primary: theme.PRIMARY }, multiline: true }}
                            mode='flat'
                            label='Description'
                            onChangeText={(description) => this.setState({ description: description })}
                            placeholder='Enter help description'
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: theme.PRIMARY, position: 'absolute', bottom: 30, right: 30, borderRadius: 28, height: 56, width: 56, elevation: 8, justifyContent: 'center', alignItems: 'center' }}  >
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => { this.goToPickImage() }}>
                        <Icon name="send" color={theme.TEXT_WHITE} size={25} />
                    </TouchableOpacity>
                </View>
                <Snackbar
                    visible={this.state.snackbarVisibility}
                    style={{ backgroundColor: theme.PRIMARY_DARK, marginBottom: 100, borderRadius: 5 }}
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
export default AddBasicDetails;
const DeviceWidth = Dimensions.get('screen').width;
const DeviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 10,
        fontSize: 15
    },
    textInputContainer: {
        // borderWidth: 1, 
        // borderColor: colors/.BORDER, 
        // elevation: 5, 
        marginVertical: 10,
    },
});