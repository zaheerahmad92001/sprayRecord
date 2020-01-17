
import React, { Component } from 'react';
import {
    View, Text, Dimensions,
    Keyboard, StyleSheet,
    FlatList,
} from 'react-native';
import { Drawer, Content, Container, Icon } from 'native-base';

import _Header from '../../../Components/Common/AppHeader';
import DateTimePicker from "react-native-modal-datetime-picker";

import { TouchableOpacity,} from 'react-native-gesture-handler';
import PaymentList from '../../../Components/Common/_paymentHistory';
import Modalize from 'react-native-modalize';
import BlinkingClass from '../BlinkingText';
import _BottomSheet from '../../../Components/Common/BottomSheet'
import { RFValue } from 'react-native-responsive-fontsize';
import styles from '../paymentHistory/styles';
import { AppBarLayout, CoordinatorLayout, CollapsingToolbarLayout, CollapsingParallax,
} from 'react-native-collapsing-toolbar';
import Dialog,
{   DialogTitle,
    DialogContent,
    SlideAnimation,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import NestedScrollView from 'react-native-nested-scroll-view';
import { buttonBGcolor } from '../../../Constants/colors';

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
const paymentList =
    [
        { Id: 1, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020',type:'orderPrice',ordeNo:1,batch_no:'Qskxx23xxxxkmsjdfk'},
        { Id: 2, currentbalance: 40000, price: '2000', total: '42000', date: 'jan 21 2020',type:'orderPrice',ordeNo:1,batch_no:'Wskxx23xxxxkjkalfd'},
        { Id: 3, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020',type:'payment'},
        { Id: 4, currentbalance: 20000, price: '40000', total: '42000', date: 'jan 21 2020',type:'orderPrice',ordeNo:1,batch_no:'Dskkx23xxxxkkjafld'},
        { Id: 5, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020',type:'payment'},
        { Id: 6, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020',type:'payment'},
        { Id: 7, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020',type:'orderPrice',ordeNo:1,batch_no:'Bskmmx23xxxxkjakldf'},
        { Id: 8, currentbalance: 80000, price: '20000', total: '100000', date: 'jan 21 2020',type:'payment'},
        { Id: 9, currentbalance: 20000, price: '42000', total: '82000', date: 'jan 21 2020',type:'payment'},
        { Id: 10, currentbalance: 120000,price: '2000', total: '122000', date: 'jan 21 2020',type:'orederPrice',ordeNo:1,batch_no:'Mskxx23xxxxkjkalf'},
        { Id: 11, currentbalance: 120000,price: '2000', total: '122000', date: 'jan 21 2020',type:'payment'},
    ]
const HEADER_HEIGHT = 200

export default class paymentHistory extends Component {
    bottomSheet = React.createRef();
    captureAppBarRef = (ref) => {
        this.appBar = ref
    }
    renderScroll(props) {
        return (
            <NestedScrollView {...props} />
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            payment: '',
            date: new Date(), visible: false,
            isDatePickerVisible: false,
            showBottomSheet: false,
            type: '',
            paymentDetail:'',
            paymentId:'',
            // payments:paymentList,
        }
    }
    goBack = () => {
        this.props.navigation.pop();
    }
    _navigateTo = (routeName) => {
        const {paymentId,paymentDetail}= this.state;
        this.props.navigation.navigate(routeName,{paymentDetail})
        this.onCloseSheet();
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
    callBottomSheet = (item) => {
        const scope = this;
        scope.setState({
            type:item.type,
            paymentDetail:item,
            paymentId:item.Id
        })
        scope.onOpenSheet();
    }
    onOpenSheet = () => {
        const bottomSheet = this.bottomSheet.current;
        if (bottomSheet) {
            this.setState({ showBottomSheet: true })
            bottomSheet.open();
        }
    };
    onCloseSheet = () => {
        this.setState({ showBottomSheet: false })
        if (this.bottomSheet.current) {
            this.bottomSheet.current.close();
        }
    };
    CallDialogBox = () => {
        this.setState({ visible: true })
    }
    CancelDialog = () => {
        this.setState({ visible: false });
    }
    Delete=()=>{
        this.setState({ visible: false });
        this.onCloseSheet();
        alert(this.state.paymentId+'deleted')
    }
    renderPayments = ({ item }) => {
        return (
            <PaymentList
                item={item}
                key={item.Id}
                callBottomSheet={() => this.callBottomSheet(item)}
                navigation={this.props.navigation} />
        )
    }
    renderBottomSheet = () => {
     const {type} = this.state;
        return (
            <_BottomSheet
            _navigateTo={()=>this._navigateTo( 'EditPayment')}
            CallDialogBox={()=>this.CallDialogBox()}
            CancelSheet={()=>this.onCloseSheet()}
            /> )}
    render() {
        const { date } = this.state;
        return (
            <Container>
                <CoordinatorLayout
                    style={{ flex: 1 }}
                >
                    <AppBarLayout
                        ref={this.captureAppBarRef}
                        style={styles.appbar}>
                        <CollapsingToolbarLayout
                            title='Collapsing Toolbar'
                            contentScrimColor='green'
                            expandedTitleColor='blue'
                            collapsedTitleTextColor='green'
                            expandedTitleGravity='BOTTOM'
                            scrimVisibleHeightTrigger={500}
                            scrimAnimationDuration={400}
                            expandedTitleMarginStart={22}
                            expandedTitleMarginTop={50}
                            expandedTitleMarginBottom={22}
                            scrimVisibleHeightTrigger={200}
                            scrollFlags={
                                AppBarLayout.SCROLL_FLAG_SCROLL
                                | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED}>
                            <CollapsingParallax parallaxMultiplier={0.6}>
                                <View collapsable={false} style={{ height: HEADER_HEIGHT }}>
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
                                        <TouchableOpacity style={styles.SearchIconView}
                                          onPress={()=>this.props.navigation.navigate('SearchView')}>
                                            <Icon
                                                name={'ios-search'}
                                                type={'Ionicons'}
                                                style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: RFValue(10) }}>
                                        <BlinkingClass text={'300000000'} />
                                    </View>
                                </View>
                            </CollapsingParallax>
                        </CollapsingToolbarLayout>
                    </AppBarLayout>

                    <View style={styles.content}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={paymentList}
                            keyExtractor={(item) => item.Id}
                            renderItem={this.renderPayments}
                            renderScrollComponent={this.renderScroll}
                            numColumns={1}
                            horizontal={false}
                        />
                    </View>
                </CoordinatorLayout>
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
                                onPress={() => this.CancelDialog()}/>
                            <DialogButton
                                textStyle={styles.DialogOK_CancelButton}
                                text="OK"
                                onPress={() => this.Delete()}/>
                        </DialogFooter>
                    }
                    dialogTitle={
                        <DialogTitle
                            textStyle={styles.DialogTitleStyle}
                            title="Payment"
                            style={{ backgroundColor: buttonBGcolor, color: 'white' }} />}>
                    <DialogContent
                        style={{ width: 300 }}>
                        <Text style={styles.DialogText}>Do you want to Delete? Action can`t Undo</Text>
                    </DialogContent>
                </Dialog>
                <Modalize
                    adjustToContentHeight
                    ref={this.bottomSheet}
                    onClosed={this.onClosed} >
                    {this.renderBottomSheet()}
                </Modalize>
            </Container>
        );
    }
}

