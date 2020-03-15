import React, { Component } from 'react';
import {
  View,Text,Dimensions,Image,
  TouchableOpacity,Picker,Keyboard, ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import { Container, Content, Drawer, Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../Components/Common/_Button';
import styles from '../order/styles';
import { buttonBGcolor, BBCOLOR, TextColor } from '../../Constants/colors';
import { Validate, ValidateNumber, ValidateDecimalNumber, convertDateToString } from '../../RandFunction';
import _DisabledButton from '../../Components/Common/DisabledButton';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import List from '../../views/order/list';
import RNPickerSelect from 'react-native-picker-select';
import Dialog, { DialogTitle, DialogContent, SlideAnimation, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import OrderModal from '../../../Utils/modal/order';
import ProuductModal from '../../../Utils/modal/Product';

export default class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchValue: '',
      qty: '', batch_no: '', weight: '', weightUnit: '', price: '',
      avatarSource: null,invoice:null,
      date: '',
      order_date:'',
      isDatePickerVisible: false,
      enabled: false, nextStep: 0,
      errorMsg: '', errorMsg2: '', itemKey: '',
      products: [], visible: false,
      buttonDisabled: true, product_id: "None", mapOnce: true,
      populate: [],productsList:[],productTitle:'',tempProducts:[],
    }
  }
  
  componentDidMount(){
    ProuductModal.ProductListing().then(
      (res)=>{
          if(res.success){
              this.setState({
                productsList:res.data.collection,
              })
          }else{
              alert('server error')
              console.log('NewOrder server error',res)
          }
      },(error)=>{
          alert('fail')
          console.log('NewOrder error',error)
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

  goBack = () => {
    this.setState({ nextStep: 0 })
  }
  CallDialogBox = (key) => {
    this.setState({ visible: true, itemKey: key })
  }
  CancelDialog = () => {
    this.setState({ visible: false });
  }
  Delete = () => {
    const { itemKey } = this.state
    this.CancelDialog()
    this.state.products.splice(itemKey, 1)
    this.state.tempProducts.splice(itemKey, 1)
    this.setState({ products: this.state.products ,tempProducts:this.state.tempProducts })

  }

  selectPhotoTapped() {
    const options = {
      title: 'Select Picture',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'image',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({avatarSource: source});  
        this.UploadImage(response) 
      }
    });
  };

  UploadImage =(response)=>{
    var formdata = new FormData();
    formdata.append("image",{uri: response.uri, type:response.type, name:response.fileName})
   // console.log('test',formdata)
  // console.log('typeeeeeee',response.type)

    OrderModal.imageUpload(formdata).then(
      (res)=>{
        if(res.success){
         this.setState({
          invoice:res.data.collection.image
         })
          alert('success')
        }else{
          alert('server error')
          console.log('server error',res)
        }
      },(error)=>{
        alert('fail')
        console.log('request fail',error)
      }
    )}
    PickerValue=(value)=>{
      const scope = this;
      const {productsList} = this.state;
      productsList.map((product)=>{
        if(value===product.id){
          // console.log('product id',product.title)
          this.setState({product_id: value,productTitle:product.title, errorMsg2:''})
        }
      })
     
    } 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  handleDatePicked = date => {
    var DateTime = new Date(date).getTime();
    let aa = new Date(DateTime);
    date = convertDateToString(aa)
    this.setState({ date,order_date:DateTime/1000  });
    this.hideDateTimePicker();
    console.log('date want to show',date,'date send to server', DateTime)
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  render1 = () => {
    const { order_date, batch_no, price } = this.state;
    if (ValidateNumber(price)) {
      if (batch_no && batch_no.length) {
        this.setState({ nextStep: 1 })
      } else {
        this.setState({ errorMsg: 'Enter batch number without space ', })
      }
    } else {
      this.setState({ errorMsg: 'Enter payment in digits ' })
    }

  }

  AddMoreProduct = () => {
    const { product_id, qty, weight, weightUnit, products ,tempProducts,productTitle } = this.state;
      if(product_id!='' && product_id!='None'){
      if (ValidateNumber(qty)) {
        if (weightUnit && weightUnit.length && ValidateDecimalNumber(weight)) {
          products.push({
            product_id: product_id,
            quantity: qty,
            weight: weight,
            weight_unit: weightUnit
          })
          tempProducts.push({
            title:productTitle ,
            quantity: qty,
            weight: weight,
            weight_unit: weightUnit
          })
          this.setState({ products: this.state.products, tempProducts:this.state.tempProducts , buttonDisabled: false })
        } else {
          this.setState({ errorMsg2: 'Enter weight in KG ,ML or gram without space and special character  ' })
        }
      } else {
        this.setState({ errorMsg2: 'Enter quantity without space and special character' })
      }
    } else {
      this.setState({ errorMsg2: 'Enter product name' })
    }
  }
  deleteProduct = (keyVal) => {
    // this.state.productArray.splice(keyVal, 1)
    // this.setState({ productArray: this.state.productArray })
    this.CallDialogBox(keyVal)
  }
  
  saveInfo = () => {
    const scope = this;
    let orderNote=''; 
    let orderNo='';
    const {batch_no,invoice,order_date,price,products} = this.state;
    if (products.length >= 1) {
      OrderModal.saveOrder(orderNote,batch_no,invoice,order_date,orderNo,products,price).then(
        (res)=>{
            if(res.success){
              scope.setState({
               batch_no:'',
               invoice:'',
               price:'',
               order_date:'',
               tempProducts:[],
               products:[],
               product_id:'',
               weight:'',
               qty:'',
               weightUnit:'',
               avatarSource:null

             })
             ToastAndroid.show('order saved',ToastAndroid.SHORT)
            }else{
             alert('something went wrong')
             console.log('something went wrong',res)
            }
        },(error)=>{
          alert('network error')
          console.log('network error',error)
        }
      )
    } else {
      this.setState({ errorMsg2: 'Enter Product first' })
    }
  }

  render() {
    const { buttonDisabled,productsList,populate } = this.state;
    console.log('tempProduct',this.state.tempProducts)
    console.log('products',this.state.products)
    // let product = this.state.products.map((val, key) => {
    //   return <List
    //     key={key}
    //     keyVal={key}
    //     val={val}
    //     title={this.state.productTitle}
    //     deleteProduct={() => this.deleteProduct(key)}>
    //     </List>
    // })
    let product = this.state.tempProducts.map((val, key) => {
      return <List
        key={key}
        keyVal={key}
        val={val}
        deleteProduct={() => this.deleteProduct(key)}>
        </List>
    })
    {this.state.mapOnce ?
      productsList.map((value) => {
        this.state.populate.push({
          label: value.title,
          value: value.id
        })
        this.setState({ mapOnce: false })
      }) : null
    }
    const { SearchValue, date, errorMsg, errorMsg2, price, nextStep ,product_id } = this.state;
    const placeholder = {
      label: 'Product Name',
      value: '',
      color: '#979797',
      placeholderTextColor: '#979797',
      fontSize: RFValue(16)
  };
    return (
      <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
        navigation={this.props.navigation}
        onClose={() => this.closeDrawer()}
        panOpenMask={0.2}
        tapToClose={true}
        negotiatePan={true}>
        <Container style={styles.container}>
          <_Header
            ImageLeftIcon={nextStep === 1 ? 'keyboard-backspace' : 'menu'}
            LeftPress={nextStep === 1 ? () => this.goBack() : () => this.openDrawer()}
            HeadingText={'New Order'} />
          <Content style={styles.content}>
            {nextStep === 0 ?
              <View>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                  <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={this.selectPhotoTapped.bind(this)}>
                    {this.state.avatarSource === null ? (
                      <Text>invoice Photo</Text>
                    ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource} />
                      )}
                  </TouchableOpacity>
                </View>

                <Text style={styles.Heading}>Payment</Text>
                <View style={[styles.Input, { flexDirection: 'row' }]}>
                  <Text style={styles.RsText} >Rs.</Text>
                  <Text_Input
                    styles={{ flex: 1, borderLeftWidth: 0, borderTopLeftRadius: 0, paddingLeft: 3 }}
                    onChangeText={(value) => this.setState({ price: value, errorMsg: '' })}
                    value={price}
                    keyboardType={'phone-pad'}
                  />
                </View>

                <Text style={styles.Heading}>Batch No</Text>
                <View style={styles.Input}>
                  <Text_Input
                    placeholder={'Batch No'}
                    onChangeText={(value) => this.setState({ batch_no: value, errorMsg: '' })}
                    value={this.state.batch_no}
                    keyboardType={'default'}
                  />
                </View>
                <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
                <TouchableOpacity style={styles.startDContainer}
                  onPress={() => this.showDateTimePicker()}>
                  <View>
                    <Text style={styles.startDInput}>
                      {/* {this.state.date.toString().slice(3, 16)} */}
                      {!date || !date.length ? 'Select date' : date}
                    </Text>
                  </View>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  is24Hour={false}
                  mode={'date'}
                  datePickerModeAndroid={'spinner'}
                  timePickerModeAndroid={'spinner'}
                />
              </View>
              :
              <View>
                <View style={{marginTop: 10 }}>
                  <Text style={[styles.Heading, { marginBottom: 10 }]}>Product Name</Text>
                  <View style={{ borderWidth: 1, borderColor: BBCOLOR, borderBottomRightRadius: 15, borderTopLeftRadius: 15 }}>
                    <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      placeholder={placeholder}
                      style={{
                        inputAndroid: {
                          fontSize: RFValue(16),
                          paddingHorizontal: 10,
                          borderRadius: 10,
                          color: TextColor,
                        },
                      }}
                    //  onValueChange={(value) => this.setState({ product_id: value, errorMsg2:'' })}
                      onValueChange={(value)=>this.PickerValue(value)}
                      items={this.state.populate}
                      value={product_id}
                      Icon={() => {
                        return <Icon
                          style={{ position: 'absolute', top: Platform.OS === 'ios' ? 5 : 10, right: 10,color:'grey' }}
                          name="md-arrow-dropdown" type={'Ionicons'} />;
                      }} />
                  </View>
                </View>
                <Text style={styles.Heading}>Qty</Text>
                <View style={styles.Input}>
                  <Text_Input
                    placeholder={'Quantity'}
                    onChangeText={(value) => this.setState({ qty: value, errorMsg2: '' })}
                    value={this.state.qty}
                    keyboardType={'number-pad'}
                  />
                </View>
                <Text style={styles.Heading}>Product Weight</Text>
                <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                  <Text_Input
                    styles={{ flex: 0.7 }}
                    placeholder={'Product weight'}
                    onChangeText={(value) => this.setState({ weight: value, errorMsg2: '' })}
                    value={this.state.weight}
                    keyboardType={'number-pad'}
                  />
                  <Picker
                    mode={'dropdown'}
                    enabled={true}
                    selectedValue={this.state.weightUnit}
                    style={{ flex: 0.5 }}
                    onValueChange={(Value, Index) => this.setState({ weightUnit: Value, errorMsg2: '' })}
                  >
                    <Picker.Item label="select Unit..." value="" />
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="ml" value="ml" />
                    <Picker.Item label="gram" value="gram" />
                  </Picker>
                </View>
                <Text style={[styles.errorText, { marginTop: 5 }]}>{errorMsg2}</Text>
                <TouchableOpacity style={styles.Nextbutton}
                  onPress={() => this.AddMoreProduct()}>
                  <Icon
                    name={'add'}
                    type={'MaterialIcons'}
                    style={{ fontSize: 26, color: 'white' }}
                  />
                </TouchableOpacity>
              </View>

            }

            <Text style={styles.errorText}>{errorMsg}</Text>
            <View style={{marginBottom: 10 }}>
              {nextStep === 0 ?
                <_Button
                  styles={{ width: ScreenWidth * 0.3 }}
                  IconNmae={'arrow-right'}
                  textButton={'NEXT'}
                  onPress={() => this.render1()} /> : buttonDisabled ?
                  <_DisabledButton
                    textButton={'SAVE'} /> :
                  <_Button
                    textButton={'SAVE'}
                    onPress={() => this.saveInfo()} />
              }

            </View>
            {nextStep === 1 ?
              <View>
                {product}
              </View>

              : null
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
          </Content>

        </Container>
      </Drawer>

    )
  }
};
