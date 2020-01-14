import React, { Component } from 'react';
import {
    View, Text, Dimensions,
    Keyboard, StyleSheet,
    FlatList,
} from 'react-native';
import { Drawer, Content, Container, Icon } from 'native-base';
import { TextFont_Search, HeadingFont } from '../../../Constants/fontsize';
import _Header from '../../../Components/Common/AppHeader';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CountColor, buttonBGcolor, TextColor, borderColor, RED, BBCOLOR } from '../../../Constants/colors';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PaymentList from '../../../Components/Common/_paymentHistory';
import BlinkingClass from '../BlinkingText';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
const paymentList =
    [
        { Id: 1, currentbalance: 20000, orderPrice: '2000', total: '22000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 40000, orderPrice: '2000', total: '42000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 20000, payment: '2000', total: '22000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 20000, orderPrice: '40000', total: '42000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 20000, payment: '2000', total: '22000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 20000, orderPrice: '2000', total: '22000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 20000, payment: '2000', total: '22000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 80000, payment: '20000', total: '100000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 20000, orderPrice: '42000', total: '82000', date: 'jan 21 2020' },
        { Id: 1, currentbalance: 120000, payment: '2000', total: '122000', date: 'jan 21 2020' },
    ]
export default class paymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: '', errorMsg: '',
            date: new Date(), visible: false,
            isDatePickerVisible: false,
            // payments:paymentList,
        }
    }
    goBack = () => {
        this.props.navigation.pop();
    }

    showDateTimePicker = (from) => {
        this.setState({ isDateTimePickerVisible: true });
    };

    handleDatePicked = date => {
        this.setState({ date: date });
        this.hideDateTimePicker();
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    openDate(start) {
        this.showDateTimePicker(start);
    }

    renderPayments = ({ item }) => {
        return (
            <PaymentList
                item={item}
                key={item.Id}
                navigation={this.props.navigation}
            />
        )
    }
    render() {
        const { date } = this.state;
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Payment History'} />
                <View style={styles.SearchView}>
                    <TouchableOpacity style={styles.selectDateStyle}
                        onPress={() => this.openDate(true)}>
                        <Text style={styles.startDInput}>
                            {this.state.date.toString().slice(3, 16)}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SearchIconView}>
                       <Icon
                       name={'ios-search'}
                       type={'Ionicons'}
                       style={{fontSize:RFValue(26), alignSelf:'flex-end',marginRight:15}}
                       />
                    </TouchableOpacity>
                </View>
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
                <View style={{ marginTop: RFValue(10) }}>
                    <BlinkingClass text={'300000000'} />
                </View>
                <View style={styles.content}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={paymentList}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderPayments}
                        numColumns={1}
                        horizontal={false}
                    />
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        marginHorizontal: 3,
        flex: 1,
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',

    },
    startDInput: {
         fontFamily: 'Poppins',
         fontSize: RFValue(16),
         fontWeight:'bold',
         color: TextColor,
         marginLeft: 10,
    },
    startDContainer: {
        backgroundColor: 'green',
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    IconStyle: {
        width: ScreenWidth * 0.15,
        // height: RFValue(40),
        fontSize: RFValue(30),
        backgroundColor: 'red',
        marginRight: RFValue(20)
    },
    SearchView: {
       // backgroundColor: 'red',
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'space-between',
        borderRadius:10,
        borderWidth:1,
        borderColor:BBCOLOR,
    },
    selectDateStyle: {
       // backgroundColor: 'green',
        paddingVertical: 12,
        width: ScreenWidth * 0.75,
        


    },
    SearchIconView: {
        //backgroundColor: 'blue',
        width: ScreenWidth * 0.2,
        paddingVertical: 10
    }
})