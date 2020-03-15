import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, KeyboardAvoidingView, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextColor, buttonBGcolor, MenuTextColor } from '../../Constants/colors';
import { Icon, Drawer, Container } from 'native-base';
import _Header from '../../Components/Common/AppHeader';
import Sidebar from '../../Components/sidebar/menu';
import { TabView, SceneMap } from 'react-native-tab-view';
import Autocomplete from 'react-native-autocomplete-input';
import DateTimePicker from "react-native-modal-datetime-picker";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { AppBarLayout, CoordinatorLayout, CollapsingToolbarLayout, CollapsingParallax } from 'react-native-collapsing-toolbar';
import NestedScrollView from 'react-native-nested-scroll-view';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import _SaleHistory from '../../Components/Common/saleHistory';
import { convertDateToString } from '../../RandFunction';
import styles from '../saleHistory/styles';
import moment from 'moment';
import SaleModal from '../../../Utils/modal/Sale';
let pageNo = 1;
var radio_props = [
    { label: 'Daily', value: 0 },
    { label: 'Weekly', value: 1 },
    { label: 'Monthly', value: 2 }
];

export default class SaleHistory extends Component {
    captureAppBarRef = (ref) => {
        this.appBar = ref
    }
    renderScroll(props) {
        return (
            <NestedScrollView {...props} />
        )
    }
    constructor(props) {
        super(props)
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            Stock: [], moreProduct: [], input: '', isDatePicker: false,
            isDatePickerVisible: false, FromDate: '', fDate: '', ToDate: '', tDate: '',
            report: '', duration: false,datePicked:false, daily: 0, monthly: 0, weekly: 0,
             loading: true,pagination:'',
        };
    }
    componentDidMount() {
        const { report, daily, monthly, weekly, tDate, fDate } = this.state;
        SaleModal.saleFilter(pageNo).then(
            (res) => {
                if (res.success) {
                    this.setState({
                        Stock: res.data.collection,
                        loading: false,
                        pagination:res.data.pagination,
                    })
                   //  console.log('success pagination', this.state.pagination.last_page)
                } else {
                    alert('something went wrong')
                    console.log('something went wrong', res)
                }
            }, (error) => {
                alert('Network error')
                console.log('network error', error)
            }
        )
    }
    openDrawer = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)
    };
    setTodate = () => {
        const { daily, weekly, monthly, fDate, } = this.state;
        if (daily === 1) {
            let aa = new Date(fDate);
            let date = convertDateToString(aa)
            this.setState({ ToDate: date, tDate: fDate });
        } else if (weekly === 1) {
            let aa = new Date(fDate)
            let DateTime = aa.setDate(aa.getDate() + 6)
            let date = convertDateToString(new Date(DateTime))
            this.setState({ ToDate: date, tDate: DateTime });
        } else if (monthly === 1) {
            let aa = new Date(fDate)
            let DateTime = aa.setMonth(aa.getMonth() + 1)
            let date = convertDateToString(new Date(DateTime))
            this.setState({ ToDate: date, tDate: DateTime });
        }
    }

    closeDrawer = () => { this.drawer && this.drawer._root && this.drawer._root.close(); };

    FromDateTimePicker = () => {
        const {duration} = this.state;
        if(duration){
        this.setState({ isDateTimePickerVisible: true });
        }else{
            alert('Please select a duration from Daily ,weekly ,monthly ')
        }
    };
    FromDatePicked = (date) => {
        let DateTime = new Date(date).getTime()
        let aa = new Date(DateTime);
        date = convertDateToString(aa)
        this.setState({ FromDate: date, fDate: DateTime ,datePicked:true  });
        this.FromhideDateTimePicker();
        this.setTodate()
    };
    FromhideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    callAlert=()=>{
        alert('Please select duration and Date for search')
    }
    // ToDateTimePicker = () => {
    //     this.setState({ isDateTimePicker: true });
    // };
    // ToDatePicked = (date) => {
    //     let DateTime = new Date(date).getTime()
    //     let aa = new Date(DateTime);
    //     date = convertDateToString(aa)
    //     this.setState({ ToDate: date, tDate: DateTime });
    //     this.TohideDateTimePicker();
    // };
    // TohideDateTimePicker = () => {
    //     this.setState({ isDateTimePicker: false });
    // };
    setValues = (value) => {
        this.setState({ duration: true })
        if (value === 0) {
            this.setState({ daily: 1, weekly: 0, monthly: 0 })
        } else if (value === 1) {
            this.setState({ weekly: 1, daily: 0, monthly: 0 })
        } else if (value === 2) {
            this.setState({ monthly: 1, daily: 0, weekly: 0 })
        }
    }
    renderSaleHistory = ({ item }) => {
        return (
            <_SaleHistory
                item={item}
                key={item.Id}
                navigation={this.props.navigation} />
                )
            };
    onEndReached = ({ distanceFromEnd }) => {
        const scope = this;
        const { weekly, daily, monthly ,pagination } = this.state;
        pageNo = pageNo + 1;
        if (!this.onEndReachedCalledDuringMomentum) {
            if(pageNo <= pagination.last_page){
                ToastAndroid.show('More data available',ToastAndroid.SHORT)
//////////////////////////////////////////////////////////////////////////////////////////////////
            SaleModal.saleFilter(pageNo, daily, weekly, monthly).then(
                (res) => {
                    if (res.success) {
                        scope.setState({ moreProduct: res.data.collection })
                        scope.setState({ Stock: scope.state.Stock.concat(scope.state.moreProduct) })
                    } else {
                        alert('Something went wrong')
                        console.log('something went wrong', res)
                    }
                }, (error) => {
                    alert('Network error')
                    console.log('network error', error)
                })
//////////////////////////////////////////////////////////////////////////////////////////////////     
             }else{
                ToastAndroid.show('No more data',ToastAndroid.LONG)
             }
          this.onEndReachedCalledDuringMomentum = true;
        }
    }
    render() {

        console.log('tDate', this.state.tDate, 'Fdate', this.state.fDate)
        let { input, FromDate, fDate, ToDate, tDate, Stock, Sale, report, loading, daily, weekly, monthly,datePicked } = this.state;
        return (
            <Drawer ref={(ref) => this.drawer = ref}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                negotiatePan={true}
                tapToClose={true}>
                <Container style={{ flex: 1, marginBottom: 10 }}>
                    {loading ?
                        <View style={{ flex: 1, }}>

                            <_Header
                                ImageLeftIcon={'menu'}
                                HeadingText={'Sale History'} />
                            <View style={styles.radiobutton}>
                                <RadioForm
                                    style={{ justifyContent: 'space-around', marginHorizontal: 8, }}
                                    radio_props={radio_props}
                                    initial={-1}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    labelColor={'red'}
                                    buttonColor={buttonBGcolor}
                                    selectedButtonColor={buttonBGcolor}
                                    onPress={(value) => this.setState({ report: value })}
                                    buttonInnerColor={'red'}
                                    buttonOuterColor={'black'}
                                    animation={true}
                                    buttonWrapStyle={{ marginLeft: 10 }}
                                    buttonSize={10}
                                    labelStyle={{ fontSize: RFValue(13), color: 'black', paddingRight: 20 }}
                                />
                            </View>
                            <View style={styles.datePickerView}>
                                <TouchableOpacity style={styles.selectDateStyle}>
                                    <Text style={styles.startDInput}>
                                        {!FromDate || !FromDate.length ? 'From' : FromDate}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.Toview}>
                                    <Text style={styles.to}>-</Text>
                                </View>
                                <TouchableOpacity style={[styles.selectDateStyle, { justifyContent: 'center', alignItems: 'center' }]}>
                                    <Text style={styles.startDInput}>
                                        {!ToDate || !ToDate.length ? 'To' : ToDate}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.SearchIconView}>
                                    <Icon
                                        name={'ios-search'}
                                        type={'Ionicons'}
                                        style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                                    />
                                </TouchableOpacity>
                            </View></View> : null
                    }
                    {loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                color={MenuTextColor}
                                size={'large'}
                            /></View> :

                        <CoordinatorLayout
                            style={{ flex: 1 }}>
                            <AppBarLayout
                                ref={this.captureAppBarRef}
                                style={styles.appbar}>
                                <CollapsingToolbarLayout
                                    // title='Collapsing Toolbar'
                                    contentScrimColor={buttonBGcolor}
                                    // expandedTitleColor='red'
                                    // collapsedTitleTextColor='green'
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
                                        <View collapsable={false} style={{ height: ScreenHeight * 0.26, justifyContent: 'center' }}>
                                            <_Header
                                                ImageLeftIcon={'menu'}
                                                LeftPress={() => this.openDrawer()}
                                                HeadingText={'Sale History'} />
                                            <View style={styles.radiobutton}>
                                                <RadioForm
                                                    style={{ justifyContent: 'space-around', marginHorizontal: 8, }}
                                                    radio_props={radio_props}
                                                    initial={-1}
                                                    // onPress={(value) => this.setState({ report: value })}
                                                    onPress={(value) => this.setValues(value)}
                                                    formHorizontal={true}
                                                    labelHorizontal={true}
                                                    labelColor={'red'}
                                                    buttonColor={buttonBGcolor}
                                                    selectedButtonColor={buttonBGcolor}
                                                    buttonInnerColor={'red'}
                                                    buttonOuterColor={'black'}
                                                    animation={true}
                                                    buttonWrapStyle={{ marginLeft: 10 }}
                                                    buttonSize={10}
                                                    labelStyle={{ fontSize: RFValue(13), color: 'black', paddingRight: 20 }}
                                                />
                                            </View>
                                            <View style={styles.datePickerView}>
                                                <TouchableOpacity style={styles.selectDateStyle}
                                                    onPress={() => this.FromDateTimePicker()}>
                                                    <Text style={styles.startDInput}>
                                                        {!FromDate || !FromDate.length ? 'From' : FromDate}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={styles.Toview}>
                                                    <Text style={styles.to}>-</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.selectDateStyle, { justifyContent: 'center', alignItems: 'center' }]}
                                                // onPress={() => this.ToDateTimePicker()}
                                                >
                                                    <Text style={styles.startDInput}>
                                                        {!ToDate || !ToDate.length ? 'To' : ToDate}
                                                    </Text>
                                                </TouchableOpacity>
                                                {datePicked ?
                                                <TouchableOpacity style={styles.SearchIconView}
                                                    onPress={() => this.props.navigation.navigate('saleSearcView', {
                                                        item: {
                                                            daily: daily,
                                                            weekly: weekly,
                                                            monthly: monthly,
                                                            fromDate: fDate,
                                                            toDate: tDate,
                                                            Stock: Stock
                                                        }
                                                    })
                                                    }>
                                                    <Icon
                                                        name={'ios-search'}
                                                        type={'Ionicons'}
                                                        style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                                                    />
                                                </TouchableOpacity> :
                                                <TouchableOpacity style={styles.SearchIconView}
                                                    onPress={()=>this.callAlert()}>
                                                    <Icon
                                                        name={'ios-search'}
                                                        type={'Ionicons'}
                                                        style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                                                    />
                                                </TouchableOpacity> }
                                            </View>
                                        </View>
                                    </CollapsingParallax>
                                </CollapsingToolbarLayout>
                            </AppBarLayout>

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={Stock}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderSaleHistory}
                                renderScrollComponent={this.renderScroll}
                                numColumns={1}
                                horizontal={false}
                                onEndReached={this.onEndReached.bind(this)}
                                onEndReachedThreshold={0.5}
                                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            />
                        </CoordinatorLayout>
                    }
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.FromDatePicked}
                        onCancel={this.FromDateTimePicker}
                        is24Hour={false}
                        mode={'date'}
                        datePickerModeAndroid={'spinner'}
                        timePickerModeAndroid={'spinner'}
                    />
 {/* <DateTimePicker
isVisible={this.state.isDateTimePicker}
onConfirm={this.ToDatePicked}
onCancel={this.ToDateTimePicker}
is24Hour={false}
mode={'date'}
datePickerModeAndroid={'spinner'}
timePickerModeAndroid={'spinner'}
/> */}
                </Container>
            </Drawer>

        )
    }
}
