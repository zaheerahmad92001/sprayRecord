import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Picker,
  Keyboard
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Content, Drawer, Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { TextFont_Search, HeadingFont } from '../../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../Components/Common/_Button';
import { CountColor, RED, TextColor, borderColor, buttonBGcolor } from '../../Constants/colors';
import { Validate, ValidateNumber, ValidateDecimalNumber, ValidateBatchNo } from '../../RandFunction';
import List from '../../views/order/list';
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
    { Id: 1, qty: 22, name: 'abc' },
    { Id: 2, qty: 22, name: 'abc' },
    { Id: 3, qty: 22, name: 'def' },
    { Id: 4, qty: 22, name: 'ghi' },
    { Id: 5, qty: 22, name: 'jkl' },
    { Id: 10, qty: 22, name: 'adc' },
  ]
export default class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchValue: '',
      qty: '', batch_no: '', weight: '', weightUnit: '', orderPrice: '',
      // date: currentDate,
      avatarSource: null,
      matchedproduct: myProduct,
      date: new Date(),
      isDatePickerVisible: false,
      enabled: false, nextStep: 0,
      errorMsg: '', errorMsg2: '', itemKey: '',
      productArray: [], visible: false,
    }
  }
  findProduct(query) {
    if (query === '') {
      return [];
    }

    const { matchedproduct } = this.state;
    const regex = new RegExp([query.trim()], 'i');
    return matchedproduct.filter((product) => product.name.search(regex) >= 0);
  };

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
    this.state.productArray.splice(itemKey, 1)
    this.setState({ productArray: this.state.productArray })

  }

  selectPhotoTapped() {
    const options = {
      title: 'Select Picture',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  showDateTimePicker = (from) => {
    this.setState({ isDateTimePickerVisible: true });
  };
  handleDatePicked = date => {
    //let dateText = this.convertDateTimeToString(date)
    this.setState({ date: date });
    this.hideDateTimePicker();

  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  openDate(start) {
    this.showDateTimePicker(start);
  }

  render1 = () => {
    const { date, batch_no, orderPrice } = this.state;
    if (ValidateNumber(orderPrice)) {
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
    const { SearchValue, qty, weight, weightUnit, } = this.state;
    if (Validate(SearchValue)) {
      if (ValidateNumber(qty)) {
        if (weightUnit && weightUnit.length && ValidateDecimalNumber(weight)) {
          this.state.productArray.push({
            name: SearchValue,
            qty: qty,
            weight: weight,
            unit: weightUnit
          })
          this.setState({ productArray: this.state.productArray })
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
    const { SearchValue, date, qty, batch_no, weight, weightUnit, orderPrice, productArray } = this.state;
    console.log('array length', productArray.length)
    let productWeight = weight + weightUnit;
    if (productArray.length >= 1) {
      let data = {
        productArray,
        batch_no,
        date,
        orderPrice
      }
      console.log('data', data)
      alert('ok')
    } else {
      this.setState({ errorMsg2: 'Enter Product first' })
    }
  }


  render() {
    let products = this.state.productArray.map((val, key) => {
      return <List
        key={key}
        keyVal={key}
        val={val}
        deleteProduct={() => this.deleteProduct(key)}
      ></List>
    })
    console.log('new array', this.state.productArray)
    const { SearchValue, date, errorMsg, errorMsg2, orderPrice, nextStep } = this.state;
    const matchedproduct = this.findProduct(SearchValue);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
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
                    onChangeText={(value) => this.setState({ orderPrice: value, errorMsg: '' })}
                    value={orderPrice}
                    keyboardType={'number-pad'}
                  />
                </View>

                <Text style={styles.Heading}>Batch No</Text>
                <View style={styles.Input}>
                  <Text_Input
                    placeholder={'Batch No'}
                    onChangeText={(value) => this.setState({ batch_no: value, errorMsg: '' })}
                    value={this.state.batch_no}
                  />
                </View>
                <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
                <TouchableOpacity style={styles.startDContainer} onPress={() => this.openDate(true)}>
                  <View>
                    <Text style={styles.startDInput}>
                      {this.state.date.toString().slice(3, 16)}
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
                  date={date}
                />
              </View>
              :
              <View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={[styles.Heading, { marginBottom: 10 }]}>Product Name</Text>
                  <Autocomplete
                    style={styles.AutocompleteStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputContainerStyle={{ borderWidth: 0, color: 'red' }}
                    data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].name) ? [] : matchedproduct}
                    defaultValue={SearchValue}
                    onChangeText={(text) => this.setState({ SearchValue: text, errorMsg2: '' })}
                    placeholder="Product Name "
                    placeholderTextColor={'#979797'}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => this.setState({ SearchValue: item.name })}>
                        <Text style={styles.itemText}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}>
                  </Autocomplete>
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
                    keyboardType={'numeric'}
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
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              {nextStep === 0 ?
                <_Button
                  styles={{ width: ScreenWidth * 0.3 }}
                  IconNmae={'arrow-right'}
                  textButton={'NEXT'}
                  onPress={() => this.render1()} /> :

                <_Button
                  textButton={'SAVE'}
                  onPress={() => this.saveInfo()} />
              }

            </View>
            {nextStep === 1 ?
              <View>
                {products}
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
const styles = StyleSheet.create({
  container: {
    height: ScreenHeight
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,

  },
  AutocompleteStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    // borderRadius: 10,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: borderColor,
    paddingHorizontal: 15,
    //color:'green'
    // marginHorizontal: 10,


  },
  Heading: {
    paddingHorizontal: 5,
    color: TextColor,
    fontSize: RFValue(14),
    fontFamily: 'Poppins',
    fontWeight: '500',

  },
  Input: {
    paddingVertical: 10
  },

  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(180),
    height: RFValue(180),
    borderRadius: RFValue(90)
  },
  avatar: {
    borderRadius: RFValue(90),
    width: RFValue(180),
    height: RFValue(180),
  },
  startDInput: {
    fontFamily: 'Poppins',
    fontSize: RFValue(16),
    width: '100%',
    color: 'black',
    fontSize: RFValue(16),
    backgroundColor: 'white',
    // paddingTop:10,
    // paddingLeft:10,
    // marginBottom:10,
  },
  startDContainer: {
    backgroundColor: 'white',
    borderColor: borderColor,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal:0,
    marginBottom: 5
  },
  errorText: {
    //marginBottom: 10,
    color: RED,
    fontFamily: 'Poppins',
    fontSize: RFValue(14),
    fontWeight: '500',
    fontStyle: 'normal',
  },
  RsText: {
    borderColor: borderColor,
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    borderTopLeftRadius: 10,
    borderRightWidth: 0,
    color: '#979797',
    alignSelf: 'center'
  },
  Nextbutton: {
    flexDirection: 'row',
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(40 / 2),
    backgroundColor: buttonBGcolor,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 5

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