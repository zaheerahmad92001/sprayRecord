import React, { Component } from 'react';
import {
    View, Text, Image, Dimensions,
    TouchableOpacity, FlatList, Alert,
    PermissionsAndroid, Keyboard
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { Content, Container, Icon } from 'native-base';
import _BottomSheet from '../../Components/Common/BottomSheet';
import Modalize from 'react-native-modalize';
import { RFValue } from 'react-native-responsive-fontsize';
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { buttonBGcolor, TextColor } from '../../Constants/colors';
import _OrderList from '../../Components/Common/orderList';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import styles from './styles';
import RNFetchBlob from 'rn-fetch-blob';
import { convertDateToString, IMAGEURL } from '../../RandFunction';


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

           // Alert.alert("Storage Permission Granted.");
        }
        else {

            Alert.alert("Storage Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}
export default class orderSearchView extends Component {
    bottomSheet = React.createRef();
    modal = React.createRef();
    constructor(props) {
        super(props);
        this.param = this.props.navigation.getParam('item'); 
        this.state = {
            isDatePickerVisible: false,
            visible: false,
            showModal: false,
            imageUrl: '',
            searchOrderd:[],
        }
    }
    
    async componentDidMount() {
        await request_storage_runtime_permission()
        let _orders =[];
        const scope = this;
        const {orders ,date} = this.param; 
        scope.param.orders.map((value)=>{
            let _orderDate = value.order_date*1000;
               _orderDate= convertDateToString(new Date(_orderDate))
               if(date===_orderDate){
                   _orders.push(value)
               }
            })
        scope.setState({searchOrderd:_orders})
    }

    goBack = () => {
        this.props.navigation.pop();
    }

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
        this.setState({ imageUrl: item.invoice})
        this.onOpen()
    };
   
    showProduct = (item) => {
       this.props.navigation.navigate('OrderProducts',{
           item:item
       })
    }
    
    renderSheet = () => {
        const {imageUrl} = this.state;
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
                        style={{ height: ScreenHeight * 0.8, width: ScreenWidth * 0.98, alignSelf: 'center', backgroundColor: 'green' }}
                        source={{ uri:IMAGEURL+imageUrl }}
                    />
                </View>
            </View>
        )
    }
    downloadImage = () => {
        const {imageUrl} = this.state;
        var date = new Date();
        var image_URL=IMAGEURL+imageUrl;
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
        const {searchOrderd } = this.state
        return (
            <Container >
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Search Results'} />
            
                {searchOrderd.length>0 ?
                    <FlatList
                       style={{marginBottom:RFValue(10)}}
                        showsVerticalScrollIndicator={false}
                        data={searchOrderd}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderOrderList}
                        numColumns={1}
                        horizontal={false}
                    />: 
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={styles.NotFound}>No Search Result </Text>
                    </View>
                    }
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