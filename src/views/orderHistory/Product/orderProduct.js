import React, { Component } from 'react';
import {
    View, Text, Image, Dimensions,
    TouchableOpacity,
    FlatList, Keyboard,PermissionsAndroid, ActivityIndicator
} from 'react-native';
import { Container, Content, Icon, Drawer, } from 'native-base';
import _Header from '../../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import { buttonBGcolor, MenuTextColor, AdminBG } from '../../../Constants/colors';
import { AppBarLayout, CoordinatorLayout, CollapsingToolbarLayout, CollapsingParallax } from 'react-native-collapsing-toolbar';
import NestedScrollView from 'react-native-nested-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import _OrderDetail from '../../../Components/Common/orderHistory';
import Modalize from 'react-native-modalize';
import _BottomSheet from '../../../Components/Common/BottomSheet';
import styles from '../../orderHistory/Product/styles';
import RNFetchBlob from 'rn-fetch-blob';
import BlinkingClass from '../../payment/BlinkingText';
import Blink from './Blinking';
import OrderModal from '../../../../Utils/modal/order';
import {convertDateToString, IMAGEURL} from '../../../RandFunction';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

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
export default class OrderProducts extends Component {
    modal = React.createRef();
    bottomSheet = React.createRef();
    captureAppBarRef = (ref) => {
        this.appBar = ref
    }
    renderScroll(props) {
        return (
            <NestedScrollView {...props} />
        )
    }
    constructor(props) {
        super(props);
        this.param = this.props.navigation.getParam('item'),
        this.state = {
            visible: false,
            showModal: false,
            InvoiceURL: '',
            ImageURL:'',
            Blinking:true,
            orderDetail:'',
            order:'',
            showSheet: false,
            loading:true,
        }
    }
    async componentDidMount() {
        const scope = this;
        await request_storage_runtime_permission();
        OrderModal.orderDetails(scope.param.id).then(
        (res)=>{
          if(res.success){
             this.setState({
                orderDetail:res.data.collection.orderDetails,
                order:res.data.collection,
                loading:false,
             })
          }else{
              alert('server error')
          }
        },(error)=>{
          alert('fail')
        console.log('error',error)
        })

        setInterval(() => {
            this.setState(previousState => {
              return { Blinking: !previousState.Blinking };
            });
          }, 
          4000);
    }

    goBack = () => {
        this.props.navigation.pop()
    };

    onOpen = () => {
        const modal = this.modal.current;
        if (modal) {
            this.setState({ showModal: true })
            modal.open();
        }
    };
    closeModal = () => {
        this.setState({ showModal: false })
        if (this.modal.current) {
            this.modal.current.close();
        }
    };

    renderOrderProducts = ({ item }) => {
        return (
            <_OrderDetail
                item={item}
                key={item.Id}
                navigation={this.props.navigation} />
                )};
    invoice = (item) => {
        console.log('item zaheer ',item.invoice)
        this.setState({ InvoiceURL: item.invoice })
        this.onOpen()
    };
    renderSheet = () => {
        const {InvoiceURL} = this.state;
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
                      //  source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg' }}
                    source={{uri:IMAGEURL+InvoiceURL}}
                    />
                </View>
            </View>
        )
    }
    downloadImage = () => {
        var date = new Date();
        const {InvoiceURL} = this.state;
       // var image_URL = 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg';
       var image_URL = IMAGEURL+InvoiceURL;
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
        config(options).fetch('GET', image_URL).then((res) => {
            Alert.alert("Image Downloaded Successfully.");
        });
    }
    getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
            undefined;
    }

    render() {
        //console.log('param',this.param)
        const { Blinking,loading,orderDetail,order } = this.state;
        let date = new Date(order.order_date*1000)
        const { SearchValue } = this.state;
        return (
            <Container>
                {loading ?
                <_Header
                ImageLeftIcon={'keyboard-backspace'}
                LeftPress={() => this.goBack()}
                ImageRightIcon={'file-download'}
                HeadingText={'Order products'} /> : null }

                {loading ? 
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator
                    color={MenuTextColor}
                    size={'large'}
                    />
                </View>:
                <CoordinatorLayout
                    style={{ flex: 1, marginBottom: 10, }}>
                    <AppBarLayout
                        ref={this.captureAppBarRef}
                        style={styles.appbar}>
                        <CollapsingToolbarLayout
                            // title='Collapsing Toolbar'
                            contentScrimColor={buttonBGcolor}
                            // expandedTitleColor='red'
                            // collapsedTitleTextColor='green'
                            expandedTitleGravity='center'
                            scrimVisibleHeightTrigger={30}
                            scrimAnimationDuration={1000}
                            expandedTitleMarginStart={0}
                            expandedTitleMarginTop={0}
                            expandedTitleMarginBottom={0}
                            scrimVisibleHeightTrigger={50}
                            scrollFlags={
                                AppBarLayout.SCROLL_FLAG_SCROLL
                                | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED
                                | AppBarLayout.SCROLL_FLAG_SNAP
                            }>
                            <CollapsingParallax parallaxMultiplier={0.6}>
                                <View collapsable={false} style={{ height: ScreenHeight * 0.16, justifyContent: 'center' }}>
                                    <_Header
                                        ImageLeftIcon={'keyboard-backspace'}
                                        LeftPress={() => this.goBack()}
                                        ImageRightIcon={'file-download'}
                                        RightPress={() => this.invoice(order)}
                                        HeadingText={'Order products'} />
                                    <View style={{ marginHorizontal: 10, }}>
                                        <View style={[styles.blinkgView, Blinking ?{color:'black',backgroundColor:'#BBBBBB'}:{color:MenuTextColor,backgroundColor:AdminBG}]}>
                                            {/* <Blink text={order.batch_number} />
                                            <Blink text={convertDateToString(date) } /> */}
                                            <Text style={styles.textStyle}>{order.batch_number}</Text>
                                            <Text style={styles.textStyle}>{convertDateToString(date)}</Text>
                                        </View>

                                        {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5, }}>
                                            <TouchableOpacity style={styles.textInvoice}
                                                onPress={() => this.invoice(order)}>
                                                <View style={[styles.detailView, { paddingRight: 5 }]}>
                                                    <Text style={styles.InvoiceText}>Invoice</Text>
                                                    <Icon name={'file'}
                                                        type={'MaterialCommunityIcons'}
                                                        style={{ fontSize: 20, color: MenuTextColor, alignSelf: 'center' }}></Icon>
                                                </View>
                                            </TouchableOpacity>
                                        </View> */}

                                    </View>
                                </View>
                            </CollapsingParallax>
                        </CollapsingToolbarLayout>
                    </AppBarLayout>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orderDetail}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderOrderProducts}
                        renderScrollComponent={this.renderScroll}
                        numColumns={1}
                        horizontal={false}
                    />
                </CoordinatorLayout> }

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

