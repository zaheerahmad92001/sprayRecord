import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextColor, buttonBGcolor } from '../../Constants/colors';
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
var radio_props = [
    { label: 'Daily', value: 0 },
    { label: 'Weekly', value: 1 },
    { label: 'Monthly', value: 2 }
];
const sale_history =
    [
        { Id: 1, name: 'Tryezophas', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'ml' },
        { Id: 2, name: 'Lemda', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'gram' },
        { Id: 3, name: 'Karatay', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'kg' },
        { Id: 4, name: 'Danydar', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'gram' },
        { Id: 5, name: 'PhasPhoras', open: '200', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'ml' },
        { Id: 6, name: 'Jugni', open: '200', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'kg' },
    ]
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
        this.state = {
            Stock: sale_history, input: '', matchedValue: sale_history,
            isDatePickerVisible: false, date: '', report: 0, index: 0,
            routes: [
                { key: 'daily', title: 'Daily' },
                { key: 'weekly', title: 'Weekly' },
                { key: 'monthly', title: 'Monthly' },
            ],
        };
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
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    handleDatePicked = (date) => {
        date = convertDateToString(date)
        this.setState({ date });
        this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedValue } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedValue.filter((Stock) => Stock.name.search(regex) >= 0);
    }
    renderSaleHistory = ({ item }) => {
        return (
            <_SaleHistory
                item={item}
                key={item.Id}
                navigation={this.props.navigation} />
        )
    };
    render() {
        let { input, date, Stock, Sale } = this.state;
        const matchedValue = this.findProduct(input);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Drawer ref={(ref) => this.drawer = ref}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                negotiatePan={true}
                tapToClose={true}>
                    <Container style={{flex:1,marginBottom:10}}>
                <CoordinatorLayout
                    style={{ flex: 1}}>
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
                                <View collapsable={false} style={{ height: ScreenHeight * 0.29, justifyContent: 'center' }}>
                                    <_Header
                                        ImageLeftIcon={'menu'}
                                        LeftPress={() => this.openDrawer()}
                                        HeadingText={'Sale History'} />

                                    <View style={styles.radiobutton}>
                                        <RadioForm
                                            style={{ justifyContent: 'space-around', marginHorizontal: 8, }}
                                            radio_props={radio_props}
                                            initial={0}
                                            onPress={(value) => this.setState({ report: value })}
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
                                    {/* <View style={{ marginHorizontal: 5 }}> */}
                                    {/* <TouchableOpacity style={styles.startDContainer}
                                            onPress={() => this.showDateTimePicker()}>
                                            <Text style={styles.startDInput}>
                                                {/* {this.state.date.toString().slice(3, 16)} */}
                                    {/* {!date || !date.length ? 'Select date' : date} */}
                                    {/* </Text> */}
                                    {/* </TouchableOpacity> */} 
                                        {/* <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                            is24Hour={false}
                                            mode={'date'}
                                            datePickerModeAndroid={'spinner'}
                                            timePickerModeAndroid={'spinner'}
                                        /> */}
                                    {/* </View> */}

                                    <View style={styles.datePickerView}>
                                        <TouchableOpacity style={styles.selectDateStyle}
                                            onPress={() => this.showDateTimePicker()}>
                                            <Text style={styles.startDInput}>
                                                {/* {this.state.date.toString().slice(3, 16)} */}
                                                {!date || !date.length ? 'Select date' : date}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.SearchIconView}
                                            onPress={() => this.props.navigation.navigate('saleSearcView')}>
                                            <Icon
                                                name={'ios-search'}
                                                type={'Ionicons'}
                                                style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {/* <View style={styles.SearchView}>
                                        <Autocomplete
                                            style={styles.AutocompleteStyle}
                                            autoCapitalize="none"
                                            hideResults={true}
                                            autoCorrect={false}
                                            autoFocus={false}
                                            inputContainerStyle={{ borderWidth: 0, }}
                                            listStyle={{ borderWidth: 0, }}
                                            data={matchedValue.length >= 1 && comp(input, matchedValue[0].name) ? [] : matchedValue}
                                            defaultValue={input}
                                            onChangeText={(text) => this.setState({ input: text })}
                                            placeholder="Search "
                                            placeholderTextColor={TextColor}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => this.setState({ input: item.name })}>
                                                    <Text style={styles.itemText}>{item.name}</Text>
                                                </TouchaFleOpacity>
                                            )}>
                                        </Autocomplete>
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-search'}
                                            type={'Ionicons'} />
                                    </View> */}
                                </View>
                            </CollapsingParallax>
                        </CollapsingToolbarLayout>
                    </AppBarLayout>
                    {/* <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'height'}> */}
                    <View>
                        {input === '' ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={Stock}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderSaleHistory}
                                renderScrollComponent={this.renderScroll}
                                numColumns={1}
                                horizontal={false}
                            /> :
                            matchedValue.length >= 1 ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={matchedValue}
                                    keyExtractor={(item) => item.Id}
                                    renderItem={this.renderSaleHistory}
                                    renderScrollComponent={this.renderScroll}
                                    numColumns={1}
                                    horizontal={false}
                                /> :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.NotFound}>No Search Result</Text>
                                </View>

                        }

                    </View>

                    {/* </KeyboardAvoidingView> */}
                </CoordinatorLayout>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    is24Hour={false}
                    mode={'date'}
                    datePickerModeAndroid={'spinner'}
                    timePickerModeAndroid={'spinner'}
                />
                </Container>
            </Drawer>

        )
    }
}
