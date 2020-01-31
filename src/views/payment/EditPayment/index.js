import React, { Component } from 'react';
import {
    View, Text, Dimensions,
    Keyboard, StyleSheet
} from 'react-native';
import _Header from '../../../Components/Common/AppHeader';
import Text_Input from '../../../Components/Common/inputField';
import _Button from '../../../Components/Common/_Button';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import { Container } from 'native-base';
import BlinkingClass from '../BlinkingText';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CountColor, buttonBGcolor,} from '../../../Constants/colors';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import _DisabledButton from '../../../Components/Common/DisabledButton';
import {convertDateToString}from '../../../RandFunction';
import styles from '../EditPayment/styles';
import Dialog,
{
    DialogTitle,
    DialogContent,
    SlideAnimation,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import { ValidateDecimalNumber } from '../../../RandFunction';
export default class EditPayment extends Component {
    constructor(props) {
        super(props);
        this.item = this.props.navigation.getParam('paymentDetail');
        this.state = {
            price: this.item.price, errorMsg: '',
            date: '', visible: false,
            isDatePickerVisible: false,
            buttonDisabled: true,
            batch_no:this.item.batch_no,
        }
    }

    goBack = () => {
        this.props.navigation.pop();
    }
    keyboardDismiss = () => {
        Keyboard.dismiss()
    }
    showDateTimePicker = (from) => {
        this.setState({ isDateTimePickerVisible: true, buttonDisabled: false, });
    };
    handleDatePicked = date => {
        date=convertDateToString(date)
        this.setState({ date });
        this.hideDateTimePicker();
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    CallDialogBox = () => {
        this.setState({ visible: true })
    }
    CancelDialog = () => {
        this.setState({ visible: false });
    }
    saveInfo = () => {
        const { price } = this.state;
        if (ValidateDecimalNumber(price)) {
            this.setState({ errorMsg: '' })
            this.CallDialogBox()
        } else {
            this.setState({ errorMsg: 'Enter Payment in digits ' })
        }
    };
    savePayment = () => {
        const { payment } = this.state;
        this.CancelDialog();
        alert('payment saved')
    }
    render() {
        const { date, price, isDatePickerVisible, errorMsg, buttonDisabled,batch_no } = this.state;
        return (
            <Container style={{ flex: 1 }}>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={this.item.type === 'payment' ? 'Eidt Payment' : 'Edit Invoice Value'} />
                <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}>
                    <View style={{ marginTop: RFValue(10) }}><BlinkingClass text={'300000000'}/></View>
                    <View style={{ marginTop: ScreenHeight * 0.03 }}>
                    <Text style={{ textAlign: 'center', color: CountColor }}>This amount will be added into your current balance</Text>
                    </View> 
                    <View style={styles.content}>
                        <Text style={styles.Heading}>Payment</Text>
                        <View style={[styles.Input, { flexDirection: 'row' }]}>
                            <Text style={styles.RsText} >Rs.</Text>
                            <Text_Input
                                styles={{ flex: 1, borderLeftWidth: 0, borderTopLeftRadius: 0, paddingLeft: 3 }}
                                onChangeText={(value) => this.setState({ price: value, errorMsg: '' })}
                                value={price}
                                keyboardType={'number-pad'}/></View>
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
                        {this.item.type==='orderPrice' ?
                            <View>
                            <Text style={[styles.Heading, { marginBottom: 10 }]}>Batch No</Text>
                            <View>
                            <Text_Input
                                styles={{borderTopLeftRadius: 10, paddingHorizontal:10,color:CountColor }}
                                onChangeText={(value) => this.setState({ batch_no: value, errorMsg: '' })}
                                value={batch_no}
                                editable={false}/></View>
                                </View>
                                 :null }
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            is24Hour={false}
                            mode={'date'}
                            datePickerModeAndroid={'spinner'}
                            timePickerModeAndroid={'spinner'}
                        />
                        <Text style={styles.errorText}>{errorMsg}</Text>
                        <View style={{ marginTop: ScreenHeight * 0.02 }}>
                            {buttonDisabled ?
                                <_DisabledButton
                                    textButton={'Save'} /> :
                                <_Button
                                    textButton={'SAVE '}
                                    onPress={() => this.saveInfo()} />}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'right',
                    })}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                textStyle={styles.DialogOK_CancelButton}
                                text="CANCEL"
                                onPress={() => this.CancelDialog()}
                            />
                            <DialogButton
                                textStyle={styles.DialogOK_CancelButton}
                                text="OK"
                                onPress={() => this.savePayment()}
                            />
                        </DialogFooter>
                    }
                    dialogTitle={
                        <DialogTitle
                            textStyle={styles.DialogTitleStyle}
                            title="Payment"
                            style={{ backgroundColor: buttonBGcolor, color: 'white' }} />}>
                    <DialogContent
                        style={{ width: 300 }}>
                        <Text style={styles.DialogText}>Do you want to Save? Action can`t Undo</Text>
                    </DialogContent>
                </Dialog>
            </Container>

        )
    }
}
