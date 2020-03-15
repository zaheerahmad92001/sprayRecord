import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Keyboard, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Drawer, Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { TextColor, buttonBGcolor, MenuTextColor } from '../../Constants/colors'
import _Prouduct from '../../Components/Common/_ProductList';
import _Prouducts from '../../Components/Common/_ProductList';
import Modalize from 'react-native-modalize';
import styles from '../products/styles';
import _BottomSheet from '../../Components/Common/BottomSheet';
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import ProuductModal from '../../../Utils/modal/Product';
let pageNo = 0;
export default class ProductList extends Component {
    bottomSheet = React.createRef();
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            ProductList: [], moreProducts: [], SearchText: '', dummySearch: '',
            showBottomSheet: false,
            visible: false, pId: '', pData: '',
            loading: true, pagination:'',
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

    componentDidMount() {
        pageNo = 1
        ProuductModal.ProductListing(pageNo).then(
            (response) => {
                if (response.success) {
                    this.setState({
                        ProductList: response.data.collection,
                        loading: false,
                        pagination:response.data.pagination
                    })
                  //  console.log('product list pagination',this.state.pagination.last_page)
                } else {
                    alert('something went wrong')
                    console.log('something went wrong', response)
                }
            }, (error) => {
                alert('network error')
                console.log('network error', error)
            })
    }
    onEndReached = ({ distanceFromEnd }) => {
        const scope = this;
        const {pagination} = this.state;
        pageNo = pageNo + 1;
        if (!scope.onEndReachedCalledDuringMomentum) {
           if(pageNo <= pagination.last_page){
               ToastAndroid.show('More products available',ToastAndroid.SHORT) 
 /////////////////////////////////////////////////////////////////////////////////////////////////          
            ProuductModal.ProductListing(pageNo).then(
                (res) => {
                    if (res.success) {
                        scope.setState({
                            moreProducts: res.data.collection
                        })
                    
                        scope.setState({ ProductList: scope.state.ProductList.concat(scope.state.moreProducts) })
                    } else {
                        alert('something went wrong')
                        console.log('something went wrong', res)
                    }
                }, (error) => {
                    alert('network error')
                    console.log('network error', error)
                })
 ////////////////////////////////////////////////////////////////////////////////////////////////////
            }else{
                ToastAndroid.show('No more products',ToastAndroid.LONG)
            }           
            this.onEndReachedCalledDuringMomentum = true;
        }
    }
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
    };
    filterData = (id) => {
        let daa = [];
        const { ProductList } = this.state;
        ProductList.forEach(element => {
            console.log('collections', element);
            if (element.id != id) {
                daa.push(element)
            }
        });
        this.setState({ ProductList: daa })
    }

    Delete = () => {
        const scope = this;
        const { pId, pData } = this.state;
        scope.CancelDialog()
        ProuductModal.ProductDelete(pId).then(
            (res) => {
                if (res.success) {
                    ToastAndroid.show(pData.title + 'deleted', ToastAndroid.SHORT);
                    this.filterData(pId)
                } else {
                    console.log('response', res)
                }
            }, (error) => {
                alert('something went wrong'),
                    console.log('error', error)
            }
        )
    }

    ShowBottomSheet = (data) => {
        const scope = this;
        this.setState({
            pId: data.id,
            pData: data,
        });
        scope.onOpenSheet()
    }
    renderBottomSheet = () => {
        return (
            <_BottomSheet
                _navigateTo={() => this._navigateTo('EditProduct')}
                CallDialogBox={() => this.CallDialogBox()}
                CancelSheet={() => this.onCloseSheet()}
            />
        )}

    renderProductList = ({ item }) => {
        return (
            <_Prouducts
                item={item}
                key={item.Id}
                BottomSheet={() => this.ShowBottomSheet(item)}
                navigation={this.props.navigation}
            />
        )
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }
        const { ProductList } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return ProductList.filter((product) => product.title.search(regex) >= 0);
    }
    render() {
        const { SearchText, ProductList, loading, dummySearch } = this.state;
        console.log('product list', ProductList)
        const matchedproduct = this.findProduct(SearchText);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
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

                    {loading ?
                        <View style={styles.SearchView}>
                            <Autocomplete
                                style={styles.AutocompleteStyle}
                                autoCapitalize="none"
                                hideResults={true}
                                autoCorrect={false}
                                autoFocus={false}
                                inputContainerStyle={{ borderWidth: 0, }}
                                listStyle={{ borderWidth: 0, }}
                                data={matchedproduct.length >= 1 && comp(SearchText, matchedproduct[0].title) ? [] : matchedproduct}
                                defaultValue={dummySearch}
                                onChangeText={(text) => this.setState({ dummySearch: text })}
                                placeholder="Search "
                                placeholderTextColor={TextColor}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ dummySearch: item.title })}>
                                        <Text style={styles.itemText}>{item.title}</Text>
                                    </TouchableOpacity>
                                )}>
                            </Autocomplete>
                            <Icon
                                style={styles.IconStyle}
                                name={'ios-search'}
                                type={'Ionicons'} />
                        </View>
                        :
                        <View style={styles.SearchView}>
                            <Autocomplete
                                style={styles.AutocompleteStyle}
                                autoCapitalize="none"
                                hideResults={true}
                                autoCorrect={false}
                                autoFocus={false}
                                inputContainerStyle={{ borderWidth: 0, }}
                                listStyle={{ borderWidth: 0, }}
                                data={matchedproduct.length >= 1 && comp(SearchText, matchedproduct[0].title) ? [] : matchedproduct}
                                defaultValue={SearchText}
                                onChangeText={(text) => this.setState({ SearchText: text })}
                                placeholder="Search "
                                placeholderTextColor={TextColor}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ SearchText: item.title })}>
                                        <Text style={styles.itemText}>{item.title}</Text>
                                    </TouchableOpacity>
                                )}>
                            </Autocomplete>
                            <Icon
                                style={styles.IconStyle}
                                name={'ios-search'}
                                type={'Ionicons'} />
                        </View>
                    }
                    <View style={{ paddingHorizontal: 7, flex: 1, marginBottom: 5 }}>
                        {loading ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator
                                    color={MenuTextColor}
                                    size={'large'} />
                            </View> :
                            SearchText === '' ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={ProductList}
                                    keyExtractor={(item) => item.Id}
                                    renderItem={this.renderProductList}
                                    numColumns={1}
                                    horizontal={false}
                                    onEndReached={this.onEndReached.bind(this)}
                                    onEndReachedThreshold={0.5}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                /> :

                                matchedproduct.length >= 1 ?

                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={matchedproduct}
                                        keyExtractor={(item) => item.Id}
                                        renderItem={this.renderProductList}
                                        numColumns={1}
                                        horizontal={false} /> :
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.NotFound}>No Search Result</Text>
                                    </View>

                        }

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
                            }>
                            <DialogContent
                                style={{ width: 300 }}>
                                <Text style={styles.DialogText}>Do you want to Delete ? Action can`t Undo</Text>
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
