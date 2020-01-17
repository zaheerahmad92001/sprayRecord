import React, { Component } from 'react';
import {
    View,Text,Image,Dimensions,
    TouchableOpacity,
    FlatList,Keyboard
} from 'react-native';
import {Container,Content,Icon,Drawer,}from 'native-base';
import _Header from '../../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import { TextColor, buttonBGcolor } from '../../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import _OrderDetail from '../../../Components/Common/orderHistory';
import Modalize from 'react-native-modalize';
import styles from '../../orderHistory/Product/styles';
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
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
        { Id: 1, name: 'Tryezophas', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '1', batchNO: 'XxB12345678BAS', weight: '200', unit: 'ml' },
        { Id: 2, name: 'Lemda', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '2', batchNO: 'XxB12345678BAS', weight: '200', unit: 'kg' },
        { Id: 3, name: 'Karatay', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '3', batchNO: 'XxB12345678BAS', weight: '200', unit: 'ml' },
        { Id: 4, name: 'Danydar', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '4', batchNO: 'XxB12345678BAS', weight: '500', unit: 'kg' },
        { Id: 5, name: 'PhasPhoras', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '5', batchNO: 'XxB12345678BAS', weight: '300', unit: 'ml' },
        { Id: 6, name: 'Jugni', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '6', batchNO: 'XxB12345678BAS', weight: '200', unit: 'kg' },

    ]

export default class OrderProducts extends Component {
    modal = React.createRef();
    bottomSheet = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            //Product: myProduct,
            SearchValue: '',
            visible: false,
            matchedproduct: myProduct,
            History: order_history,
            showModal: false,
            imageUrl: '',
            pId: '',
            pData: '',
            showSheet: false,
        }
    }

    _navigateTo = (routeName) => {
        const { pData } = this.state;
        this.onCloseSheet();
        this.props.navigation.navigate(routeName, { pData })
    }
    goBack = () => {
        this.props.navigation.pop()
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedproduct } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedproduct.filter((product) => product.name.search(regex) >= 0);
    }
    renderOrderProducts = ({ item }) => {
        return (
            < _OrderDetail
                item={item}
                key={item.Id}
                EditDelete={() => this.editDelete(item)}
                navigation={this.props.navigation} />
        )
    };


    onOpen = () => {
        const modal = this.modal.current;
        if (modal) {
            this.setState({ showModal: true })
            modal.open();
        }
    };
    onCloseSheet = () => {
        this.setState({ showSheet: false })
        if (this.bottomSheet.current) {
            this.bottomSheet.current.close();
        }
    };
    onOpenSheet = () => {
        const bottomSheet = this.bottomSheet.current;
        if (bottomSheet) {
            this.setState({ showSheet: true })
            bottomSheet.open();
        }
    };


    editDelete = (item) => {
        const scope = this;
        console.log('item', item);
        this.setState({
            pId: item.Id,
            pData: item,
        });
        this.onOpenSheet();
    };
    CallDialogBox = () => {
        this.setState({ visible: true })
        this.onCloseSheet()
    }
    CancelDialog = () => {
        this.setState({ visible: false })
    }
    Delete = () => {
        this.CancelDialog()
        console.log('product id', this.state.pId)
    }
    renderBottomSheet = () => {
        return (
            <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                <View style={{ marginTop: 15, }}>

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => this._navigateTo('EditOrderProduct')}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => this.CallDialogBox()}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: 'white', paddingVertical: 0, paddingBottom: 7 }]}
                        onPress={() => this.onCloseSheet()}>
                        <Text style={[styles.buttonText, { color: TextColor, fontSize: RFValue(14) }]}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    render() {
        const { Product, History } = this.state;
        const { SearchValue } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (

            <Container >
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Order products'} />
                <View style={styles.SearchView}>
                    <Autocomplete
                        style={styles.AutocompleteStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        inputContainerStyle={{ borderWidth: 0, }}
                        listStyle={{ borderWidth: 0 }}
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
                <Content showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 10 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={History}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderOrderProducts}
                        numColumns={1}
                        horizontal={false}
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
                                    onPress={() => this.CancelDialog()}
                                />
                                <DialogButton
                                    textStyle={styles.DialogOK_CancelButton}
                                    text="OK"
                                    onPress={() => this.Delete()}
                                />
                            </DialogFooter>
                        }
                        dialogTitle={
                            <DialogTitle
                                textStyle={{
                                    color: 'white',
                                    fontSize: RFValue(16),
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    fontFamily: 'Poppins'
                                }}
                                title="Delete "
                                style={{ backgroundColor: buttonBGcolor, color: 'white' }} />
                        }
                    >
                        <DialogContent
                            style={{ width: 300 }}>
                            <Text style={styles.DialogText}>Do you want to Delete ? Action can`t Undo</Text>
                            {/* <Text style={styles.DialogText}>Action can`t Undo</Text> */}
                        </DialogContent>
                    </Dialog>

                </Content>

                <Modalize
                    adjustToContentHeight
                    ref={this.bottomSheet}
                    onClosed={this.onClosed} >
                    {this.renderBottomSheet()}
                </Modalize>
            </Container>

        )
    }
}

