import React, { Component } from 'react';
import {
    View, Text, Dimensions,
    Keyboard, StyleSheet, ToastAndroid
} from 'react-native';
import { Drawer, Content } from 'native-base';
import _Header from '../../../Components/Common/AppHeader';
import Sidebar from '../../../Components/sidebar/menu';
import Text_Input from '../../../Components/Common/inputField';
import _Button from '../../../Components/Common/_Button';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import { Container } from 'native-base';
import BlinkingClass from '../BlinkingText';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from "react-native-modal-datetime-picker";
import { CountColor, buttonBGcolor } from '../../../Constants/colors';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from '../payment/styles';
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import { ValidateDecimalNumber, convertDateToString } from '../../../RandFunction';
import PaymentModal from '../../../../Utils/modal/Payment';
export default class payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: '', errorMsg: '', prNo: '',
            date: '', paymentDate: '', visible: false,
            isDatePickerVisible: false,currentBalance:'',
        }
    }
    componentDidMount(){
        PaymentModal.Balance().then(
            (res)=>{
                if(res.success){
                   this.setState({currentBalance:res.data.collection.balance})
                }else{
                  alert('server error')
                  console.log('server error',res)
                }
            },(error)=>{
              alert('request fail')
              console.log('server error',error)
            }
        )
    }
    updateCurrentBalance=()=>{
        PaymentModal.Balance().then(
            (res)=>{
                if(res.success){
                   this.setState({currentBalance:res.data.collection.balance})
                }else{
                  alert('server error')
                  console.log('server error',res)
                }
            },(error)=>{
              alert('request fail')
              console.log('server error',error)
            }
        )
    }
    openDrawer = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)
    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();
    };
    keyboardDismiss = () => {
        Keyboard.dismiss()
    }
    navigation = (routeName) => {
        const {currentBalance}= this.state;
        this.props.navigation.navigate(routeName,{currentBalance});
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    handleDatePicked = date => {
        //let dateText = this.convertDateTimeToString(date)
        var DateTime = new Date(date).getTime()
        let aa = new Date(DateTime)
        date = convertDateToString(aa)
        this.setState({ date, paymentDate: DateTime });
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

    savePayment = () => {
        const {paymentDate,price,prNo, } = this.state;
        this.CancelDialog();
/////////////////////////////////////////////////////////////////////////////////////////
PaymentModal.AddPayment(paymentDate,price,prNo).then(
    (res)=>{
    if(res.success){
       this.setState({
           paymentDate:'',date:'',
           price:'',prNo:''
       })
       this.updateCurrentBalance()
       ToastAndroid.show('Payment Add',ToastAndroid.SHORT)
    }else{
        alert('server error')
        console.log('server error',res)
    }
    },(error)=>{
     alert('fail')
     console.log('fail',error)
    }
)
/////////////////////////////////////////////////////////////////////////////////////////
    }

    saveInfo = () => {
        const { price, prNo } = this.state;
        if (ValidateDecimalNumber(price)) {
            if (prNo && prNo.length) {
                this.setState({ errorMsg: '' })
                this.CallDialogBox()
            } else {
                this.setState({ errorMsg: 'Enter PR No ' })
            }
        } else {
            this.setState({ errorMsg: 'Enter Payment in digits ' })
        }
    };

    
    render() {
        const { date, price, isDatePickerVisible, errorMsg,currentBalance } = this.state;
        return (
            <Drawer ref={(ref) => this.drawer = ref}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                negotiatePan={true}
                tapToClose={true}
               //side='right'
            >
                <Container>

                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => this.openDrawer()}
                        HeadingText={'Payment'} />
                    {/* <TouchableWithoutFeedback onPress={() => this.keyboardDismiss()}> */}
                    <Content showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: RFValue(10) }}>
                            <BlinkingClass text={currentBalance} />
                        </View>
                        <View style={{marginTop:RFValue(15)}}>
                            <Text style={{ textAlign: 'center', color: CountColor }}>This amount will be added into your current balance</Text>
                        </View>
                        <View style={{marginHorizontal:10}}>
                            <Text style={styles.Heading}>Payment</Text>
                            <View style={[styles.Input, { flexDirection: 'row' }]}>
                                <Text style={styles.RsText} >Rs.</Text>
                                <Text_Input
                                    styles={{ flex: 1, borderLeftWidth: 0, borderTopLeftRadius: 0, paddingLeft: 3 }}
                                    onChangeText={(value) => this.setState({ price: value, errorMsg: '' })}
                                    value={price}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                            <Text style={[styles.Heading, { marginTop: 0 }]}>PR No</Text>
                            <View style={styles.Input}>
                                <Text_Input
                                    placeholder={'PR NO'}
                                    onChangeText={(value) => this.setState({ prNo: value, errorMsg: '' })}
                                    value={this.state.prNo}
                                    keyboardType={'default'}
                                />
                            </View>
                            <Text style={[styles.Heading, { marginBottom: 10, marginTop: 0 }]}>Select Date</Text>
                            <TouchableOpacity style={styles.startDContainer}
                                onPress={() => this.showDateTimePicker()}>
                                <View>
                                    <Text style={styles.startDInput}>
                                        {/* {this.state.date.toString().slice(3, 16)} */}
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
                            <Text style={styles.errorText}>{errorMsg}</Text>
                            <View style={{ marginTop: ScreenHeight * 0.02 }}>
                                <_Button
                                    textButton={'SAVE '}
                                    onPress={() => this.saveInfo()}>
                                </_Button>
                            </View>
                            <View style={styles.paymentTouch}>
                                <TouchableOpacity
                                    onPress={() => this.navigation('paymentHistory')}>
                                    <Text style={styles.textStyle}>Payment detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </Content>
                    {/* </TouchableWithoutFeedback> */}
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
            </Drawer>
        )
    }
}
