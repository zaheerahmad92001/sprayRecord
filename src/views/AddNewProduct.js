import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _Header from '../Components/Common/AppHeader';
import { Drawer, Container, Content } from 'native-base';
import Sidebar from '../Components/sidebar/menu';
import Text_Input from '../Components/Common/inputField';
import _Button from '../Components/Common/_Button';

import { CountColor, BGColor, TextColor, borderColor } from '../Constants/colors';
import { TextFont_Search, HeadingFont } from '../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      ProductName: '',
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }
  openDrawer = () => {
    this.drawer && this.drawer._root && this.drawer._root.open();
    //this.drawer._root.open()
};
closeDrawer = () => {
  this.drawer && this.drawer._root && this.drawer._root.close();
   // this.drawer._root.close()
};

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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  _save = () => {
    alert('save')
  }

  render() {
    return (
      <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation} drawerClose ={this.closeDrawer} />}
        navigation={this.props.navigation}
        onClose={() => this.closeDrawer()}
        panOpenMask={0.2}
        tapToClose={true}
        negotiatePan={true} >
        <Container style={styles.container}>
          <_Header
            ImageLeftIcon={'menu'}
            LeftPress={() => this.openDrawer()}
            HeadingText={'Add New Product'} />
            <Content>
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={this.selectPhotoTapped.bind(this)}>
              {this.state.avatarSource === null ? (
                <Text>Select a Photo</Text>
              ) : (
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                )}
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 15, marginTop: 20 }}>

            <Text style={styles.Heading}> Product Name</Text>

            <View style={{ marginTop: 8 }}>
              <Text_Input
                placeholder={'Name'}
                autoCapitalize={true}
                onChangeText={(value) => this.setState({ ProductName: value })}
                value={this.state.ProductName}
              />
            </View>
            <View style={{marginTop:20}}>
              <_Button
                textButton={'Save'}
                onPress={() => this._save()}
              />
            </View>
          </View>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
    backgroundColor: BGColor
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 75
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  Heading:{
    paddingHorizontal:5,
    color:TextColor,
    fontSize:RFValue(12),
    fontFamily:'Poppins',
    fontWeight:'500',   
}
});