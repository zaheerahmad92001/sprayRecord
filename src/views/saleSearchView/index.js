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
import { convertDateToString } from '../../RandFunction';
import styles from '../saleSearchView/styles';
import SaleModal from '../../../Utils/modal/Sale';

const sale_history =
    [
        { Id: 1, name: 'Tryezophas', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'ml' },
        { Id: 2, name: 'Lemda', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'gram' },
        { Id: 3, name: 'Karatay', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'kg' },
        { Id: 4, name: 'Danydar', open: '1000', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'gram' },
        { Id: 5, name: 'PhasPhoras', open: '200', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'ml' },
        { Id: 6, name: 'Jugni', open: '200', sale: '400', close: '600', date: '20-Aug-2019', weight: '200', unit: 'kg' },
    ]
export default class saleSearchView extends Component {

    constructor(props) {
        super(props)
        this.param = this.props.navigation.getParam('item');
        this.state = {
            Stock: sale_history, input: '', matchedValue: sale_history,
            isDatePickerVisible: false, date: '', report: 0,
            matchedproduct: sale_history, daily:0,weekly:0,monthly:0
           
        };
    }
componentDidMount(){
    const value = this.param.filter;
    let page= 1;
    const{daily,weekly,monthly}= this.state;
    if(value===0){
        this.setState({daily:1})
    }else if(value===1){
        this.setState({weekly:1})
    }else if(value===2){
        this.setState({monthly:1})
    }
//    SaleModal.saleFilter(page,daily,weekly,monthly).then(
//        (res)=>{
//            if(res.success){
//                alert('success zaheer')
//            }else{
//                alert('server error')
//                console.log('server error',res)
//            }
//        },(error)=>{
//            alert('request fail')
//            console.log('request fail',error)
//        }) 
}

    goBack = () => {
        this.props.navigation.pop();
    }
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
        
        let { input, date, Stock, Sale  } = this.state;
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
                            listStyle={{borderWidth:0,}}
                            data={matchedproduct.length >= 1 && comp(input, matchedproduct[0].name) ? [] : matchedproduct}
                            defaultValue={input}
                            onChangeText={(text) => this.setState({ input: text })}
                            placeholder="Search "
                            placeholderTextColor={TextColor}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ input: item.name })}>
                                    <Text style={styles.itemText}>{item.name}</Text>
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
                                data={Stock}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderSaleHistory}
                                renderScrollComponent={this.renderScroll}
                                numColumns={1}
                                horizontal={false}
                            /> :
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
