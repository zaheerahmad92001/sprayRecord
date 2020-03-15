
import React, { Component } from 'react';
import {
    View, Text, Dimensions, FlatList, ActivityIndicator, ToastAndroid,
} from 'react-native';
import { Drawer, Content, Container, Icon } from 'native-base';
import _Header from '../../../Components/Common/AppHeader';
import DateTimePicker from "react-native-modal-datetime-picker";
import { TouchableOpacity, } from 'react-native-gesture-handler';
import PaymentList from '../../../Components/Common/_paymentHistory';
import Modalize from 'react-native-modalize';
import BlinkingClass from '../BlinkingText';
import _BottomSheet from '../../../Components/Common/BottomSheet'
import { RFValue } from 'react-native-responsive-fontsize';
import styles from '../paymentHistory/styles';
import { AppBarLayout, CoordinatorLayout, CollapsingToolbarLayout, CollapsingParallax } from 'react-native-collapsing-toolbar';
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import NestedScrollView from 'react-native-nested-scroll-view';
import { buttonBGcolor, MenuTextColor } from '../../../Constants/colors';
import { convertDateToString } from '../../../RandFunction'
import PaymentModal from '../../../../Utils/modal/Payment';
let pageNo = 0;
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class paymentHistory extends Component {
    // captureAppBarRef = (ref) => {
    //     this.appBar = ref
    // }
    // renderScroll(props) {
    //     return (
    //         <NestedScrollView {...props} />
    //     )
    // }
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.param = this.props.navigation.getParam('currentBalance')
        this.state = {
            paymentList: [], morePaymentList: [],
            date: '',loading:true,pagination:'',
            isDatePickerVisible: false,
        }
    }
    componentDidMount() {
        const scope = this;
        pageNo = 1;
        PaymentModal.PaymentListing(pageNo).then(
            (res) => {
                if (res.success) {
                    scope.setState({
                        paymentList: res.data.collection,
                        loading:false,
                        pagination:res.data.pagination
                    })
                    
                     console.log('pagination',this.state.pagination)
                } else {
                    alert('something went wrong')
                    console.log('something went wrong', res)
                }
            }, (error) => {
                alert('network error')
                console.log('network error', error)
            })
    }
    onEndReached = ({ distanceFromEnd }) => {
        const scope = this;
        const {pagination} = this.state;
        pageNo = pageNo + 1;
        if (!this.onEndReachedCalledDuringMomentum) {
           if(pageNo <= pagination.last_page ){
            ToastAndroid.show('More data available',ToastAndroid.SHORT)
   //////////////////////////////////////////////////////////////////////////////////////////         
            PaymentModal.PaymentListing(pageNo).then(
                (res) => {
                    if (res.success) {
                        scope.setState({
                            morePaymentList: res.data.collection
                        })
                        scope.setState({ paymentList: scope.state.paymentList.concat(scope.state.morePaymentList) })
                    } else {
                        alert('something went wrong')
                        console.log('something went wrong', res)
                    }
                }, (error) => {
                    alert('network error')
                    console.log('network error', error)
                }) 
    //////////////////////////////////////////////////////////////////////////////////////////        
        }else{
            ToastAndroid.show('No more data ',ToastAndroid.LONG)
            }
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
    goBack = () => {
        this.props.navigation.pop();
    }

    showDateTimePicker = (from) => {
        this.setState({ isDateTimePickerVisible: true });
    };

    handleDatePicked = date => {
        date = convertDateToString(date)
        this.setState({ date });
        this.hideDateTimePicker();
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    renderPayments = ({ item }) => {
        return (
            <PaymentList
                item={item}
                key={item.Id}
                navigation={this.props.navigation} />
        )
    }
    render() {
       // console.log('param', this.param)
        const { date, paymentList,loading } = this.state;
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Payment History'} />
                <View style={styles.SearchView}>
                    <TouchableOpacity style={styles.selectDateStyle}
                        onPress={() => this.showDateTimePicker()}>
                        <Text style={styles.startDInput}>
                            {!date || !date.length ? 'Select date' : date}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SearchIconView}
                        onPress={() => this.props.navigation.navigate('SearchView', {
                            item: {
                                date: date,
                                paymentList: paymentList
                            }
                        })}>
                        <Icon
                            name={'ios-search'}
                            type={'Ionicons'}
                            style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: RFValue(3) }}>
                    <BlinkingClass text={this.param} />
                </View>
                {loading ? 
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                 <ActivityIndicator
                 color={MenuTextColor}
                 size={'large'}
                 />
                </View>:
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ marginHorizontal: RFValue(5), }}
                        showsVerticalScrollIndicator={false}
                        data={paymentList}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderPayments}
                        renderScrollComponent={this.renderScroll}
                        numColumns={1}
                        horizontal={false}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={0.5}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                    />
                </View>
                }

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    is24Hour={false}
                    mode={'date'}
                    datePickerModeAndroid={'spinner'}
                    timePickerModeAndroid={'spinner'}
                />
                {/* <CoordinatorLayout
                    style={{ flex: 1 }}>
                    <AppBarLayout
                        ref={this.captureAppBarRef}
                        style={styles.appbar}>
                        <CollapsingToolbarLayout
                             title='Collapsing Toolbar'
                            contentScrimColor={buttonBGcolor}
                             expandedTitleColor='red'
                             collapsedTitleTextColor='green'
                            expandedTitleGravity='center'
                            scrimVisibleHeightTrigger={30}
                            scrimAnimationDuration={1000}
                            expandedTitleMarginStart={0}
                            expandedTitleMarginTop={0}
                            expandedTitleMarginBottom={0}
                            scrimVisibleHeightTrigger={50}
                            scrollFlags={
                                AppBarLayout.SCROLL_FLAG_SCROLL
                                | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED
                                | AppBarLayout.SCROLL_FLAG_SNAP
                            }>
                            <CollapsingParallax parallaxMultiplier={0.6}>
                                <View collapsable={false} style={{ height: ScreenHeight * 0.3, justifyContent: 'center' }}>
                                    <_Header
                                        ImageLeftIcon={'keyboard-backspace'}
                                        LeftPress={() => this.goBack()}
                                        HeadingText={'Payment History'} /> 
                                     <View style={styles.SearchView}>
                                        <TouchableOpacity style={styles.selectDateStyle}
                                            onPress={() => this.showDateTimePicker()}>
                                            <Text style={styles.startDInput}>
                                                {!date || !date.length ? 'Select date' : date}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.SearchIconView}
                                            onPress={() => this.props.navigation.navigate('SearchView',{
                                                item:{
                                                    date:date,
                                                    paymentList:paymentList
                                                }
                                            })}>
                                            <Icon
                                                name={'ios-search'}
                                                type={'Ionicons'}
                                                style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: RFValue(10) }}>
                                        <BlinkingClass text={this.param} />
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
                            onEndReached={this.onEndReached.bind(this)}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        />
                    </View>
                </CoordinatorLayout> */}
               

            </Container>
        );
    }
}

