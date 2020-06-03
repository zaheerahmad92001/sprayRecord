import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Keyboard, ActivityIndicator, ToastAndroid } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Drawer, Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { TextColor, buttonBGcolor, MenuTextColor } from '../../Constants/colors'
import Modalize from 'react-native-modalize';
import styles from '../products/styles';
import _BottomSheet from '../../Components/Common/BottomSheet';
import _ReturnedProduct from '../../Components/Common/ReturnedProduct';
import {getDateInUTCWithoutHours, convertDateToString}from '../../RandFunction'
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import SaleModal from '../../../Utils/modal/Sale';
let pageNo=0;
export default class ReturnedProductList extends Component {
    //bottomSheet = React.createRef();
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            ProductList:[], SearchText: '',
            showBottomSheet: false, loading:true,
            visible: false,pId: '',pData: '',
            dummySearch:'',moreProduct:[],pagination:'',
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
    componentDidMount(){
        const scope = this;
        pageNo= 1;
        SaleModal.ReturnProductList(pageNo).then(
            (res)=>{
             if(res.success){
                 scope.setState({
                     ProductList: res.data.collection,
                     loading:false,
                     pagination:res.data.pagination
                 })
              //  console.log('pagination zaheee ',this.state.pagination.last_page)
             }else{
                 alert('server error')
                 console.log('server error',res)
             }
            },(error)=>{
               alert('request fail')
               console.log('Request fail',error)
            }
        )
    }
    _navigateTo = (routeName) => {
        const { pData } = this.state;
       // this.onCloseSheet();
        this.props.navigation.navigate(routeName, { pData })
    }
    // onCloseSheet = () => {
    //     this.setState({ showBottomSheet: false })
    //     if (this.bottomSheet.current) {
    //         this.bottomSheet.current.close();
    //     }
    // };
    // onOpenSheet = () => {
    //     const bottomSheet = this.bottomSheet.current;
    //     if (bottomSheet) {
    //         this.setState({ showBottomSheet: true })
    //         bottomSheet.open();
    //     }
    // };
    // CallDialogBox = () => {
    //     this.setState({ visible: true })
    //     this.onCloseSheet()
    // }
    // CancelDialog = () => {
    //     this.setState({ visible: false })
    // }

    // Delete = () => {
    //     this.CancelDialog()
    //     console.log('product id', this.state.pId)
    // }

    // ShowBottomSheet = (data) => {
    //     const scope = this;
    //     this.setState({
    //         pId: data.Id,
    //         pData: data,
    //     });
    //     scope.onOpenSheet()
    // }

    renderProductList = ({ item }) => {
        return (
            <_ReturnedProduct
                item={item}
                key={item.Id}
                // BottomSheet={() => this.ShowBottomSheet(item)}
                navigation={this.props.navigation}/>
            )}
    // renderBottomSheet = () => {
    //     return (
    //         <_BottomSheet
    //             _navigateTo={() => this._navigateTo('EditRetrunProducts')}
    //             CallDialogBox={() => this.CallDialogBox()}
    //             CancelSheet={() => this.onCloseSheet()}
    //             />
    //         )}
            findProduct(query) {
                if (query === '') {return [];}
                const {ProductList} = this.state;
                const regex = new RegExp([query.trim()], 'i');
                return ProductList.filter((product) => product.product.title.search(regex) >= 0);
            }
            onEndReached = ({ distanceFromEnd }) => {
                const scope = this;
                const {pagination} = this.state;
                pageNo=pageNo+1;
                if(!this.onEndReachedCalledDuringMomentum){
                    if(pageNo <= pagination.last_page ){
                        ToastAndroid.show('More products available',ToastAndroid.SHORT)
////////////////////////////////////////////////////////////////////////////////////////////////
                    SaleModal.ReturnProductList(pageNo).then(
                        (res)=>{
                         if(res.success){
                            scope.setState({
                            moreProduct: res.data.collection
                            })
                       scope.setState({ProductList:scope.state.ProductList.concat(scope.state.moreProduct)})
                         }else{
                             alert('something went wrong')
                             console.log('something went wrong',res)
                         }
                        },(error)=>{
                           alert('network error')
                           console.log('network error',error)
                        }) 
////////////////////////////////////////////////////////////////////////////////////////////////  
                    }else{
                        ToastAndroid.show('No more products',ToastAndroid.LONG)
                    }   
                    this.onEndReachedCalledDuringMomentum = true;
                }
            }

    render() {
        const {SearchText,ProductList,loading,dummySearch } = this.state;
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
                        RightPress={() => this._navigateTo('ReturnProducts')}
                        ImageRightIcon={'add-box'}
                        HeadingText={'Returned Products'} />
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
                        // data={matchedproduct.length >= 1 && comp(SearchText, matchedproduct[0].name) ? [] : matchedproduct}
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
                    <View style={{ flex: 1, marginBottom: 5 }}>
                        {loading ?
                        <View>
                        <ActivityIndicator
                         color={MenuTextColor}
                         size={'large'}
                        />
                        </View>
                        : SearchText===''?
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
                            />
                            :
                          matchedproduct.length >=1 ?
                          <FlatList
                          showsVerticalScrollIndicator={false}
                          data={matchedproduct}
                          keyExtractor={(item) => item.Id}
                          renderItem={this.renderProductList}
                          numColumns={1}
                          horizontal={false} />:
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
                                {/* <Text style={styles.DialogText}>Action can`t Undo</Text> */}
                            </DialogContent>
                        </Dialog>
                    </View>

                    {/* <Modalize
                        adjustToContentHeight
                        ref={this.bottomSheet}
                        onClosed={this.onClosed} >
                        {this.renderBottomSheet()}
                    </Modalize> */}
                </Container>
            </Drawer>
        )
    }
}