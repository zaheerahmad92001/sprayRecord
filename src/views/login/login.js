import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StatusBar,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import Text_Input from '../../Components/Common/inputField';
import {buttonBGcolor, MenuTextColor} from '../../Constants/colors'
import { Item, Input, Icon, Button, Form, Container, Content } from 'native-base';
import _Button from '../../Components/Common/_Button';
import _Header from '../../Components/Common/AppHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import{ValidateEmail} from '../../RandFunction';
import styles from '../login/styles';
import { requestHandler } from '../../../Utils/requestHandler';
import AuthModal from '../../../Utils/modal/Auth';
import AsyncStorage from '@react-native-community/async-storage';
const {height:screenHeight, width:screenWidth}= Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            email: '',
            pass: '',
            errorMsg:'',
            secureText: true,
            isFetch:false,
        }
    }
    _onPress = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    
    saveInfo =()=>{
    const {email,pass} = this.state
     if(email && email.length && ValidateEmail(email.trim()) ){
        if(pass && pass.length){
             this.setState({errorMsg:'' , isFetch:true})
             this.Create(email,pass)
        }else{ this.setState({errorMsg:'Enter password'}) }
     }else{ this.setState({errorMsg:'Enter valid email'}) }
    }

    Create =(email,pass)=>{
        const scope = this;
         let USERINFO = {}
    //////////////////////////////////////////////////////////    
        AuthModal.Login(email,pass).then(
            (response)=>{
                if(response.success){
                console.log('success',response.success)
                ToastAndroid.show('login success' , ToastAndroid.SHORT);
                
                USERINFO={
                    token:response.data.collection.authorization,
                    firstName:response.data.collection.first_name,
                    lastName:response.data.collection.last_name,
                    email:response.data.collection.email,
                    phone:response.data.collection.phone,
                    // email:email,
                    // pass:pass,

                }
                   AsyncStorage.setItem('user',JSON.stringify(USERINFO)).then(
                       ()=>{scope.props.navigation.navigate('AdminHome')}
                       )
                // AsyncStorage.setItem('token',JSON.stringify(response.data.collection.authorization)).then(()=>{
                //     this.props.navigation.navigate('AdminHome')
                // })
               
            }else{
               alert('Check your Email and password')
               this.setState({
                   isFetch:false
               })
            }
        }, (error)=>{
                console.log('error',error)
                ToastAndroid.show('something went wrong')
            }
        )
   ////////////////////////////////////////////////////////////////     
    }

   
    render() {
        const {errorMsg ,isFetch} = this.state;
        return (
            <Container>
                 <StatusBar backgroundColor={MenuTextColor} barStyle="light-content" />
                <Content style={styles.container}  showsVerticalScrollIndicator={false} >
                    <View style={styles.subcontainer}>
                        <View style={styles.logoStyle}>
                            <Image
                             source={require('../../assets/image/logo.jpg')} 
                             style={{height:screenHeight*0.3,width:screenWidth}}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.Heading}>Email</Text>
                            <View style={styles.Input}>
                                <Text_Input
                                    placeholder={'Email'}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    value={this.state.email}
                                    autoCapitalize={'none'}
                                    // ref={(el)=>this.inputRefs.email=el}
                                    // returnKeyType="next"
                                    // enablesReturnKeyAutomatically
                                    // onSubmitEditing={()=>this.pass.focus()}
                                   
                                    />
                               
                            </View>
                            <Text style={styles.Heading}>Password</Text>
                            <View style={styles.Input}>
                                <Item
                                    style={styles.item}>
                                    <Input
                                        placeholder="Password"
                                        placeholderTextColor='#979797'
                                        onChangeText={(value) => this.setState({ pass: value })}
                                        value={this.state.pass}
                                        autoCapitalize={'none'}
                                        secureTextEntry={this.state.secureText}
                                        // ref={(el) => {this.inputRefs.pass= el}}
                                        // returnKeyType="next"
                                        // enablesReturnKeyAutomatically
                                        // onSubmitEditing={()=>this.email.focus()}
                                        
                                    />
                                   
                                    {this.state.secureText ?
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye-off'}
                                            onPress={() => this.setState({ secureText: false })}
                                        /> :
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye'}
                                            onPress={() => this.setState({ secureText: true })} />
                                    }
                                </Item>
                            </View>
                            <Text style={styles.errorText} >{errorMsg}</Text>
                            <TouchableOpacity
                                style={styles.Forget}
                                onPress={() => this._onPress('ForgetPassword')}>
                                <Text style={styles.ForgetPassword}>Forget Your Password ? </Text>
                            </TouchableOpacity>

                            {/* <Text style={styles.errorText} >{errorMsg}</Text> */}

                            <View style={styles.ButtonView}>
                                { isFetch ?
                                
                               <ActivityIndicator
                               color={MenuTextColor}
                               size={'large'}
                               /> :   
                            
                                <_Button
                                    textButton={'Login '}
                                    onPress={() => this.saveInfo()}>
                                </_Button> }
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingVertical: 5 }}>
                                <TouchableOpacity style={{ flexDirection: 'row' }}
                                    onPress={() => this._onPress('Signup')}>
                                    <Text style={styles.ForgetPassword}>Dont hava any account ? </Text>
                                    <Text style={[styles.ForgetPassword, { color: MenuTextColor }]}>SIGN UP </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Content>
            </Container>
        )
    }
}
