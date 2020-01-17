import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard
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

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.navigation.getParam('pData');

    this.state = {
      avatarSource: null,
      ProductName: this.item.name,
      errorMsg: '',
      buttonDisabled: true,
      multipleFile: [],
    }
    //this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
  openDrawer = async () => {
    await Keyboard.dismiss()
    this.drawer && this.drawer._root && this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer && this.drawer._root && this.drawer._root.close();
  };
  renderImage = ({ item, index }) => {
    return (
      <Image
        style={styles.avatar}
        source={{ uri: item.uri }}
      />
    )
  }
  goBack = () => {
    this.props.navigation.pop();
  }
  // selectPhotoTapped() {
  //   const options = {
  //     title: 'Select Picture',
  //     quality: 1.0,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   ImagePicker.showImagePicker(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled photo picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       let source = { uri: response.uri };
  //       this.setState({
  //         avatarSource: source,
  //         buttonDisabled: false
  //       });
  //     }
  //   });
  // }
  async selectImages() {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      this.setState({ multipleFile: results });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancel Photo')
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  saveInfo = () => {
    const { ProductName, multipleFile } = this.state;
    if (ProductName && ProductName.length) {
      this.setState({ errorMsg: '' })
      this.Create(ProductName, multipleFile)
    } else {
      this.setState({ errorMsg: 'Enter product name' })
    }
  }
  Create = (product, avatar) => {
    alert(product)
  }

  render() {
    const { avatarSource, ProductName, errorMsg ,buttonDisabled,multipleFile } = this.state
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

          <View style={styles.Imagepickerbutton}>
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

              {/* <TouchableOpacity
                style={styles.avatarContainer}
                onPress={this.selectPhotoTapped.bind(this)}>
                {this.state.avatarSource === null ? (
                  <Text>Select a Photo</Text>
                ) : (
                    <Image style={styles.avatar} source={this.state.avatarSource} />
                  )}
              </TouchableOpacity> */}
            </View>
           
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>

              <Text style={styles.Heading}> Product Name</Text>

              <View style={{ marginTop: 10 }}>
                <Text_Input
                  placeholder={'Name'}
                  autoCapitalize={true}
                  onChangeText={(value) => this.setState({ ProductName: value, buttonDisabled: false })}
                  value={this.state.ProductName} />
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

