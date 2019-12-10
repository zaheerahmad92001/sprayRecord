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
import Text_Input from '../Components/Common/inputField';
import { BGColor, CountColor, TextColor, forgetpass, buttonBGcolor } from '../Constants/colors'
import { Item, Input, Icon, Button } from 'native-base';
import _Button from '../Components/Common/_Button';
import _Header from '../Components/Common/AppHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            secureText: true
        }
    }
    _onPress = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    Alert =()=>{
        alert('wroking')
    }
    render() {
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
                                <Text
                                    style={styles.ForgetPassword}>
                                    Forget Your Password ?
                             </Text>
                            </TouchableOpacity>
                            <View style={styles.ButtonView}>
                                <_Button
                                    textButton={'LOGIN'}
                                    onPress={() => this._onPress('AdminHome')}>
                                </_Button>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'center',marginTop:10,paddingVertical:5}}>
                                <TouchableOpacity style={{flexDirection:'row'}}>
                                <Text style={styles.ForgetPassword}>Dont hava any account ? </Text>
                                <Text style={[styles.forgetpass,{color:buttonBGcolor}]}>SIGN UP </Text>
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
        backgroundColor: BGColor,
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
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2

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
        fontSize: RFValue(12),
        fontFamily: 'Poppins',
        fontWeight: '500',

    }

})
