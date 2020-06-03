import React, { Component } from 'react';
import {
  View,Picker,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../../Components/Common/AppHeader';
import { Drawer, Container, Content, Icon, Thumbnail } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import Text_Input from '../../Components/Common/inputField';
import _Button from '../../Components/Common/_Button';
import { CountColor, RED, TextColor, borderColor, buttonBGcolor } from '../../Constants/colors';
import { TextFont_Search, HeadingFont } from '../../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
import DocumentPicker from 'react-native-document-picker';
import styles from '../Addproduct/styles'
import { ValidateDecimalNumber } from '../../RandFunction';
import OrderModal from '../../../Utils/modal/order';
import ProuductModal from '../../../Utils/modal/Product';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      ProductName: '',description:'',
      errorMsg: '',weight:'',weightUnit:'',
      //multipleFile: [],
      images:[],
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
  openDrawer = async () => {
    await Keyboard.dismiss()
    this.drawer && this.drawer._root && this.drawer._root.open();
    //this.drawer._root.open()
  };
  closeDrawer = () => {
    this.drawer && this.drawer._root && this.drawer._root.close();

  };
  // renderImage = ({ item, index }) => {
  //   return (
  //     <Image
  //       style={styles.avatar}
  //       source={{ uri: item.uri }}
  //     />
  //   )
  // }
  goBack = () => {
    this.props.navigation.pop();
  }
  // async selectImages() {
  //   try {
  //     const results = await DocumentPicker.pickMultiple({
  //       type: [DocumentPicker.types.images],
  //     });
  //     this.setState({ multipleFile: results , });
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancel Photo')
  //     } else {
  //       console.log('Unknown Error: ' + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // }
// uploadImage=()=>{
//   const {multipleFile ,images} = this.state;
//   var i = 0;
//   if(multipleFile.length<=3){
//     while(i<multipleFile.length){
//       var formdata = new FormData();
//       formdata.append('image',{uri:multipleFile[i].uri, type:multipleFile[i].type, name:multipleFile[i].fileName})
//         OrderModal.imageUpload(formdata).then(
//           (res)=>{
//             if(res.success){
//               images.push({
//                 url:res.data.collection.image
//               })
//               console.log('image uplods success',res)
//               i=i+1;
//             }else{
//              alert('server error');
//              console.log('server error',res)
//              i=i+1;
//             }
//           },(error)=>{
//             alert('request fail');
//             console.log('request fail',error)
//           }
//         )
//     }
//   }else{
//    alert('something went wrong')
//   }
// }


selectPhotoTapped() {
  const options = {
    title: 'Product Picture',
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
  const {images} = this.state;
  var formdata = new FormData();
  formdata.append("image",{uri: response.uri, type:response.type, name:response.fileName})
 // console.log('test',formdata)
  OrderModal.imageUpload(formdata).then(
    (res)=>{
      if(res.success){
        images.push({
          url:res.data.collection.image,
          isDefault:true
        })
        ToastAndroid.show('Image Uploaded',ToastAndroid.SHORT);
      }else{
        alert('server error')
        console.log('server error',res)
      }
    },(error)=>{
      alert('network error')
      console.log('network error',error)
    }
  )}

  saveInfo = () => {
     let qty= 0;
    const scope = this;
    const {description, ProductName, images,weight,weightUnit } = this.state;
    if (ProductName && ProductName.length) {
        if(weightUnit && weightUnit.length && ValidateDecimalNumber(weight)){
           this.setState({ errorMsg: '' })
/////////////////////////////////////////////////////////////////////////////////
ProuductModal.ProductSave(description,ProductName,images,qty,weight,weightUnit)
.then(
  (res)=>{
    if(res.success){
      this.setState({
        avatarSource:null,
        ProductName:'',
        weight:'',weightUnit:'',description:'',
      })
      ToastAndroid.show('Product added',ToastAndroid.SHORT)
    }else{
   alert('server error')
   console.log('server error',res)
    }
  },(error)=>{
    alert('fail')
    console.log('request fail',error)
  }
)
/////////////////////////////////////////////////////////////////////////////////

     }else{
        this.setState({ errorMsg: 'Enter weight in KG ,ML,Liter or gram without space and special character '})
      }
    } else {
      this.setState({ errorMsg: 'Enter product name' })
    }
  }
 

  render() {
    const { avatarSource, ProductName, errorMsg, description,weight,weightUnit } = this.state
    //console.log('images array',this.state.images)
    return (
      <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
        navigation={this.props.navigation}
        onClose={() => this.closeDrawer()}
        panOpenMask={0.2}
        tapToClose={true}
        negotiatePan={true} >
        <Container style={styles.container}>
          <_Header
            ImageLeftIcon={'keyboard-backspace'}
            LeftPress={() => this.goBack()}
            HeadingText={'Add New Product'} />
          <Content>

          <View style={{ alignItems: 'center', }}>
                  <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={this.selectPhotoTapped.bind(this)}>
                    {this.state.avatarSource === null ? (
                      <Text>Product Phote</Text>
                    ) : (
                        <Image style={styles.avatar} source={this.state.avatarSource} />
                      )}
                  </TouchableOpacity>
                </View>

            {/* <View style={styles.Imagepickerbutton}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonStyle}
                onPress={this.selectImages.bind(this)}>
                <Text style={{ marginRight: 10, fontSize: RFValue(19) }}>Pick product image</Text>
                <Icon
                  name={'attachment'}
                  type={'MaterialCommunityIcons'}
                  style={{ fontSize: RFValue(26) }}
                />
              </TouchableOpacity>
            </View> */}

            {/* <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
              {multipleFile.length <= 3 ?
                <View style={{
                  justifyContent: 'center', paddingVertical: 10,
                  flexDirection: 'row',
                }}>
                  <FlatList
                   showsHorizontalScrollIndicator={false}
                    data={multipleFile}
                    renderItem={this.renderImage}
                    keyExtractor={(items, index) => 'key' + index}
                    horizontal={true}
                  ></FlatList>
                </View> :

                <Text style={[styles.errorText,{marginHorizontal:15}]} >Maximum 3 images can be selected</Text>}
             


            </View> */}
         
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
              <Text style={styles.Heading}> Product Name</Text>
              <View style={{ marginTop: 10 }}>
                <Text_Input
                  placeholder={'Product Name'}
                  autoCapitalize={true}
                  onChangeText={(value) => this.setState({ ProductName: value })}
                  value={this.state.ProductName} />
              </View>
              <Text style={[styles.Heading],{marginTop:RFValue(10)}}>Product Weight</Text>
                <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                  <Text_Input
                    styles={{ flex: 0.7 }}
                    placeholder={'Product weight'}
                    onChangeText={(value) => this.setState({ weight: value, errorMsg: '' })}
                    value={this.state.weight}
                    keyboardType={'number-pad'}
                  />
                  <Picker
                    mode={'dropdown'}
                    enabled={true}
                    selectedValue={this.state.weightUnit}
                    style={{ flex: 0.5 }}
                    onValueChange={(Value, Index) => this.setState({ weightUnit: Value, errorMsg: '' })}
                  >
                    <Picker.Item label="select Unit..." value="" />
                    <Picker.Item label="kg" value="KG" />
                    <Picker.Item label="ml" value="ML" />
                    <Picker.Item label="gram" value="Gram" />
                    <Picker.Item label="liter" value="Liter"/>
                  </Picker>
                </View>
              <Text style={[styles.Heading],{marginTop:RFValue(10)}}>Description</Text>
              <View style={{ marginTop: 10 }}>
              <Text_Input
                placeholder={'Description'}
                onChangeText={(value) => this.setState({ description: value })}
                value={this.state.description}
                multiline={true}
              />
              </View>
              <Text style={styles.errorText}>{errorMsg}</Text>
              <View style={{ marginTop: RFValue(10) }}>
                <_Button
                  textButton={'Save '}
                  onPress={() => this.saveInfo()}/>
              </View>
            </View>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

