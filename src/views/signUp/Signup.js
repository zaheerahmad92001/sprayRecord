import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';
import { Content, Container, Item, Input, Icon } from 'native-base';
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import { TextColor, RED ,CountColor } from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import _Button from '../../Components/Common/_Button';
import { Validate, ValidateEmail } from '../../RandFunction';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureText: true,
            name: '',
            email: '',
            pass: '',
            confirmPass: '',
            errorMsg: ''
        }
    }
    goBack = () => {
        this.props.navigation.pop()
    }

    saveInfo = () => {
        const { name, email, pass, confirmPass } = this.state;
        if (Validate(name)) {
            if (email && email.length && ValidateEmail(email)) {
                if (pass && pass.length >=6) {
                    if (pass === confirmPass && confirmPass && confirmPass.length) {
                         this.setState({errorMsg:''})
                         this.Create(name,email,pass)
                    }else{ 
                        this.setState({ errorMsg: 'Password not matched' }); }
                } else {
                    this.setState({ errorMsg: 'Passwor has 6 or more character' });
                }
            } else {
                this.setState({ errorMsg: 'Enter valid email eg @xy.com' });
            }
        } else {
            this.setState({ errorMsg: 'User name have character and numbers' });
        }
    }

    Create =(name,email,pass)=>{
        alert('SIGN UP')
    }

    render() {
        const { errorMsg } = this.state;
        return (
            <Container style={styles.container}>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'SIGN UP'} />
                <Content style={styles.content} contentContainerStyle={{ height: screenHeight }} showsVerticalScrollIndicator={false} >
                    <View style={styles.imageView}>
                        <Image
                            style={styles.imgae}
                            source={require('../../assets/image/squadly_logo.png')}
                        />
                    </View>
                    <View style={styles.InputView}>
                        <View style={styles.TextInputView}>
                            <Text style={styles.Heading}>User Name</Text>
                            <Text_Input
                                placeholder={'User Name'}
                                onChangeText={(value) => this.setState({ name: value })}
                                value={this.state.name} 
                                autoCapitalize={'none'}
                                />
                        </View>
                        <View style={styles.TextInputView}>
                            <Text style={styles.Heading}>Email</Text>
                            <Text_Input
                                placeholder={'Email'}
                                onChangeText={(value) => this.setState({ email: value })}
                                value={this.state.email} 
                                autoCapitalize={'none'}/>
                        </View>
                        <View style={styles.TextInputView}>
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
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.Heading}>Confirm Password</Text>
                            <Text_Input
                                placeholder={'Confirm Password'}
                                onChangeText={(value) => this.setState({ confirmPass: value })}
                                value={this.state.confirmPass}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                                />
                        </View>
                        <Text style={styles.errorText}>{errorMsg}</Text>

                        <View style={[styles.ButtonView]}>
                            <_Button
                                textButton={'SIGN UP '}
                                onPress={() => this.saveInfo()}>
                            </_Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        marginHorizontal: 10
    },
    Input: {
        paddingVertical: 10,
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
    imageView: {
        flex: 2,
        //justifyContent: 'center',
        marginTop: 15,
        alignItems: 'center',
    },
    InputView: {
        flex: 8
        // paddingHorizontal: 10,
    },
    TextInputView: {
        marginBottom: 10
    },
    Heading: {
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',
        marginBottom: 5,
    },
    ButtonView: {
        marginTop: 10,

    },
    errorText: {
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
    IconStyle: {
        fontSize: RFValue(25),
        color: CountColor
    },

})