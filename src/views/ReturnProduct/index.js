import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard, Picker, ToastAndroid } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import Autocomplete from 'react-native-autocomplete-input';
import Text_Input from '../../Components/Common/inputField';
import { Container, Content, Drawer, Icon } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import { RFValue } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import _Button from '../../Components/Common/_Button';
import RNPickerSelect from 'react-native-picker-select';
import { ValidateNumber, Validate, ValidateDecimalNumber, convertDateToString } from '../../RandFunction';
import styles from '../ReturnProduct/styles';
import { TextColor, BBCOLOR,borderColor } from '../../Constants/colors';
import ProuductModal from '../../../Utils/modal/Product';
import SaleModal from '../../../Utils/modal/Sale';
let pageNo=0;
export default class ReturnProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: '', isDatePickerVisible: false,
            date: '', return_date:'', errorMsg: '',
            selected: "None", mapOnce: true,
           populate: [],
           products:[], moreProducts: [], productUnit:'',pagination:'',

        }
    }
    componentDidMount(){
        pageNo = 1;
        ProuductModal.ProductListing(pageNo).then(
            (res)=>{
                if(res.success){
                   this.setState({
                       products:res.data.collection,
                       pagination:res.data.pagination,
                   })
                }else{
                    alert('something went wrong');
                    console.log('something went wrong',res)
                }
            },(error)=>{
              alert('network error');
              console.log('network error',error)
            }
        )
    }
    goBack = () => {
        this.props.navigation.pop()
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true,errorMsg:'' });
    };
    handleDatePicked = date => {
        var DateTime = new Date(date).getTime();
        let aa= new  Date(DateTime)
        date = convertDateToString(aa)
        this.setState({ date ,return_date:DateTime/1000 });
        this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    PickerValue=(value)=>{
        const scope = this;
        const {products} = this.state;
        products.map((product)=>{
          if(value===product.id){
             console.log('product unit',product.unit,'product id',product.id)
            this.setState({selected: value, errorMsg: '',productUnit:product.unit})
          }
        })
       
      }
      loadMoreProduct=(pageNo)=>{
        ProuductModal.ProductListing(pageNo).then(
            (res)=>{
                if(res.success){
                   this.setState({
                    moreProducts:res.data.collection,
                    //pagination:res.data.pagination
                   })
                   this.setState({products:this.state.products.concat(this.state.moreProducts),
                  populate:[],
                  mapOnce:true  
                  
                })
                }else{
                    alert('something went wrong');
                    console.log('something went wrong',res)
                }
            },(error)=>{
              alert('network error');
              console.log('network error',error)
            }
        ) 
      }


    saveInfo = () => {
        const { return_date, qty, weight, weightUnit, selected,productUnit } = this.state;
        if (selected != '' && selected != 'None') {
            if (ValidateNumber(qty)) {
                if (weightUnit && weightUnit.length && ValidateDecimalNumber(weight)) {
                    if(weightUnit.toLowerCase()===productUnit.toLowerCase()){
                        if(return_date){
                    this.setState({ errorMsg: '' })
                    this.Create(selected, qty, weight, weightUnit,return_date)
                }else{
                    this.setState({ errorMsg: 'Please select Date' })
                }
            }else{
                    this.setState({ errorMsg: 'Invalid Unit selected' })  
                } 
            }
            else {
                    this.setState({ errorMsg: 'Enter weight in KG, ML or gm  without space and special character' })
                }
            } else {
                this.setState({ errorMsg: 'Enter quantity without space and special character' })
            }
        } else {
            this.setState({ errorMsg: 'Enter product name white no white space in the beginning ' })
        }
    }
//////////////////////////////////////////////////////////////////////////////////
    Create = (id, qty,weight,weightUnit,return_date) => {
        const scope = this;
        SaleModal.ReturnProduct(id,qty,weight,weightUnit,return_date).then(
            (res)=>{
                if(res.success){
                   scope.setState({
                       selected:'None',
                       qty:'',date:'',return_date:'',
                       weight:'',weightUnit:'',
                   })
                   ToastAndroid.show('Product added',ToastAndroid.SHORT)
                }else{
                   alert('server error')
                   console.log('server error',res)
                }
            },(error)=>{
                alert('fail'),
                console.log('reqeust fail',error)
            })
        }
//////////////////////////////////////////////////////////////////////////////////    
    render() {
        const { date, qty, errorMsg,products,selected,pagination,moreProducts } = this.state;
        //console.log('produtct length',products.length)
       // console.log('More products',moreProducts)
      pageNo= pageNo+1;
      if(pageNo<= pagination.last_page){
          console.log('page number',pageNo)
          this.loadMoreProduct(pageNo)
      }
        {
            this.state.mapOnce ?
            products.map((value) => {
                this.state.populate.push({
                    label:  value.title+ '    '+'('+value.weight+value.unit +')',
                    value: value.id
                })
                this.setState({ mapOnce: false })
            }) : null
        }

        
        const placeholder = {
            label: 'Product Name',
            value: '',
            color: '#979797',
            placeholderTextColor: '#979797',
            fontSize: RFValue(16)
        };
        return (
            <Container style={styles.container}>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Add product'} 
                    />
                <Content style={styles.content}>

                    <View style={{ marginBottom: RFValue(10), marginTop: RFValue(35) }}>
                        <Text style={[styles.Heading], { marginBottom: 10 }}>Product Name</Text>
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
                               // onValueChange={(value) => this.setState({ selected: value, errorMsg: '' })}
                               onValueChange={(value)=>this.PickerValue(value)}
                                items={this.state.populate}
                                value={selected}
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
                            placeholderTextColor={'#979797'}
                            onChangeText={(value) => this.setState({ qty: value, errorMsg: '' })}
                            value={qty}
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
                            style={{ flex: 0.5, }}
                            onValueChange={(Value, Index) => this.setState({ weightUnit: Value, errorMsg: '' })}
                        >
                            <Picker.Item label="select Unit..." value="" />
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="ml" value="ml" />
                            <Picker.Item label="gram" value="gram" />
                            <Picker.Item label="liter" value="Liter" />
                        </Picker>
                    </View>

                    <Text style={[styles.Heading, { marginBottom: 10 }]}>Select Date</Text>
                    <TouchableOpacity style={styles.startDContainer}
                        onPress={() => this.showDateTimePicker()}>
                        <View>
                            <Text style={styles.startDInput}>
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
                        timePickerModeAndroid={'spinner'} />
                    <Text style={styles.errorText}>{errorMsg}</Text>
                    <View style={{ marginTop: RFValue(10), marginBottom: 20 }}>
                        <_Button
                            textButton={'Save '}
                            onPress={() => this.saveInfo()}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
};
