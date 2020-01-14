import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    Picker,
    SafeAreaView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Content, Drawer, TabHeading } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { TextFont_Search, HeadingFont } from '../../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../Components/Common/_Button';
import { CountColor, BGColor, TextColor, borderColor } from '../../Constants/colors';
import _DisabledButton from '../../Components/Common/DisabledButton';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
const myProduct =
    [
        { Id: 1, qty: 22, name: 'abc' },
        { Id: 2, qty: 22, name: 'abc' },
        { Id: 3, qty: 22, name: 'def' },
        { Id: 4, qty: 22, name: 'ghi' },
        { Id: 5, qty: 22, name: 'jkl' },
        { Id: 10, qty: 22, name: 'adc' },
    ];

export default class EditOrder extends Component {
    constructor(props) {
        super(props);
        this.item = this.props.navigation.getParam('pData');
        this.state = {
            batch_no: this.item.batchNO,
            avatarSource:null,
            date: this.item.date,
            isDatePickerVisible: false,
            buttonDisabled: true,
        }
    }
   
    goBack = () => {
        this.props.navigation.pop();
    }

    selectPhotoTapped() {
        const options = {
            title: 'Select Picture',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
            }
        });
    };

    showDateTimePicker = (from) => {
        this.setState({ isDateTimePickerVisible: true, buttonDisabled: false });
    };
    handleDatePicked = date => {
        //let dateText = this.convertDateTimeToString(date)
        this.setState({ date: date });
        this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    openDate(start) {
        this.showDateTimePicker(start);
    }

    _save = () => {
        alert('save')
    }

    render() {
        const { Pname, date, buttonDisabled } = this.state;
        return (
           
                <Container style={styles.container}>
                    <_Header
                        ImageLeftIcon={'keyboard-backspace'}
                        LeftPress={() => this.goBack()}
                        //  LeftPress={() => this.openDrawer()}
                        HeadingText={'Edit Order'} />
                    <Content style={styles.content}>
                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.avatarContainer}
                                onPress={this.selectPhotoTapped.bind(this)}>
                                {this.state.avatarSource === null ? (
                                    <Text>invoice Photo</Text>
                                ) : (
                                        <Image style={styles.avatar} source={this.state.avatarSource} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.Heading}>Batch_No</Text>
                        <View style={styles.Input}>
                            <Text_Input
                                placeholder={'Batch No'}
                                onChangeText={(value) => this.setState({ batch_no: value, buttonDisabled: false })}
                                value={this.state.batch_no}
                            />
                        </View>
                        <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
                        <TouchableOpacity style={styles.startDContainer} onPress={() => this.openDate(true)}>
                            <View>
                                <Text style={styles.startDInput}>
                                    {this.state.date.toString().slice(0, 16)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            is24Hour={false}
                            mode={'date'}
                            datePickerModeAndroid={'spinner'}
                            timePickerModeAndroid={'spinner'}
                            date={date}
                        />
                        
                        <View style={{ marginTop: 25, marginBottom: 20 }}>
                            {buttonDisabled ?
                                <_DisabledButton
                                    textButton={'Save'}
                                /> :
                                <_Button
                                    textButton={'Save'}
                                    onPress={() => this._save()} />
                            }
                        </View>

                    </Content>
                </Container>
        
        )
    }
};
const styles = StyleSheet.create({
    container: {
        height: ScreenHeight
    },
    content: {
        paddingHorizontal: 10,
        flex: 1,

    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        // borderRadius: 10,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: borderColor,
        paddingHorizontal: 15,
        //color:'green'
        // marginHorizontal: 10,


    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',

    },
    Input: {
        paddingVertical: 10
    },

    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 75
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        width: '100%',
        color: 'black',
        fontSize: RFValue(16),
        backgroundColor: 'white',
        // paddingTop:10,
        // paddingLeft:10,
        // marginBottom:10,
    },
    startDContainer: {
        backgroundColor: 'white',
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 0,
        marginBottom: 5
    },
})