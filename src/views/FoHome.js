import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Alert,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import _Header from '../Components/Common/AppHeader';
import FoProductList from '../Components/Common/FoProductList';
import Autocomplete from 'react-native-autocomplete-input';
import FoSearchList from '../Components/Common/FoSearchList';
import { CountColor, BGColor, TextColor } from '../Constants/colors';
import { TextFont_Search, HeadingFont } from '../Constants/fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

const myProduct =
    [
        { Id: 1,  qty: 22, name: 'abc' },
        { Id: 2,  qty: 22, name: 'abc' },
        { Id: 3,  qty: 22, name: 'def' },
        { Id: 4,  qty: 22, name: 'ghi' },
        { Id: 5,  qty: 22, name: 'jkl' },
        { Id: 6,  qty: 22, name: 'mnl' },
        { Id: 7,  qty: 22, name: 'pqu' },
        { Id: 8,  qty: 22, name: 'akd' },
        { Id: 9,  qty: 22, name: 'ae' },
        { Id: 10, qty: 22, name: 'adc' },
    ]
export default class FoHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Product: myProduct,
            SearchValue: '',
            matchedproduct: myProduct,
        }
    }
    _Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }

    renderProduct = ({ item }) => {
        return (
            < FoProductList
                Id={item.Id}
                price={item.price}
                qty={item.qty}
                name={item.name}
                key={item.Id}
            />
        )
    };
    renderFoSearchList = ({ item }) => {
        return (
            < FoSearchList
                Id={item.Id}
                price={item.price}
                qty={item.qty}
                name={item.name}
                key={item.Id}
            />
        )
    };

    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedproduct } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedproduct.filter((product) => product.name.search(regex) >= 0);
    }

    render() {

        const { Product } = this.state;
        const { SearchValue } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <View style={styles.container}>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this._Navigation('Landing')}
                    HeadingText={'Available Products'} />
                <View style={{ marginBottom: 25, flex: 1 }}>
                    <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                        <Autocomplete
                            style={styles.AutocompleteStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            inputContainerStyle={{ borderWidth: 0, }}
                            data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].name) ? [] : matchedproduct}
                            defaultValue={SearchValue}
                            onChangeText={(text) => this.setState({ SearchValue: text })}
                            placeholder="Search "
                            placeholderTextColor={TextColor}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ SearchValue: item.name })}>
                                    <Text style={styles.itemText}>
                                        {item.name}

                                    </Text>

                                </TouchableOpacity>


                            )}
                        >

                        </Autocomplete>
                    </View>
                    {this.state.SearchValue === '' ?
                        <FlatList
                            data={Product}
                            keyExtractor={(item) => item.Id}
                            renderItem={this.renderProduct}
                            numColumns={2}>
                        </FlatList> :
                        matchedproduct.length >= 1 ?
                            <FlatList
                                data={matchedproduct}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderFoSearchList}
                                key={1}
                                numColumns={1}>
                            </FlatList> :

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.NotFound}>
                                    Data not found
                </Text>
                            </View>
                    }
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: ScreenHeight * 1,
        backgroundColor: BGColor,
    },
    itemText: {
        fontSize: 15,

    },
    NotFound: {
        fontSize: HeadingFont,
        color: CountColor,
        fontWeight: '700',
    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        fontSize: TextFont_Search,

    }
})