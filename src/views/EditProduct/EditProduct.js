import React, { Component } from 'react';
import {
  View,Picker,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ToastAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../../Components/Common/AppHeader';
import { Drawer, Container, Content ,Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import Text_Input from '../../Components/Common/inputField';
import _Button from '../../Components/Common/_Button';
import { RFValue } from 'react-native-responsive-fontsize';
import _DisabledButton from '../../Components/Common/DisabledButton';
import DocumentPicker from 'react-native-document-picker';
import styles from '../EditProduct/styles';
import ProuductModal from '../../../Utils/modal/Product';
import OrderModal from '../../../Utils/modal/order';
import { IMAGEURL, ValidateDecimalNumber } from '../../RandFunction';


export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.navigation.getParam('pData');
    this.state = {
      avatarSource: null,
      ProductName: this.item.name,
      errorMsg: '',weight:'',weightUnit:'',
      buttonDisabled: true, ImageFromGallary:false,
      images:[],description:'',temp:'',weightFromDB:true,
      _weight:'',
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
  openDrawer = async () => {
    await Keyboard.dismiss()
    this.drawer && this.drawer._root && this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer && this.drawer._root && this.drawer._root.close();
  };
  componentDidMount(){
    let id  = this.item.id;
    ProuductModal.ProductEdit(id).then(
      (res)=>{
        if(res.success){
        // let _weight = JSON.stringify (res.data.collection.weight)
         this.setState({
          avatarSource: res.data.collection.default_image,
          ProductName:res.data.collection.title,
          description:res.data.collection.short_description,
          errorMsg: '',
          _weight:res.data.collection.weight ,
          weightUnit:res.data.collection.unit,
          temp:res.data.collection.default_image,
         })
        }else{
          alert('server error')
          console.log('server error',res)
        }
      },(error)=>{
         alert('request fail')
         console.log('request fail',error)
      }
    )
  }
  goBack = () => { this.props.navigation.pop(); }
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
        this.setState({avatarSource: source ,ImageFromGallary:true,weightFromDB:true});  
        this.UploadImage(response) 
      }
    });
  };
  UploadImage =(response)=>{
    const {images} = this.state;
    const scope = this;
    var formdata = new FormData();
    formdata.append("image",{uri: response.uri, type:response.type, name:response.fileName,data:response.data})
    OrderModal.imageUpload(formdata).then(
      (res)=>{
        if(res.success){
          // images.push({
          //   url:res.data.collection.image,
          //   isDefault:true
          // })
          scope.setState({temp:res.data.collection.image})
          ToastAndroid.show('Image Uploaded',ToastAndroid.SHORT);
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
  
    saveInfo = () => {
      let qty= 1;
      let id  = this.item.id;
     const scope = this;
     const {description, ProductName, images,weight,weightUnit,temp } = this.state;
     images.push({
      url:temp,
      isDefault:true
     })
     if (ProductName && ProductName.length) {
         if(weightUnit && weightUnit.length && ValidateDecimalNumber(weight)){
            this.setState({ errorMsg: '' })
 /////////////////////////////////////////////////////////////////////////////////
 ProuductModal.ProductEditSave(id,description,ProductName,images,qty,weight,weightUnit)
 .then(
   (res)=>{
     if(res.success){
       this.setState({
         avatarSource:null,
         ProductName:'',
         weight:'',weightUnit:'',description:'',
       })
       ToastAndroid.show('Product Updated',ToastAndroid.SHORT),
       alert('image updated')
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
         this.setState({ errorMsg: 'Enter weight in KG ,ML or gram without space and special character '})
       }
     } else {
       this.setState({ errorMsg: 'Enter product name' })
     }
   }

  render() {
    const { avatarSource, ProductName, errorMsg ,buttonDisabled,images,temp,ImageFromGallary,weight,weightFromDB } = this.state;
    console.log('temp value',temp);
    console.log('images array',images)
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
            HeadingText={'Edit Product'} />
          <Content>

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
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
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
           <View style={{ alignItems: 'center', }}>
                  <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={this.selectPhotoTapped.bind(this)}>
                    {this.state.avatarSource === null ? 
                      <Text>Product Phote</Text>
                     : ImageFromGallary ?
                        <Image style={styles.avatar} source={this.state.avatarSource} />:
                       <Image style={styles.avatar} source={{uri:IMAGEURL+avatarSource}}/>
                      }
                  </TouchableOpacity>
                </View>
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
              <Text style={styles.Heading}> Product Name</Text>
              <View style={{ marginTop: 10 }}>
                <Text_Input
                  placeholder={'Product Name'}
                  autoCapitalize={true}
                  onChangeText={(value) => this.setState({ ProductName: value, buttonDisabled: false })}
                  value={this.state.ProductName} />
              </View>
              <Text style={[styles.Heading],{marginTop:RFValue(10)}}>Product Weight</Text>
                <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                  {weightFromDB  ?
                  <Text_Input
                  styles={{ flex: 0.7 }}
                  placeholder={'Product weight'}
                  onChangeText={(value) => this.setState({weightFromDB:false, errorMsg: '' })}
                  value={JSON.stringify(this.state._weight)}
                  keyboardType={'number-pad'}
                />:
                  <Text_Input
                    styles={{ flex: 0.7 }}
                    placeholder={'Product weight'}
                    onChangeText={(value) => this.setState({ weight: value, errorMsg: '',buttonDisabled:false })}
                    value={weight}
                    keyboardType={'number-pad'}
                  />
                  }
                  <Picker
                    mode={'dropdown'}
                    enabled={true}
                    selectedValue={this.state.weightUnit}
                    style={{ flex: 0.5 }}
                    onValueChange={(Value, Index) => this.setState({ weightUnit: Value, errorMsg: '',buttonDisabled:false })}
                  >
                    <Picker.Item label="select Unit..." value="" />
                    <Picker.Item label="kg" value="KG" />
                    <Picker.Item label="ml" value="ML" />
                    <Picker.Item label="gram" value="Gram" />
                  </Picker>
                </View>
                <Text style={[styles.Heading],{marginTop:RFValue(10)}}>Description</Text>
              <View style={{ marginTop: 10 }}>
              <Text_Input
                placeholder={'Description'}
                onChangeText={(value) => this.setState({ description: value,buttonDisabled:false })}
                value={this.state.description}
                multiline={true}
              />
              </View>
              <Text style={styles.errorText}>{errorMsg}</Text>
              <View style={{ marginTop: RFValue(10) }}>
                {buttonDisabled ?
                  <_DisabledButton
                    textButton={'Save'}
                  /> :
                  <_Button
                    textButton={'Save '}
                    onPress={() => this.saveInfo()}
                  />
                }

              </View>
            </View>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

