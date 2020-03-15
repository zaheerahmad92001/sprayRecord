import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextColor, buttonBGcolor } from '../../Constants/colors';
import { Icon, Drawer, Container } from 'native-base';
import _Header from '../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import { AppBarLayout, CoordinatorLayout, CollapsingToolbarLayout, CollapsingParallax } from 'react-native-collapsing-toolbar';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import _SaleHistory from '../../Components/Common/saleHistory';
import { convertDateToString, getDateInUTCWithoutHours } from '../../RandFunction';
import styles from '../saleSearchView/styles';
import SaleModal from '../../../Utils/modal/Sale';
let pageNo = 1;
export default class saleSearchView extends Component {

    constructor(props) {
        super(props)
        this.param = this.props.navigation.getParam('item');
        this.state = {
            soldItem: '', input: '', matchedValue: '',
            isDatePickerVisible: false, date: '', report: 0,
            matchedproduct: '', daily: 0, weekly: 0, monthly: 0, loading: true,
        };
    }
    componentDidMount() {
        const { daily, weekly, monthly, fromDate, toDate, Stock } = this.param
        let _startDate = convertDateToString(new Date(fromDate))
        let _endDate = convertDateToString(new Date(toDate))
        let searchResult = []
        this.param.Stock.map((value) => {
            let saleDate = value.entry_date * 1000;
            saleDate = convertDateToString(new Date(saleDate))
            if (daily === 1 && saleDate === _startDate) {
                searchResult.push(value)
            } else if (weekly === 1 && saleDate >= _startDate && saleDate <= _endDate) {
                searchResult.push(value)
            } else if (monthly === 1 && saleDate >= _startDate && saleDate <= _endDate)
                searchResult.push(value)
        })
        this.setState({ soldItem: searchResult })
        searchResult = []
    }

    goBack = () => {
        this.props.navigation.pop();
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }
        const { soldItem } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return soldItem.filter((Stock) => Stock.product.title.search(regex) >= 0);
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

        let { input, date, soldItem, Sale } = this.state;
        // console.log('sold out item ',soldItem)
        // console.log('this props',this.props)
        const matchedproduct = this.findProduct(input);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Search Results'} />
                <View style={styles.SearchView}>
                    <Autocomplete
                        style={styles.AutocompleteStyle}
                        autoCapitalize="none"
                        hideResults={true}
                        autoCorrect={false}
                        autoFocus={false}
                        inputContainerStyle={{ borderWidth: 0, }}
                        listStyle={{ borderWidth: 0, }}
                        // data={matchedproduct.length >= 1 && comp(input, matchedproduct[0].name) ? [] : matchedproduct}
                        defaultValue={input}
                        onChangeText={(text) => this.setState({ input: text })}
                        placeholder="Search "
                        placeholderTextColor={TextColor}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.setState({ input: item.title })}>
                                <Text style={styles.itemText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}>
                    </Autocomplete>
                    <Icon
                        style={styles.IconStyle}
                        name={'ios-search'}
                        type={'Ionicons'}
                    />
                </View>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={'height'}>
                    <View style={{ flex: 1, marginBottom: 10 }}>
                        {input === '' ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={soldItem}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderSaleHistory}
                                renderScrollComponent={this.renderScroll}
                                numColumns={1}
                                horizontal={false}
                            />:
                            matchedproduct.length >= 1 ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={matchedproduct}
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
                </KeyboardAvoidingView>
            </Container>

        )
    }
}
