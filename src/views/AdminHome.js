import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import _Header from '../Components/Common/AppHeader';
import AdminProductList from '../Components/Common/AdminProductList'
import Autocomplete from 'react-native-autocomplete-input';
import AdminSearchList from '../Components/Common/AdminSearchList';
import { CountColor, BGColor, TextColor,borderColor } from '../Constants/colors';
import { TextFont_Search, HeadingFont } from '../Constants/fontsize';
import { Drawer, Icon ,Container,Content} from 'native-base';
import Sidebar from '../Components/sidebar/menu';
import {RFValue}from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

const myProduct =
    [
        { Id: 1,  qty: 22, name: 'Tryezophas'},
        { Id: 2,  qty: 21, name: 'Lemda'},
        { Id: 3,  qty: 22, name: 'Karatay'},
        { Id: 4,  qty: 24, name: 'Danydar'},
        { Id: 5,  qty: 25, name: 'PhasPhoras'},
        { Id: 6,  qty: 22, name: 'Jugni' },
        { Id: 7,  qty: 26, name: 'pqu' },
        { Id: 8,  qty: 24, name: 'akd' },
        { Id: 9,  qty: 22, name: 'ae' },
        { Id: 10, qty: 28, name: 'adc' },
        { Id: 10, qty: 28, name: 'adc' },
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

    openDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.open();
    };
    closeDrawer = () => {
       this.drawer && this.drawer._root && this.drawer._root.close();
    };

    _Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }

    renderProduct = ({ item }) => {
        return (
            < AdminProductList
                Id={item.Id}
                qty={item.qty}
                name={item.name}
                key={item.Id}
                navigation= {this.props.navigation}
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
                navigation= {this.props.navigation}
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
                   LeftPress={() => this.openDrawer()}
                    HeadingText={'Available Products'} />
                {/* <View style={{flex:1}}> */}
                    {/* <View style={{ paddingVertical:10, flexDirection: 'row',
                    alignItems:'center', marginBottom:5,backgroundColor:'red'}}>
                    
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
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}>
                        </Autocomplete>
                    </View> */}
                     <View style={styles.SearchView}>
                        <Autocomplete
                            style={styles.AutocompleteStyle}
                            autoCapitalize="none"
                            autoCorrect={false}
                            inputContainerStyle={{ borderWidth: 0, }}
                            listStyle={{borderWidth:0}}
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
                    <View style={{flex:1,marginTop:10}}>

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
                                numColumns={1}>
                            </FlatList> :

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.NotFound}> Data not found</Text>
                            </View>
                    }
                </View>

            </Container>
            </Drawer>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: ScreenHeight * 1,
       // backgroundColor: BGColor,
        backgroundColor:'white'
    },
    itemText: {
        fontSize: 15,

    },
    NotFound: {
        fontSize: HeadingFont,
        color: CountColor,
        fontWeight: '700',
    },
    // AutocompleteStyle: {
    //     backgroundColor: 'transparent',
    //     borderWidth: 1,
    //     borderColor:borderColor,
    //     borderRadius: 20,
    //     paddingHorizontal: 15,
    //     marginHorizontal: 10,
    //     fontSize: TextFont_Search,
    // },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        // borderWidth: 1,
        // borderColor:'black',
        //borderRadius: 20,
        //paddingLeft: 15,
        //marginHorizontal:5,
        marginRight: 5,
        fontSize: TextFont_Search,

    },
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),

    },
    SearchView:{
        width: ScreenWidth * 0.97,
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
    }

})