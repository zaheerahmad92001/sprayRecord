import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, Picker, AccessibilityInfo, ToastAndroid } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import Text_Input from '../../Components/Common/inputField';
import { Container, Content, Drawer,Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../Components/Common/_Button';
import RNPickerSelect from 'react-native-picker-select';
import { ValidateNumber, Validate, ValidateDecimalNumber, convertDateToString, getDateInUTC ,convertDateToUTC} from '../../RandFunction';
import styles from '../sale/styles';
import { TextColor, BBCOLOR } from '../../Constants/colors';
import SaleModal from '../../../Utils/modal/Sale';
import ProuductModal from '../../../Utils/modal/Product';

// const myProduct =
//     [
//         { Id: 1, qty: 22, name: 'abc' },
//         { Id: 2, qty: 22, name: 'abc' },
//         { Id: 3, qty: 22, name: 'def' },
//         { Id: 4, qty: 22, name: 'ghi' },
//         { Id: 5, qty: 22, name: 'jkl' },
//         { Id: 10, qty: 22, name: 'adc' },
//     ]
export default class DailySale extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // SearchValue: '',
             qty: '',weight:'',weightUnit:'',
             isDatePickerVisible: false,
            date: '',order_date:'',
            errorMsg: '', //matchedproduct: myProduct,
            selected: "None", 
            mapOnce:true,
            populate:[],
            products:[],

        }
    }
    
    // findProduct(query) {
    //     if (query === '') {
    //         return [];
    //     }

    //     const { matchedproduct } = this.state;
    //     const regex = new RegExp([query.trim()], 'i');
    //     return matchedproduct.filter((product) => product.name.search(regex) >= 0);
    // };

    componentDidMount(){
        ProuductModal.ProductListing().then(
            (res)=>{
                if(res.success){
                    this.setState({
                        products:res.data.collection,
                    })
                }else{
                    alert('server error')
                    console.log('DailySale server error',res)
                }
            },(error)=>{
                alert('fail')
                console.log('Daily sale error',error)
            }
        )
    }
    openDrawer = async () => {
        await Keyboard.dismiss()
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)

    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();
    };
    _Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    handleDatePicked = date => {
    var DateTime = new Date(date).getTime();
   // console.log('date in timespan',DateTime);
    let aa= new  Date(DateTime)
    //console.log('converted back',aa);
    date=convertDateToString(aa)
    //console.log('want to show',date);
    this.setState({ date ,order_date:DateTime});
    this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
   

    saveInfo = () => {
        const {order_date, qty, weight, weightUnit ,selected } = this.state;

          if(selected!='' && selected!='None') {
            if (ValidateNumber(qty)) {
                if (weightUnit && weightUnit.length && ValidateDecimalNumber(weight)) {
                    this.setState({ errorMsg: '' })
                    this.Create(selected,qty, weight,weightUnit,order_date)
                } else {
                    this.setState({ errorMsg: 'Enter weight in KG, ML or gm  without space and special character' })
                }
            } else {
                this.setState({ errorMsg: 'Enter quantity without space and special character' })
            }
        } else {
            this.setState({ errorMsg: 'Enter product name white no white space in the beginning ' })
        }
    }

///////////////////////////////////////////////////////////////////////////////////  
    Create = (id,qty,weight,unit,date) => {
        const scope = this;
        SaleModal.sale(id,qty,weight,unit,date).then(
            (res)=>{
                if(res.success){
                    scope.setState({
                        order_date:'',qty:'',date:'',
                        weight:'',weightUnit:'',selected:'None'
                    })
                    ToastAndroid.show('Product Added',ToastAndroid.SHORT)   
                }else{
                    alert('server error'),
                    console.log('Daily sale save errror',res)
                }
            },(error)=>{
              alert('fail'),
            console.log('error',error)
            })
    }
/////////////////////////////////////////////////////////////////////////////////// 
    render() {
        const { date, qty, errorMsg,products,selected  } = this.state;
        //const matchedproduct = this.findProduct(SearchValue);
       // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    
        { this.state.mapOnce ?
        products.map((value)=>{
        this.state.populate.push({
        label:value.title,
        value:value.id
    })
    this.setState({mapOnce:false})
}) : null }

// console.log('populate',this.state.populate)
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
                negotiatePan={true} >
                <Container style={styles.container}>
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => this.openDrawer()}
                        HeadingText={'Daily Sale'} />
                    <Content style={styles.content}>
                        {/* <View style={styles.logo}>
                            <Image
                                source={require('../../assets/image/squadly_logo.png')} />
                        </View> */}


                        <View style={{ marginBottom: RFValue(10), marginTop: RFValue(35) }}>
                            <Text style={[styles.Heading], { marginBottom: 10 }}>Product Name</Text>
                            {/* <Autocomplete
                                style={styles.AutocompleteStyle}
                                autoCapitalize="none"
                                autoCorrect={false}
                                inputContainerStyle={{ borderWidth: 0, color: 'red' }}
                                data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].name) ? [] : matchedproduct}
                                defaultValue={SearchValue}
                                onChangeText={(text) => this.setState({ SearchValue: text, errorMsg: '' })}
                                placeholder="Product Name "
                                placeholderTextColor={'#979797'}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ SearchValue: item.name })}>
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}>
                            </Autocomplete> */}


                           <View style={{borderWidth:1,borderColor:BBCOLOR ,borderBottomRightRadius:15,borderTopLeftRadius:15}}>
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
                                onValueChange={(value) => this.setState({selected: value ,errorMsg:''})}
                                items={this.state.populate}
                                value={this.state.selected}
                                Icon={() => {
                                    return <Icon
                                        style={{position: 'absolute', top: Platform.OS === 'ios' ? 5 : 10, right: 10,color:'grey' }}
                                        name="md-arrow-dropdown" type={'Ionicons'} />;
                                         }} />
                                    </View>
                        </View>
                        <Text style={styles.Heading}>Qty</Text>
                        <View style={styles.Input}>
                            <Text_Input
                                placeholder={'Quantity'}
                                placeholderTextColor={'#979797'}
                                onChangeText={(value) => this.setState({ qty: value, errorMsg: '' })}
                                value={this.state.qty}
                                keyboardType={'number-pad'}
                            />
                        </View>
                        <Text style={styles.Heading}>Product Weight</Text>
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <Text_Input
                                styles={{ flex: 0.7 }}
                                placeholder={'Product weight'}
                                onChangeText={(value) => this.setState({ weight: value, errorMsg: '' })}
                                value={this.state.weight}
                                keyboardType={'numeric'}
                            />
                            <Picker
                                mode={'dropdown'}
                                enabled={true}
                                selectedValue={this.state.weightUnit}
                                style={{ flex: 0.5 }}
                                onValueChange={(Value, Index) => this.setState({ weightUnit: Value, errorMsg: '' })}
                            >
                                <Picker.Item label="select Unit..." value="" />
                                <Picker.Item label="kg" value="kg" />
                                <Picker.Item label="ml" value="ml" />
                                <Picker.Item label="gram" value="gram" />
                            </Picker>
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
                        {/* <DatePicker
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
                       /> */}
                        <Text style={styles.errorText}>{errorMsg}</Text>
                        <View style={{ marginTop: RFValue(10), marginBottom: 20 }}>
                            <_Button
                                textButton={'Save '}
                                onPress={() => this.saveInfo()}
                            />
                        </View>
                    </Content>
                </Container>
            </Drawer>

        )
    }
};
