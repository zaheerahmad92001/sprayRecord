import React, { Component } from 'react';
import {
    View, Text, Image, Dimensions,
    TouchableOpacity, FlatList, Alert,
    PermissionsAndroid, Keyboard, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Container, Content, Icon, Drawer } from 'native-base';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import _Header from '../../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import styles from '../orderList/styles';
import { TextColor, buttonBGcolor, MenuTextColor } from '../../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import _OrderList from '../../../Components/Common/orderList';
import Modalize from 'react-native-modalize';
import Sidebar from '../../../Components/sidebar/menu';
import _BottomSheet from '../../../Components/Common/BottomSheet';
import { convertDateToString, IMAGEURL } from '../../../RandFunction';
import DateTimePicker from "react-native-modal-datetime-picker";
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import RNFetchBlob from 'rn-fetch-blob';
import OrderModal from '../../../../Utils/modal/order';
import AsyncStorage from '@react-native-community/async-storage';
let pageNo = 0;
let USER='';
export async function request_storage_runtime_permission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'ReactNativeCode Storage Permission',
                'message': 'ReactNativeCode App needs access to your storage to download Photos.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            //Alert.alert("Storage Permission Granted.");
        }
        else {

            Alert.alert("Storage Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}

export default class Orders extends Component {
    modal = React.createRef();
    bottomSheet = React.createRef();
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            SearchValue: '',
            isDatePickerVisible: false,
            visible: false,
            date: '',
            orders: [], moreOrders: [],
            loading: true,
            showModal: false,
            imageUrl: '',
            pagination:'',
        }
    }
    async componentDidMount() {
        AsyncStorage.getItem('user').then((value)=>{
            USER = JSON.parse(value)
            console.log('user token',USER.token)
         })

        const scope = this;
        let _orders = [];
        pageNo = 1;
        await request_storage_runtime_permission();
        console.log('page at this stage',pageNo)
        OrderModal.orderList(pageNo).then(
            (res) => {
                if (res.success) {
                    this.setState({
                    orders:res.data.collection,
                    loading: false,
                    pagination:res.data.pagination,
                    })
                   // console.log('aaaaaa',this.state.pagination.last_page)
                } else {
                    alert('server error')
                    console.log('data', res)
                }
            }, (error) => {
                alert('response fail');
                console.log('error', error)
            }
        )

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

    showProduct = (item) => {
        this.props.navigation.navigate('OrderProducts', {
            item: item
        })
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    handleDatePicked = date => {
        date = convertDateToString(date)
        this.setState({ date });
        this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    renderOrderList = ({ item }) => {
        return (
            < _OrderList
                item={item}
                key={item.Id}
                invoice={() => this.Invoice(item)}
                showProducts={() => this.showProduct(item)}
                navigation={this.props.navigation} />
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

    Invoice = (item) => {
        const scope = this;
        this.setState({ imageUrl: item.invoice })
        this.onOpen()
    };

    onEndReached = ({ distanceFromEnd }) => {
        const scope = this;
        const {pagination} = this.state;
        pageNo = pageNo + 1;
        if (!scope.onEndReachedCalledDuringMomentum) {
            if(pageNo <= pagination.last_page){
                ToastAndroid.show('More data available',ToastAndroid.SHORT)
///////////////////////////////////////////////////////////////////////////////////////////////
            OrderModal.orderList(pageNo).then(
                (res) => {
                    if (res.success) {
                        scope.setState({
                            moreOrders: res.data.collection
                        })
                        scope.setState({ orders: scope.state.orders.concat(scope.state.moreOrders) })
                    } else {
                        alert('something went wrong')
                        console.log('something went wrong', res)
                    }
                }, (error) => {
                    alert('network error')
                    console.log('network error', error)
                }
            )
///////////////////////////////////////////////////////////////////////////////////////////////            
              }else{
                ToastAndroid.show('No more data',ToastAndroid.LONG)
              } 
        this.onEndReachedCalledDuringMomentum = true;
        }
    }
    renderSheet = () => {
        const { imageUrl } = this.state;
        return (
            <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <TouchableOpacity style={{ paddingVertical: 5, paddingLeft: 10, }}
                        onPress={() => this.downloadImage()}>
                        <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 5 }}>
                            <Text style={styles.invoiceStyle}>Download Image </Text>
                            <Icon
                                name={'arrow-downward'}
                                type={'MaterialIcons'}
                                style={{ fontSize: RFValue(26), color: 'green' }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.closeModal()}>
                        <Icon
                            name={'cross'}
                            type='Entypo'
                            style={{ fontSize: 26, color: 'red' }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.borderBottom} />
                <View style={styles.imgView}>
                    <Image
                        style={{ height: ScreenHeight * 0.8, width: ScreenWidth * 0.98, alignSelf: 'center', }}
                        source={{ uri: IMAGEURL + imageUrl }}
                    />
                </View>
            </View>
        )
    }
    downloadImage = () => {
        var date = new Date();
        let { imageUrl } = this.state
        var image_URL = IMAGEURL + imageUrl;
        var ext = this.getExtention(image_URL);
        ext = "." + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + "/image_" + Math.floor(date.getTime()
                    + date.getSeconds() / 2) + ext,
                description: 'Image'
            }
        }
        config(options).fetch('GET', image_URL,{
            // 'Accept':'application/json,text/plain',
            // 'Content-Type': 'application/json',
            'authorization':USER.token
        }).then((res) => {
            Alert.alert("Image Downloaded Successfully.");
        }).catch(error=>{
            console.log('invoice download error',error)
        });
    }
    getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
            undefined;
    }

    render() {
        const { date, loading, orders } = this.state;
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                tapToClose={true}
                negotiatePan={true} >
                <Container >
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => this.openDrawer()}
                        HeadingText={'Order History'} />
                    <View style={styles.datePickerView}>
                        <TouchableOpacity style={styles.selectDateStyle}
                            onPress={() => this.showDateTimePicker()}>
                            <Text style={styles.startDInput}>
                                {!date || !date.length ? 'Select date' : date}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SearchIconView}
                            onPress={() => this.props.navigation.navigate('orderSearchView', {
                                item: {
                                    date: date,
                                    orders: orders
                                }
                            })}>
                            <Icon
                                name={'ios-search'}
                                type={'Ionicons'}
                                style={{ fontSize: RFValue(26), alignSelf: 'flex-end', marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    </View>

                    {loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                color={MenuTextColor}
                                size={'large'} />
                        </View> :
                        <FlatList
                            style={{ marginBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                            data={orders}
                            keyExtractor={(item) => item.Id}
                            renderItem={this.renderOrderList}
                            numColumns={1}
                            horizontal={false}
                            onEndReached={this.onEndReached.bind(this)}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        />
                    }
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        is24Hour={false}
                        mode={'date'}
                        datePickerModeAndroid={'spinner'}
                        timePickerModeAndroid={'spinner'}
                    />
                    <Modalize
                        adjustToContentHeight
                        ref={this.modal}
                        onClosed={this.onClosed} >
                        {this.renderSheet()}
                    </Modalize>
                </Container>
            </Drawer>
        )
    }
}
