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
import Text_Input from '../Components/Common/inputField';
import Autocomplete from 'react-native-autocomplete-input';
import { Container, Content, Drawer } from 'native-base';
import Sidebar from '../Components/sidebar/menu';
import { TextFont_Search, HeadingFont } from '../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import _Button from '../Components/Common/_Button';
import { CountColor, BGColor, TextColor, borderColor } from '../Constants/colors';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

if (month <= 9 && date <= 9) {
  var currentDate = year + '-' + '0' + month + '-' + '0' + date;
} else if (month > 9 && date <= 9) {
  var currentDate = year + '-' + month + '-' + '0' + date;
} else if (month <= 9 && date > 9) {
  var currentDate = year + '-' + '0' + month + '-' + date;

} else {
  var currentDate = year + '-' + month + '-' + date;
}


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
      qty: '',
      batch_no: '',
      date: currentDate,
      description:'',
      avatarSource: null,
      matchedproduct: myProduct,
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
    this.drawer && this.drawer._root && this.drawer._root.open();
    //this.drawer._root.open()
  };
  closeDrawer = () => {
    this.drawer && this.drawer._root && this.drawer._root.close();
    //this.drawer._root.close()
  };
  _Navigation = (rootName) => {
    this.props.navigation.navigate(rootName)
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

  _save = () => {
    alert('save')
  }

  render() {
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
        negotiatePan={true}>
        <Container style={styles.container}>
          <_Header
            ImageLeftIcon={'menu'}
            LeftPress={() => this.openDrawer()}
            HeadingText={'New Order'} />
          <Content style={styles.content}>
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
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.Heading, { marginBottom: 10 }]}>
                Product Name
                          </Text>
              <Autocomplete
                style={styles.AutocompleteStyle}
                autoCapitalize="none"
                autoCorrect={false}
                inputContainerStyle={{ borderWidth: 0, color: 'red' }}
                data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].name) ? [] : matchedproduct}
                defaultValue={SearchValue}
                onChangeText={(text) => this.setState({ SearchValue: text })}
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
                onChangeText={(value) => this.setState({ qty: value })}
                value={this.state.qty}
                keyboardType={'number-pad'}
              />
            </View>
            <Text style={styles.Heading}>Batch_No</Text>
            <View style={styles.Input}>
              <Text_Input
                placeholder={'Batch No'}
                onChangeText={(value) => this.setState({ batch_no: value })}
                value={this.state.batch_no}
              />
            </View>

            <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
            <DatePicker
              style={{
                width: ScreenWidth * 0.9,
              }}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1996-01-01"
              maxDate="2096-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: -8,
                  top: 0,
                  marginRight: 0,
                  height:ScreenHeight*0.06,
                  width:ScreenWidth*0.1

                },
                dateInput: {
                  marginRight: 36,
                  borderBottomRightRadius: 15,
                  borderTopLeftRadius: 15,
                  borderWidth:2,
                  borderColor: borderColor,
                  height:ScreenHeight*0.075}
              }}
              onDateChange={(date) => { this.setState({ date: date }) }} />

         <Text style={[styles.Heading,{marginTop:10}]}>Description</Text>
            <View style={styles.Input}>
              <Text_Input
                placeholder={'Description'}
                onChangeText={(value) => this.setState({ description: value })}
                value={this.state.description}
                multiline={true}
              />
            </View>
            <View style={{ marginTop: 25, marginBottom: 20 }}>
              <_Button
                textButton={'Save'}
                onPress={() => this._save()}/>
            </View>

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
    paddingHorizontal: 15,
    flex: 1,

  },
  AutocompleteStyle: {
    backgroundColor: 'transparent',
    borderWidth: 2,
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
    width: 150,
    height: 150,
    borderRadius: 75
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
})