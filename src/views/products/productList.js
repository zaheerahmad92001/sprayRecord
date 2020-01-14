import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextFont_Search, HeadingFont } from '../../Constants/fontsize';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Content, Drawer, Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { borderColor, TextColor, buttonBGcolor } from '../../Constants/colors'
import _Prouduct from '../../Components/Common/_ProductList';
import _Prouducts from '../../Components/Common/_ProductList';
import Modalize from 'react-native-modalize';
import Dialog,
{
    DialogTitle,
    DialogContent,
    SlideAnimation,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
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
        { Id: 11, qty: 28, name: 'adc' },
    ]
export default class ProductList extends Component {

    bottomSheet = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            ProductList: myProduct,
            SearchText: '',
            matchedproduct: myProduct,
            showBottomSheet: false,
            visible: false,
            pId: '',
            pData: '',
        }
    }
    openDrawer =  () => {
        Keyboard.dismiss();
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)

    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();
    };
    _navigateTo = (routeName) => {
        const { pData } = this.state;
        this.onCloseSheet();
        this.props.navigation.navigate(routeName, { pData })
    }
    onCloseSheet = () => {
        this.setState({ showBottomSheet: false })
        if (this.bottomSheet.current) {
            this.bottomSheet.current.close();
        }
    };
    onOpenSheet = () => {
        const bottomSheet = this.bottomSheet.current;
        if (bottomSheet) {
            this.setState({ showBottomSheet: true })
            bottomSheet.open();
        }
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

    ShowBottomSheet = (data) => {
        const scope = this;
        // console.log('item', data);
        this.setState({
            pId: data.Id,
            pData: data,
        });
        scope.onOpenSheet()
    }

    renderBottomSheet = () => {
        return (
            <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                <View style={{ marginTop: 15, }}>

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => this._navigateTo('EditProduct')}>
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

    renderProductList = ({ item }) => {
        return (
            <_Prouducts
                item={item}
                key={item.Id}
                // BottomSheet={() => this.Delete(item)}
                BottomSheet={() => this.ShowBottomSheet(item)}
                navigation={this.props.navigation}
            />
        )
    }
    render() {
        const { SearchText, ProductList } = this.state
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                tapToClose={true}
                negotiatePan={true}>
                <Container>
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => this.openDrawer()}
                        RightPress={() => this._navigateTo('AddNewProduct')}
                        ImageRightIcon={'add-box'}
                        HeadingText={'Product List'} />
                    <View style={styles.SearchView}>
                        <Autocomplete
                            style={styles.AutocompleteStyle}
                            autoCapitalize="none"
                            hideResults={true}
                            autoCorrect={false}
                            autoFocus={false}
                            inputContainerStyle={{ borderWidth: 0, }}
                            listStyle={{ borderWidth: 0, }}
                            // data={matchedproduct.length >= 1 && comp(SearchText, matchedproduct[0].name) ? [] : matchedproduct}
                            defaultValue={SearchText}
                            onChangeText={(text) => this.setState({ SearchText: text })}
                            placeholder="Search "
                            placeholderTextColor={TextColor}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ SearchText: item.name })}>
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
                    <View style={{ paddingHorizontal: 7, flex: 1, marginBottom: 5 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={ProductList}
                            keyExtractor={(item) => item.Id}
                            renderItem={this.renderProductList}
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
                    </View>

                    <Modalize
                        adjustToContentHeight
                        ref={this.bottomSheet}
                        onClosed={this.onClosed} >
                        {this.renderBottomSheet()}
                    </Modalize>
                </Container>

            </Drawer>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'

    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        marginRight: 5,
        fontSize: TextFont_Search,

    },
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),

    },
    SearchView: {
        width: ScreenWidth * 0.97,
        // paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
    },
    buttonStyle: {
        backgroundColor: TextColor,
        marginHorizontal: 20,
        marginVertical: 7,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: RFValue(18)
    },
    DialogText: {
        fontSize: RFValue(12),
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    DialogOK_CancelButton: {
        color: TextColor,
        fontSize: RFValue(12),
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: 'Poppins'
    }

})