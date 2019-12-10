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
import _Header from '../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import Text_Input from '../Components/Common/inputField';
import { CountColor, BGColor, TextColor,borderColor } from '../Constants/colors';
import { Container, Content ,Drawer } from 'native-base';
import Sidebar from '../Components/sidebar/menu';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import _Button from '../Components/Common/_Button';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

if (month <= 9 && date <= 9) {
    var currentDate = year + '-' + '0' + month + '-' + '0'+ date;
} else if(month > 9 && date <= 9) {
    var currentDate = year + '-' + month + '-' + '0'+ date;
} else if (month <= 9 && date > 9){
    var currentDate = year + '-' + '0'+ month + '-' + date;
    
} else {
    var currentDate = year + '-' +  month + '-' + date;
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

export default class DailySale extends Component{

    constructor(props) {
        super(props);
        this.state = {
            SearchValue: '',
            qty:'',
            date:currentDate,
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
       // this.drawer._root.close()
    };
    _Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    _save = () => {
        alert('save')
      }

    render(){
        const { SearchValue } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return(
        <Drawer ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
        navigation={this.props.navigation}
        onClose={() => this.closeDrawer()}
        panOpenMask={0.2}
        tapToClose={true}
        negotiatePan={true} >
            <Container style={styles.container}>
                <_Header
                     ImageLeftIcon={'menu'}
                     LeftPress={() => this.openDrawer()}
                    HeadingText={'Daily Sale'} />
                <Content style={styles.content}>
                    <View style={{ marginBottom: 10 }}>
                         <Text style={[styles.Heading],{marginBottom:10}}>
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
                    <Text style={styles.Heading}>
                        Qty
                    </Text>
                    <View style={styles.Input}>
                        <Text_Input
                            placeholder={'Quantity'}
                            onChangeText={(value) => this.setState({ qty: value })}
                            value={this.state.qty}
                            keyboardType={'number-pad'}
                        />
                    </View>
                   
                    <Text style={[styles.Heading,{marginBottom:10}]}>
                        Select Date
                    </Text>
                        <DatePicker
                         style={{width:ScreenWidth*0.9,
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
                             right: -10,
                             top: 4,
                             marginRight: 0,
                            
                           },
                           dateInput: {
                             marginRight: 36,
                             borderRadius:10,
                             borderColor:borderColor,
                             
                           }
    
                         }}
                         onDateChange={(date) => {this.setState({date: date})}}
                       />
                        <View style={{marginTop:10,marginBottom:20}}>
              <_Button
                textButton={'Save'}
                onPress={() => this._save()}
              />
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
        flex:1,
        paddingVertical:40
        
    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: borderColor,
        paddingHorizontal: 15,
        //color:'green'
        // marginHorizontal: 10,


    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(12),
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