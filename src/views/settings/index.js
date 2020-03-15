import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import Sidebar from '../../Components/sidebar/menu';
import { Drawer, Container, Content } from 'native-base';
import  Text_Input from '../../Components/Common/inputField';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import _Button from '../../Components/Common/_Button';
import _DisabledButton from '../../Components/Common/DisabledButton';
import { Validate, ValidateEmail } from '../../RandFunction';
import AuthModal from '../../../Utils/modal/Auth';
export default class Settings extends Component {
    constructor(props){
        super(props)
        this.state={
            errorMsg:'',
            fname:'',
            lname:'',
            email:'',
            phoneNum:'',
            DisabledButton:true,
        }
    }
    openDrawer = () => {
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)
    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();        
    };
    _navigate=(routeName)=>{
      this.props.navigation.navigate(routeName)
    }
    saveInfo = () =>{
        const {fname,lname,email,phoneNum} = this.state;
        const scop = this;
        if(Validate(fname)){
           if(Validate(lname)){
            if (email && email.length && ValidateEmail(email)){
                if (phoneNum && phoneNum.length === 11){
///////////////////////////////////////////////////////////////////////////////////////////
        AuthModal.EditProfile(fname,lname,email,phoneNum).then(
            (res)=>{
              if(res.success){
                  ToastAndroid.show('User Info save',ToastAndroid.SHORT)
                USERINFO={
                    token:res.data.collection.authorization,
                    firstName:res.data.collection.first_name,
                    lastName:res.data.collection.last_name,
                    email:res.data.collection.email,
                    phone:res.data.collection.phone,
                }
                AsyncStorage.setItem('user',JSON.stringify(USERINFO)).then(
                    // ()=>{scope.props.navigation.navigate('AdminHome')}
                    )
             scop.setState({DisabledButton:true})
              }else{
                  alert('something went wrong')
                  Console.log('something went wrong',res)
              }
            },(error)=>{
               alert('network error')
               console.log('network error',error)
            }
        )
///////////////////////////////////////////////////////////////////////////////////////////
                }else{
                    this.setState({errorMsg:'Please enter correct phone number'})
                }
            }else{
                this.setState({ errorMsg: 'Enter valid email eg @xy.com' });
            }
           }else{
            this.setState({ errorMsg: 'last name  has character and numbers' });
           }
        }else{
            this.setState({ errorMsg: 'first name has character and numbers' });
        }
    }
    componentDidMount(){
        const scop = this;
     AsyncStorage.getItem('user').then((value)=>{
        let User = JSON.parse(value)
         scop.setState({
             fname:User.firstName,
             lname:User.lastName,
             email:User.email,
             phoneNum:User.phone
         })
        
     })
    }
    render() {
        const {DisabledButton,errorMsg} = this.state;
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
                        HeadingText={'Edit Profile'} />
                        <Content>
                        <View style={styles.content}>
                         <Text style={styles.Heading}>First Name</Text>   
                         <View style={{marginTop:RFValue(10)}}>
                        <Text_Input
                        placeholder={'First Name'}
                        onChangeText={(value)=>this.setState({fname:value,errorMsg:'',DisabledButton:false})}
                        value={this.state.fname}
                        autoCapitalize={'none'}
                        />
                        </View>
                        <View style={{marginTop:RFValue(10)}}>
                          <Text style={[styles.Heading,{marginBottom:RFValue(10)}]}>Last Name</Text>  
                        <Text_Input
                         placeholder={'Last Name'}
                         onChangeText={(value)=>this.setState({lname:value,errorMsg:'',DisabledButton:false})}
                         value={this.state.lname}
                         autoCapitalize={'none'}
                        />
                        </View>
                        <View style={{marginTop:RFValue(10)}}>
                          <Text style={[styles.Heading,{marginBottom:RFValue(10)}]}>Email</Text>  
                        <Text_Input
                         placeholder={'Email'}
                         onChangeText={(value)=>this.setState({email:value,errorMsg:'',DisabledButton:false})}
                         value={this.state.email}
                         autoCapitalize={'none'}
                        />
                        </View>
                        <View style={{marginTop:RFValue(10)}}>
                          <Text style={[styles.Heading,{marginBottom:RFValue(10)}]}>Phone Number</Text>  
                        <Text_Input
                         placeholder={'Phone Number'}
                         onChangeText={(value)=>this.setState({phoneNum:value,errorMsg:'',DisabledButton:false})}
                         value={this.state.phoneNum}
                         keyboardType={'phone-pad'}
                        />
                        </View>
                        <View style={{marginTop:RFValue(20)}}>
                         <TouchableWithoutFeedback
                         onPress={()=>this._navigate('PasswordChange')}
                            style={styles.ChangePassView}>
                             <Text style={styles.changepassText}>Change Password</Text>
                         </TouchableWithoutFeedback>
                         </View>
                         <View style={{marginTop:RFValue(5)}}>
                         <Text style={styles.errorText}>{errorMsg}</Text>
                         </View>
                         <View style={{marginTop:RFValue(10),marginBottom:RFValue(10)}}>
                             {DisabledButton ?
                          <_DisabledButton
                           textButton={'Save'}
                          />:
                        <_Button
                        textButton={'Save'}
                        onPress={()=>this.saveInfo()}
                         />
                             }
                         </View>
                        </View>
                        </Content>
                </Container>
            </Drawer>
        )
    }
}