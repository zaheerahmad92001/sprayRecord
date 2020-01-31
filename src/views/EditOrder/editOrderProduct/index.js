import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    Picker,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../../../Components/Common/AppHeader';
import Text_Input from '../../../Components/Common/inputField';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Content, Drawer, TabHeading } from 'native-base';
import Sidebar from '../../../Components/sidebar/menu';
import { TextFont_Search, HeadingFont } from '../../../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../../Components/Common/_Button';
import { CountColor, BGColor, TextColor, borderColor } from '../../../Constants/colors';
import _DisabledButton from '../../../Components/Common/DisabledButton';
import { convertDateToString } from '../../../RandFunction'
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

export default class EditOrderProduct extends Component {
    constructor(props) {
        super(props);
        this.item = this.props.navigation.getParam('pData');
        this.state = {
            productName: this.item.name,
            qty: this.item.RQty,
            weight: this.item.weight,
            weightUnit: this.item.unit,
            // date: currentDate,
            avatarSource: this.item.invoiceimg,
            matchedproduct: myProduct,
            date: this.item.date,
            isDatePickerVisible: false,
            buttonDisabled: true,
        }
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedproduct } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedproduct.filter((product) => product.name.search(regex) >= 0);
    };

    openDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.open();
    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();
    };
    goBack = () => {
        this.props.navigation.pop();
    }

    showDateTimePicker = (from) => {
        this.setState({ isDateTimePickerVisible: true, buttonDisabled: false });
    };
    handleDatePicked = date => {
        //let dateText = this.convertDateTimeToString(date)
        date = convertDateToString(date)
        this.setState({ date });
        this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };


    saveInfo = () => {
        alert('save')
    }

    render() {
        const { productName, date, buttonDisabled } = this.state;
        const matchedproduct = this.findProduct(productName);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                tapToClose={true}
                negotiatePan={true}>
                <Container style={styles.container}>
                    <_Header
                        ImageLeftIcon={'keyboard-backspace'}
                        LeftPress={() => this.goBack()}
                        //  LeftPress={() => this.openDrawer()}
                        HeadingText={'Edit Product'} />
                    <Content style={styles.content}>

                        <View style={{ marginBottom: 10, marginTop: 15 }}>
                            <Text style={[styles.Heading]}>Product Name</Text>
                            <View style={{ marginTop: 10 }}>
                                <Text_Input
                                    placeholder={'Product Name'}
                                    autoCapitalize={true}
                                    onChangeText={(value) => this.setState({ productName: value, buttonDisabled: false })}
                                    value={this.state.productName} />
                            </View>
                            {/* <Autocomplete
                                style={styles.AutocompleteStyle}
                                autoCapitalize="none"
                                autoCorrect={false}
                                inputContainerStyle={{ borderWidth: 0, color: 'red' }}
                                data={matchedproduct.length >= 1 && comp(productName, matchedproduct[0].name) ? [] : matchedproduct}
                                defaultValue={productName}
                                onChangeText={(text) => this.setState({ productName: text, buttonDisabled: false })}
                                placeholder="Product Name "
                                placeholderTextColor={'#979797'}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ productName: item.name })}>
                                        <Text style={styles.itemText}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}>
                            </Autocomplete> */}
                        </View>
                        <Text style={styles.Heading}>Qty</Text>
                        <View style={styles.Input}>
                            <Text_Input
                                placeholder={'Quantity'}
                                onChangeText={(value) => this.setState({ qty: value, buttonDisabled: false })}
                                value={this.state.qty}
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <Text style={styles.Heading}>Product Weight</Text>
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <Text_Input
                                styles={{ flex: 0.7 }}
                                placeholder={'Product weight'}
                                onChangeText={(value) => this.setState({ weight: value, buttonDisabled: false })}
                                value={this.state.weight}
                                keyboardType={'numeric'}
                            />
                            <Picker
                                mode={'dropdown'}
                                enabled={true}
                                selectedValue={this.state.weightUnit}
                                style={{ flex: 0.5 }}
                                onValueChange={(Value, Index) => this.setState({ weightUnit: Value, buttonDisabled: false })}
                            >
                                <Picker.Item label="select Unit..." value="" />
                                <Picker.Item label="kg" value="kg" />
                                <Picker.Item label="ml" value="ml" />
                                <Picker.Item label="gram" value="gram" />
                            </Picker>
                        </View>
                        <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
                        <TouchableOpacity style={styles.startDContainer}
                            onPress={() => this.showDateTimePicker()}>
                            <View>
                                <Text style={styles.startDInput}>
                                    {/* {this.state.date.toString().slice(0, 16)} */}
                                    {!date || !date.length ? 'Select date' : date}
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

                        />
                        {/* <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
            <DatePicker
              style={{
                width: ScreenWidth * 0.9,
              }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1996-01-01"
              maxDate="2096-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: -8,
                  top: 0,
                  marginRight: 0,
                  height: ScreenHeight * 0.06,
                  width: ScreenWidth * 0.1

                },
                dateInput: {
                  marginRight: 36,
                  borderBottomRightRadius: 15,
                  borderTopLeftRadius: 15,
                  borderWidth: 2,
                  borderColor: borderColor,
                  height: ScreenHeight * 0.075
                }
              }}
              onDateChange={(date) => { this.setState({ date: date }) }} /> */}


                        <View style={{ marginTop: RFValue(30), }}>
                            {buttonDisabled ?
                                <_DisabledButton
                                    textButton={'Save'}
                                /> :
                                <_Button
                                    textButton={'Save'}
                                    onPress={() => this.saveInfo()} />
                            }
                        </View>

                    </Content>
                </Container>
            </Drawer>

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
        borderWidth: 1,
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
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 0,
        marginBottom: 5
    },
})