import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ToastAndroid } from 'react-native';
import { Content, Container, Item, Input, Icon, Toast } from 'native-base';
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import _Button from '../../Components/Common/_Button';
import { Validate, ValidateEmail } from '../../RandFunction';
import styles from '../signUp/styles';
import AuthModal from '../../../Utils/modal/Auth';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureText: true, confirmSecureText: true, phoneNum: '', nextStep: 0,
            fname: '', lname: '', email: '', pass: '', confirmPass: '', errorMsg: '',
            errorMsg1: '',roleId:'5d7b757e7cda7522c4e50a34'
        }
    }
    goBack = () => {
        this.props.navigation.pop()
    }
    changeStep = () => {
        this.setState({
            nextStep: 0
        })
    }
    render1 = () => {
        const { fname, lname, email, } = this.state;
        if (Validate(fname)) {
            if (Validate(lname)) {
                if (email && email.length && ValidateEmail(email)) {
                    this.setState({ nextStep: this.state.nextStep + 1 })
                } else {
                    this.setState({ errorMsg: 'Enter valid email eg @xy.com' });
                }
            } else {
                this.setState({ errorMsg: 'last name  has character and numbers' });
            }
        } else {
            this.setState({ errorMsg: 'first name has character and numbers' });
        }
    }
    saveInfo = () => {
        const { fname, lname, email, pass, confirmPass, phoneNum,roleId } = this.state;
        if (pass && pass.length >= 6) {
            if (pass === confirmPass && confirmPass && confirmPass.length) {
                if (phoneNum && phoneNum.length === 11) {
                    this.setState({ errorMsg: '' })
                    this.CreateAccount(fname,lname, email, pass,confirmPass,phoneNum,roleId)
                } else { this.setState({ errorMsg1: 'Please enter correct phone number' }) }
            } else { this.setState({ errorMsg1: 'Password not matched' }) }
        } else { this.setState({ errorMsg1: 'Passwor has 6 or more character' }) }
    }
//////////////////////////////////////////////////////////////////////////////////////////////
    CreateAccount = (fname,lname,email,pass,confirmPass,phoneNum,roleId) => {
        const scope = this;
        let USERINFO = {}
        AuthModal.SignUp(fname,lname,email,pass,confirmPass,phoneNum,roleId).then(
            (response) => {
                if (response.success) {
                    console.log('Account created', response)
                    ToastAndroid.show('Account created', ToastAndroid.SHORT);
                    USERINFO={
                        token:response.data.collection.authorization,
                        email:email,
                        pass:pass
                    }
                           AsyncStorage.setItem('user',JSON.stringify(USERINFO)).then(
                           ()=>{scope.props.navigation.navigate('AdminHome')}
                           )
                    scope.setState({
                        fname:'',lname:'',email:'',pass:'',
                        confirmPass:'',phoneNum:'',
                    })       
                } else {
                    console.log('server error', response)
                    response.errors.email ?
                    alert('The email has already been taken'):
                    response.errors.phone ?
                    alert('The phone number has already been taken'):null
                }
            }, (error) => {
                console.log(' Sorry Account not created', error)
                alert('resquest fail')
            })
        } 
//////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        const { errorMsg, errorMsg1, nextStep, confirmSecureText } = this.state;
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={nextStep == 0 ? () => this.goBack() : () => this.changeStep()}
                    HeadingText={'SIGN UP'} />

                <View style={styles.imageView}>
                    <Image
                        style={{ height: screenHeight * 0.15, width: screenWidth }}
                        source={require('../../assets/image/logo.jpg')} />
                </View>
                <View style={styles.InputView}>
                    {nextStep === 0 ?
                        <View>
                            <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>First Name</Text>
                                <Text_Input
                                    placeholder={'First Name'}
                                    onChangeText={(value) => this.setState({ fname: value, errorMsg: '' })}
                                    value={this.state.fname}
                                    autoCapitalize={'none'} />
                            </View>
                            <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>Last Name</Text>
                                <Text_Input
                                    placeholder={'Last Name'}
                                    onChangeText={(value) => this.setState({ lname: value, errorMsg: '' })}
                                    value={this.state.lname}
                                    autoCapitalize={'none'} />
                            </View>
                            <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>Email</Text>
                                <Text_Input
                                    placeholder={'Email'}
                                    onChangeText={(value) => this.setState({ email: value, errorMsg: '' })}
                                    value={this.state.email}
                                    autoCapitalize={'none'} />
                            </View>
                        </View> :
                        <View>
                            <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>Password</Text>
                                <View style={styles.Input}>
                                    <Item
                                        style={styles.item}>
                                        <Input
                                            placeholder="Password"
                                            placeholderTextColor='#979797'
                                            onChangeText={(value) => this.setState({ pass: value, errorMsg: '' })}
                                            value={this.state.pass}
                                            autoCapitalize={'none'}
                                            secureTextEntry={this.state.secureText} />
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
                            </View>
                            <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>Confirm Password</Text>
                                <View style={styles.Input}>
                                    <Item
                                        style={styles.item}>
                                        <Input
                                            placeholder="Password"
                                            placeholderTextColor='#979797'
                                            onChangeText={(value) => this.setState({ confirmPass: value, errorMsg: '' })}
                                            value={this.state.confirmPass}
                                            autoCapitalize={'none'}
                                            secureTextEntry={confirmSecureText} />
                                        {confirmSecureText ?
                                            <Icon
                                                style={styles.IconStyle}
                                                name={'ios-eye-off'}
                                                onPress={() => this.setState({ confirmSecureText: false })}
                                            /> :
                                            <Icon
                                                style={styles.IconStyle}
                                                name={'ios-eye'}
                                                onPress={() => this.setState({ confirmSecureText: true })} />
                                        }
                                    </Item>
                                </View>
                            </View>
                            {/* <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>Confirm Password</Text>
                                <Text_Input
                                    placeholder={'Confirm Password'}
                                    onChangeText={(value) => this.setState({ confirmPass: value, errorMsg: '' })}
                                    value={this.state.confirmPass}
                                    autoCapitalize={'none'}
                                    secureTextEntry={true}
                                />
                            </View> */}
                            <View style={styles.TextInputView}>
                                <Text style={styles.Heading}>Phone Number</Text>
                                <Text_Input
                                    placeholder={'Phone Number,'}
                                    onChangeText={(value) => this.setState({ phoneNum: value, errorMsg1: '' })}
                                    value={this.state.phoneNum}
                                    autoCapitalize={'none'}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                        </View>}
                    {nextStep == 0 ?
                        <Text style={styles.errorText}>{errorMsg}</Text> : nextStep == 1 ?
                            <Text style={styles.errorText}>{errorMsg1}</Text> : null
                    }
                    <View style={[styles.ButtonView]}>
                        {nextStep === 0 ?
                            <_Button
                                styles={{ width: screenWidth * 0.3 }}
                                IconNmae={'arrow-right'}
                                textButton={'Next '}
                                onPress={() => this.render1()}>
                            </_Button> :
                            <_Button
                                textButton={'SIGN UP '}
                                onPress={() => this.saveInfo()}>
                            </_Button>
                        }
                    </View>
                </View>

            </ScrollView>
        )
    }
}
