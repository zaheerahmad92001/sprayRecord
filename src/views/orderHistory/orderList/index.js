import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    PermissionsAndroid,
    Keyboard
} from 'react-native';
import {
    Container,
    Content,
    Icon,
    Drawer,
} from 'native-base';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import _Header from '../../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import { TextFont_Search, HeadingFont } from '../../../Constants/fontsize';
import { TextColor, borderColor, buttonBGcolor } from '../../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import _OrderList from '../../../Components/Common/orderList';
import Modalize from 'react-native-modalize';
import Sidebar from '../../../Components/sidebar/menu';
import Dialog,
{
    DialogTitle,
    DialogContent,
    SlideAnimation,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import RNFetchBlob from 'rn-fetch-blob';
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
        { Id: 1, name: 'Tryezophas', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '1', batchNO: 'XxB12345678BAS',weight:'200',unit:'ml'},
        { Id: 2, name: 'Lemda', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '2', batchNO: 'XxB12345678BAS',weight:'200',unit:'kg' },
        { Id: 3, name: 'Karatay', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '3', batchNO: 'XxB12345678BAS',weight:'200',unit:'ml' },
        { Id: 4, name: 'Danydar', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '4', batchNO: 'XxB12345678BAS',weight:'500',unit:'kg' },
        { Id: 5, name: 'PhasPhoras', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '5', batchNO: 'XxB12345678BAS',weight:'300',unit:'ml' },
        { Id: 6, name: 'Jugni', AQty: '200', RQty: '400', TQty: '600', date: 'Dec 20 2019', invoiceimg: '6', batchNO: 'XxB12345678BAS',weight:'200',unit:'kg' },

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

        Alert.alert("Storage Permission Granted.");
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

    async componentDidMount() {

        await request_storage_runtime_permission()

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
    _navigateTo =(routeName)=>{
       const {pData} = this.state;
       this.onCloseSheet();
    this.props.navigation.navigate(routeName,{pData})
    }
    showProduct =(item)=>{
       // alert(item.Id)
       this.props.navigation.navigate('OrderProducts')
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedproduct } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedproduct.filter((product) => product.name.search(regex)>= 0);
    }
    renderOrderList = ({ item }) => {
        return (
            < _OrderList
                item={item}
                key={item.Id}
                invoice={() => this.Invoice(item)}
                EditDelete={() => this.editDelete(item)}
                showProducts={()=>this.showProduct(item)}
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
        this.setState({visible: true })
        this.onCloseSheet()
    }
    CancelDialog = () => {
        this.setState({visible: false})
    }
    Delete = () => {
        this.CancelDialog()
        console.log('product id',this.state.pId)
    }
    renderBottomSheet = () => {
        return (
            <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                <View style={{ marginTop: 15, }}>

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={()=>this._navigateTo('EditOrder')}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                      onPress={()=>this.CallDialogBox()}>
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

    renderSheet = () => {
        // console.log('invoice image', this.state.imageUrl)
        // console.log('product data for Edit',this.state.pData.name)
        // console.log('product id',this.state.pId)
        return (

            <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <TouchableOpacity style={{ paddingVertical: 5, paddingLeft: 10, }}
                        onPress={() => this.downloadImage()}
                    >
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
        const { Product, History } = this.state;
        const { SearchValue } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
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
                            renderItem={this.renderOrderList}
                            numColumns={1}
                            horizontal={false}
                        />
                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                            dialogAnimation={new SlideAnimation({
                                slideFrom:'right' ,
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
                                    color:'white',
                                    fontSize:RFValue(16),
                                    fontStyle:'normal',
                                    fontWeight:'700',
                                    fontFamily:'Poppins'  
                                }}
                                title="Delete " 
                                style={{ backgroundColor:buttonBGcolor,color:'white' }} />
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
            </Drawer>
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
    SearchView: {
        width: ScreenWidth * 0.97,
        //paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
    },
    invoiceStyle: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        color: 'green'
    },
    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
    },
    imgView: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: ScreenWidth * 0.98,
        height: ScreenHeight * 0.8

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
        fontStyle:'italic',
        fontWeight:'bold'
    },
    DialogOK_CancelButton:{ 
        color:TextColor,
        fontSize:RFValue(12),
        fontStyle:'normal',
        fontWeight:'bold',
        fontFamily:'Poppins'
     }
})