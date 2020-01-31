import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import AdminProductList from '../../Components/Common/AdminProductList'
import Autocomplete from 'react-native-autocomplete-input';
import AdminSearchList from '../../Components/Common/AdminSearchList';
import { TextColor,} from '../../Constants/colors';
import { Drawer, Icon, Container, Content } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import styles from '../Admin/styles';
const myProduct =
    [
        { Id: 1, qty: 22, name: 'Tryezophas' },
        { Id: 2, qty: 21, name: 'Lemda' },
        { Id: 3, qty: 22, name: 'Karatay' },
        { Id: 4, qty: 24, name: 'Danydar' },
        { Id: 5, qty: 25, name: 'PhasPhoras' },
        { Id: 6, qty: 22, name: 'Jugni' },
        { Id: 7, qty: 26, name: 'pqu' },
        { Id: 8, qty: 24, name: 'akd' },
        { Id: 9, qty: 22, name: 'ae' },
        { Id: 10, qty: 28, name: 'adc' },
        { Id: 10, qty: 28, name: 'adc' },
    ]
export default class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Product: myProduct,
            SearchValue: '',
            matchedproduct: myProduct,
        }
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


    renderProduct = ({ item }) => {
        return (
            < AdminProductList
                Id={item.Id}
                qty={item.qty}
                name={item.name}
                key={item.Id}
                navigation={this.props.navigation}
            />
        )
    };
    renderAdminSearchList = ({ item }) => {
        return (
            < AdminSearchList
                Id={item.Id}
                qty={item.qty}
                name={item.name}
                key={item.Id}
                navigation={this.props.navigation}
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
                        LeftPress={() => {this.openDrawer()}}
                        HeadingText={'Available Products'} />

                    <View style={styles.SearchView}>
                        <Autocomplete
                            style={styles.AutocompleteStyle}
                            autoCapitalize="none"
                            hideResults={true}
                            autoCorrect={false}
                            autoFocus={false}
                            inputContainerStyle={{ borderWidth: 0, }}
                            listStyle={{ borderWidth: 0, }}
                            data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].name) ? [] : matchedproduct}
                            defaultValue={SearchValue}
                            onChangeText={(text) => this.setState({ SearchValue: text })}
                            placeholder="Search "
                            placeholderTextColor={TextColor}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ SearchValue: item.name })}>
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
                    <View style={{ flex: 1, marginTop: 10 }}>

                        {this.state.SearchValue === '' ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={Product}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderProduct}
                                numColumns={2}>
                            </FlatList> :
                            matchedproduct.length >= 1 ?
                                <FlatList
                                    data={matchedproduct}
                                    keyExtractor={(item) => item.Id}
                                    renderItem={this.renderAdminSearchList}
                                    key={1}
                                    numColumns={1}
                                    showsVerticalScrollIndicator={false}
                                >
                                </FlatList> :

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.NotFound}>No Search Result</Text>
                                </View>
                        }
                    </View>

                </Container>
            </Drawer>
        )
    }
}
