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

const orders = [
    { Id: 1, name: 'Tryezophas', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '1', batchNO: 'XxB12345678BAS', weight: '200', unit: 'ml' },
    { Id: 2, name: 'Lemda', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '2', batchNO: 'XxB12345678BAS', weight: '200', unit: 'kg' },
    { Id: 3, name: 'Karatay', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '3', batchNO: 'XxB12345678BAS', weight: '200', unit: 'ml' },
]
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
        this.state = {
            isDatePickerVisible: false,
            visible: false,
            History: orders,
            showModal: false,
            imageUrl: '',
            pId: '',
            pData: '',
            showSheet: false,
        }
    }
    async componentDidMount() {
        await request_storage_runtime_permission()
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
                EditDelete={() => this.editDelete(item)}
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

    Invoice = (item) => {
        const scope = this;
        //console.log('item image', item.invoiceimg)
        this.setState({ imageUrl: item.invoiceimg })
        this.onOpen()
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
    _navigateTo = (routeName) => {
        const { pData } = this.state;
        this.onCloseSheet();
        this.props.navigation.navigate(routeName, { pData })
    }
    Delete = () => {
        this.CancelDialog()
        alert('deleted')
        console.log('product id', this.state.pId)
    }
    showProduct = (item) => {
        // alert(item.Id)
        this.props.navigation.navigate('OrderProducts')
    }
    renderBottomSheet = () => {
        return (
            <_BottomSheet
                _navigateTo={() => this._navigateTo('EditOrder')}
                CallDialogBox={() => this.CallDialogBox()}
                CancelSheet={() => this.onCloseSheet()}
            />
        )
    }


    renderSheet = () => {
        // console.log('invoice image', this.state.imageUrl)
        // console.log('product data for Edit',this.state.pData.name)
        // console.log('product id',this.state.pId)
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
                        // source={require('../assets/image/7.jpg')}
                        source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg' }}
                    //source={require('../../assets/image/p.png')}
                    />
                </View>
            </View>
        )
    }
    downloadImage = () => {
        var date = new Date();
        var image_URL = 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg';
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
        const { History, isDatePickerVisible, visible, showModal, showSheet } = this.state
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Search Results'} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={History}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderOrderList}
                        numColumns={1}
                        horizontal={false}
                    />
                </View>
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
                <Modalize
                    adjustToContentHeight
                    ref={this.modal}
                    onClosed={this.onClosed} >
                    {this.renderSheet()}
                </Modalize>

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