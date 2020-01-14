import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import Text_Input from '../../Components/Common/inputField';
import { BGColor, CountColor, TextColor, forgetpass, buttonBGcolor,RED } from '../../Constants/colors'
import { Item, Input, Icon, Button, Form } from 'native-base';
import _Button from '../../Components/Common/_Button';
import _Header from '../../Components/Common/AppHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import{ValidateEmail} from '../../RandFunction';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            errorMsg:'',
            secureText: true
        }
    }
    _onPress = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    saveInfo =()=>{
    const {email,pass} = this.state
     if(email && email.length && ValidateEmail(email) ){
        if(pass && pass.length){
             this.setState({errorMsg:''})
             this.Create(email,pass)
        }else{ this.setState({errorMsg:'Enter password'}) }
     }else{ this.setState({errorMsg:'Enter valid email'}) }
    }

    Create =(email,pass)=>{
     this.props.navigation.navigate('AdminHome')
    }

   
    render() {
        const {errorMsg} = this.state;
        return (

            <ScrollView>
                <View style={styles.container} >
                    <View style={styles.subcontainer}>
                        <View style={styles.logoStyle}>
                            <Image
                            // source={require('../assets/image/squadly_logo.png')} 
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
                                    />
                                    {this.state.secureText ?
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye'}
                                            onPress={() => this.setState({ secureText: false })}
                                        /> :
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye-off'}
                                            onPress={() => this.setState({ secureText: true })} />
                                    }
                                </Item>
                            </View>
                            <TouchableOpacity
                                style={styles.Forget}
                                onPress={() => this._onPress('ForgetPassword')}>
                                <Text style={styles.ForgetPassword}>Forget Your Password ? </Text>
                            </TouchableOpacity>

                            <Text style={styles.errorText} >{errorMsg}</Text>

                            <View style={styles.ButtonView}>
                                <_Button
                                    textButton={'LOGIN '}
                                    onPress={() => this.saveInfo()}>
                                    //onPress={() => this._onPress('AdminHome')}>
                                </_Button>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, paddingVertical: 5 }}>
                                <TouchableOpacity style={{ flexDirection: 'row' }}
                                    onPress={() => this._onPress('Signup')}>
                                    <Text style={styles.ForgetPassword}>Dont hava any account ? </Text>
                                    <Text style={[styles.forgetpass, { color: buttonBGcolor }]}>SIGN UP </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>

        )
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: ScreenHeight,
    },
    subcontainer: {
        flex: 1,
    },
    content: {
        flex: 0.65,
        paddingHorizontal: 15,
    },
    Input: {
        paddingVertical: 10,
    },
    ButtonView: {
        marginTop: 10,

    },
    item: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1

    },
    logoStyle: {
        flex: 0.35,
        justifyContent: "center",
        alignItems: "center",
    },
    IconStyle: {
        fontSize: RFValue(25),
        color: CountColor
    },
    Forget: {
        alignSelf: 'center',
        paddingVertical: 5,
        marginTop: 10,
    },
    ForgetPassword: {
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600'
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',

    },
    errorText: {
       // marginBottom: 10,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
        marginLeft:15,
    },

})
