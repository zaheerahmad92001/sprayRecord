import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Keyboard,
    Picker
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import Text_Input from '../../Components/Common/inputField';
import { CountColor, RED, TextColor, borderColor } from '../../Constants/colors';
import { Container, Content, Drawer } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../Components/Common/_Button';
import { ValidateNumber, Validate ,ValidateDecimalNumber } from '../../RandFunction';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

// var date = new Date().getDate();
// var month = new Date().getMonth() + 1;
// var year = new Date().getFullYear();

// if (month <= 9 && date <= 9) {
//     var currentDate = year + '-' + '0' + month + '-' + '0'+ date;
// } else if(month > 9 && date <= 9) {
//     var currentDate = year + '-' + month + '-' + '0'+ date;
// } else if (month <= 9 && date > 9){
//     var currentDate = year + '-' + '0'+ month + '-' + date;

// } else {
//     var currentDate = year + '-' +  month + '-' + date;
// }


const myProduct =
    [
        { Id: 1, qty: 22, name: 'abc' },
        { Id: 2, qty: 22, name: 'abc' },
        { Id: 3, qty: 22, name: 'def' },
        { Id: 4, qty: 22, name: 'ghi' },
        { Id: 5, qty: 22, name: 'jkl' },
        { Id: 10, qty: 22, name: 'adc' },
    ]

export default class DailySale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SearchValue: '',
            qty: '',
            isDatePickerVisible: false,
            date: new Date(),
            errorMsg: '',
            //date:currentDate,
            matchedproduct: myProduct,
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

    openDrawer = async () => {
        await Keyboard.dismiss()
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)

    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();
    };
    _Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
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
    saveInfo = () => {
        const { SearchValue, date, qty , weight, weightUnit } = this.state;
        if (Validate(SearchValue)) {
            if (ValidateNumber(qty)) {
                if(weightUnit && weightUnit.length && ValidateDecimalNumber(weight)){
                this.setState({ errorMsg: '' })
                this.Create(SearchValue, date, qty,weight,weightUnit)
                } else{
                    this.setState({errorMsg:'Enter weight in KG or ML without space and special character'})
                }
            } else {
                this.setState({ errorMsg: 'Enter quantity without space and special character' })
            }
        } else {
            this.setState({ errorMsg: 'Enter product name white no white space in the beginning ' })
        }
    }
    Create = (name, qty, date) => {
        alert(name)
    }
    render() {
        const { SearchValue, date, qty, errorMsg } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                tapToClose={true}
                negotiatePan={true} >
                <Container style={styles.container}>
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => this.openDrawer()}
                        HeadingText={'Daily Sale'} />
                    <Content style={styles.content}>
                        <View style={styles.logo}>
                            <Image
                                source={require('../../assets/image/squadly_logo.png')}

                            />
                        </View>


                        <View style={{ marginBottom: RFValue(10), marginTop: RFValue(35) }}>
                            <Text style={[styles.Heading], { marginBottom: 10 }}>Product Name</Text>
                            <Autocomplete
                                style={styles.AutocompleteStyle}
                                autoCapitalize="none"
                                autoCorrect={false}
                                inputContainerStyle={{ borderWidth: 0, color: 'red' }}
                                data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].name) ? [] : matchedproduct}
                                defaultValue={SearchValue}
                                onChangeText={(text) => this.setState({ SearchValue: text ,errorMsg:'' })}
                                placeholder="Product Name "
                                placeholderTextColor={'#979797'}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ SearchValue: item.name })}>
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}>
                            </Autocomplete>
                        </View>
                        <Text style={styles.Heading}>Qty</Text>
                        <View style={styles.Input}>
                            <Text_Input
                                placeholder={'Quantity'}
                                onChangeText={(value) => this.setState({ qty: value , errorMsg:''})}
                                value={this.state.qty}
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <Text style={styles.Heading}>Product Weight</Text>
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <Text_Input
                                styles={{ flex: 0.7 }}
                                placeholder={'Product weight'}
                                onChangeText={(value) => this.setState({ weight: value ,errorMsg:'' })}
                                value={this.state.weight}
                                keyboardType={'numeric'}
                            />
                            <Picker
                                mode={'dropdown'}
                                enabled={true}
                                selectedValue={this.state.weightUnit}
                                style={{ flex: 0.5 }}
                                onValueChange={(Value, Index) => this.setState({ weightUnit: Value , errorMsg:'' })}
                            >
                                <Picker.Item label="select Unit..." value="" />
                                <Picker.Item label="kg" value="kg" />
                                <Picker.Item label="ml" value="ml" />
                            </Picker>
                        </View>

                        <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
                        <TouchableOpacity style={styles.startDContainer} onPress={() => this.openDate(true)}>
                            <View>
                                <Text style={styles.startDInput}>
                                    {this.state.date.toString().slice(3, 16)}
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
                        {/* <DatePicker
                         style={{width:ScreenWidth*0.9,
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
                             right: -10,
                             top: 4,
                             marginRight: 0,
                            
                           },
                           dateInput: {
                             marginRight: 36,
                             borderRadius:10,
                             borderColor:borderColor,
                             
                           }
    
                         }}
                         onDateChange={(date) => {this.setState({date: date})}}
                       /> */}
                        <Text style={styles.errorText}>{errorMsg}</Text>
                        <View style={{ marginTop: RFValue(10), marginBottom: 20 }}>
                            <_Button
                                textButton={'Save '}
                                onPress={() => this.saveInfo()}
                            />
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
        marginTop: 15,
        //  paddingVertical: 40

    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        borderWidth: 1,
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
    logo: {
        flex: 0.35,
        justifyContent: "center",
        alignItems: "center",
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
        borderRadius: RFValue(75),
        width: RFValue(150),
        height: RFValue(150),
    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        width: '100%',
        color: 'black',
        fontSize: RFValue(16),
        backgroundColor: 'white',
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
        marginBottom: 5
    },
    errorText: {
        marginTop: 5,
        marginBottom: 5,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
})