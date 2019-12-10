import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import {
    Container,
    Content,
    Icon
} from 'native-base';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import _Header from '../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import { TextFont_Search, HeadingFont } from '../Constants/fontsize';
import { TextColor, borderColor, buttonBGcolor } from '../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import _OrderDetail from '../Components/Common/orderHistory';
import Modalize from 'react-native-modalize';
const myProduct =
    [
        { Id: 1, qty: 22, name: 'Tryezophas' },
        { Id: 2, qty: 21, name: 'Lemda' },
        { Id: 3, qty: 22, name: 'Karatay' },
        { Id: 4, qty: 24, name: 'Danydar' },
        { Id: 5, qty: 25, name: 'PhasPhoras' },
        { Id: 6, qty: 22, name: 'Jugni' },

    ]
    const order_history =
    [
        { Id: 1,  name: 'Tryezophas',AQty:'200',RQty:'400',TQty:'600',date:'20-Aug-2019',invoiceimg:'1' },
        { Id: 2,  name: 'Lemda' ,AQty:'200',RQty:'400',TQty:'600',date:'20-Aug-2019',invoiceimg:'2'},
        { Id: 3,  name: 'Karatay' ,AQty:'200',RQty:'400',TQty:'600',date:'20-Aug-2019',invoiceimg:'3'},
        { Id: 4,  name: 'Danydar' ,AQty:'200',RQty:'400',TQty:'600',date:'20-Aug-2019',invoiceimg:'4'},
        { Id: 5,  name: 'PhasPhoras' ,AQty:'200',RQty:'400',TQty:'600',date:'20-Aug-2019',invoiceimg:'5'},
        { Id: 6,  name: 'Jugni' ,AQty:'200',RQty:'400',TQty:'600',date:'20-Aug-2019',invoiceimg:'6'},

    ]
export default class OrderHistory extends Component {
    modal = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            Product: myProduct,
            SearchValue: '',
            matchedproduct: myProduct,
            History:order_history,
            showModal: false,
            abc:'',

        }
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedproduct } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedproduct.filter((product) => product.name.search(regex) >= 0);
    }
    renderOrderHistory = ({ item }) => {
        return (
            < _OrderDetail
               item={item}
                key={item.Id}
                invoice={()=>this.Invoice(item)}
                navigation= {this.props.navigation} />
        )
    };
     
     closeModal = () => {
        this.setState({ showModal: false })
        if (this.modal.current) {
            this.modal.current.close();
        }
    };
    onOpen = () => {
        const modal = this.modal.current;
        if (modal) {
            this.setState({ showModal: true })
            modal.open();
        }
    };
    Invoice=(item)=>{
        const scope = this;
        console.log('item image',item.invoiceimg)
        this.setState({abc:item.invoiceimg})
       this.onOpen()
    }
    
    renderSheet = () => {
        console.log('invoice image',this.state.abc)
        return (
            <View style={{ height: ScreenHeight * 0.9, backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, paddingVertical: 10 }}>
                    <Text style={styles.invoiceStyle}>Invoice</Text>
                    <Icon
                        name={'cross'}
                        type='Entypo'
                        style={{ fontSize: 26, color: 'red' }}
                        onPress={() => this.closeModal()}
                    ></Icon>
                </View>
                <View style={styles.borderBottom}/>
                <View style={styles.imgView}>
                <Image
                    style={{ width: 350, height: 430 ,alignSelf:'center'}}
                    source={require('../assets/image/1.jpg')}
                    //source={require('../../assets/image/p.png')}
                />
                </View>
            </View>
        )
    }
    render() {
        const { Product,History } = this.state;
        const { SearchValue } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Container >
                <_Header
                    ImageLeftIcon={'menu'}
                    HeadingText={'Order History'} />
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
                <Content showsVerticalScrollIndicator={false} style={{ flex: 1,marginBottom:10 }}>
                    <FlatList
                     showsVerticalScrollIndicator={false}
                     data={History}
                     keyExtractor={(item) => item.Id}
                     renderItem={this.renderOrderHistory}
                     numColumns={1}
                     horizontal={false}
                    >

                    </FlatList>
                   {/* <_OrderDetail>

                   </_OrderDetail> */}

                </Content>
                <Modalize
                    adjustToContentHeight
                    ref={this.modal}
                    onClosed={this.onClosed} >
                    {this.renderSheet()}
                </Modalize>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
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
    },
    invoiceStyle:{
        fontStyle:'italic',
        fontWeight:'bold',
        fontFamily:'Poppins',
        fontSize:RFValue(14),
        color:TextColor
    },
    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
    },
    imgView:{
     paddingHorizontal:5,
     paddingVertical:5,
     backgroundColor:'red',
     alignItems:'center',
     justifyContent:'center',
     width:ScreenWidth*1,
     height:ScreenHeight*0.8
      
    }
})