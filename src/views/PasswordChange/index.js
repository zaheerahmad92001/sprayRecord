import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { Container, Content } from 'native-base';
import styles from './styles';
import {Input,Icon,Item}from 'native-base';
import { MenuTextColor } from '../../Constants/colors';
import _Button from '../../Components/Common/_Button';
import AuthModal from '../../../Utils/modal/Auth';
export default class Changepassword extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPass:'',
            newPass:'',
            confirmPass:'',
            currentPassSecure:true,
            newPassSecure:true,
            confirmPassSecure:true,
            isUploading:false,
            errorMsg:'',
        }
    }
    goBack=()=>{
       this.props.navigation.navigate('Settings') 
    }
    saveInfo=()=>{
        const {currentPass,newPass,confirmPass} = this.state;
        if(currentPass && currentPass.length>=6){
            if(newPass && newPass.length>=6){
                if(newPass===confirmPass && confirmPass &&confirmPass.length){
        ////////////////////////////////////////////////////////////////////////////////////////////
        AuthModal.PasswordChange(currentPass,newPass,confirmPass).then(
            (res)=>{
                if(res.success){
                   // alert('success')
                    this.setState({
                        currentPass:'',
                        newPass:'',confirmPass:''
                    })
                    ToastAndroid.show('Password changed',ToastAndroid.SHORT)
                }else{
                    alert('server error')
                    console.log('server error',res)
                }
            },(error)=>{
                alert('request fail')
                console.log('request fail',error)
            }
        )
        ////////////////////////////////////////////////////////////////////////////////////////////
                    this.setState({errorMsg:''})
                }else{
                    this.setState({errorMsg:'Password not matched'})    
                }
            }else{
                this.setState({errorMsg:'Password has 6 or more character'})
            }
        }else{
            this.setState({errorMsg:'Invalid Current Password'})
        }
    }
    render(){
        const {isUploading,errorMsg} = this.state;
        return(
            <Container style={styles.container}>
               <_Header
                ImageLeftIcon={'keyboard-backspace'}
                LeftPress={() => this.goBack()}
                HeadingText={'Change Password'} />
                
                <Content style={styles.content} showsVerticalScrollIndicator={false}>
                    <Text style={styles.Heading}>Current Password</Text>
                    <View style={styles.Input}>
                                <Item
                                    style={styles.item}>
                                    <Input
                                        placeholder="Password"
                                        placeholderTextColor='#979797'
                                        onChangeText={(value) => this.setState({ currentPass: value,errorMsg:'' })}
                                        value={this.state.currentPass}
                                        autoCapitalize={'none'}
                                        secureTextEntry={this.state.currentPassSecure}
                                    />
                                   
                                    {this.state.currentPassSecure ?
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye-off'}
                                            onPress={() => this.setState({ currentPassSecure: false })}
                                        /> :
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye'}
                                            onPress={() => this.setState({ currentPassSecure: true })} />
                                    }
                                </Item>
                            </View>
                            <Text style={styles.Heading}>New Password</Text>
                    <View style={styles.Input}>
                                <Item
                                    style={styles.item}>
                                    <Input
                                        placeholder="Password"
                                        placeholderTextColor='#979797'
                                        onChangeText={(value) => this.setState({ newPass: value,errorMsg:'' })}
                                        value={this.state.newPass}
                                        autoCapitalize={'none'}
                                        secureTextEntry={this.state.newPassSecure}
                                    />
                                   
                                    {this.state.newPassSecure ?
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye-off'}
                                            onPress={() => this.setState({ newPassSecure: false })}
                                        /> :
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye'}
                                            onPress={() => this.setState({ newPass: true })} />
                                    }
                                </Item>
                            </View>
                            <Text style={styles.Heading}>Confirm Password</Text>
                    <View style={styles.Input}>
                                <Item
                                    style={styles.item}>
                                    <Input
                                        placeholder="Password"
                                        placeholderTextColor='#979797'
                                        onChangeText={(value) => this.setState({ confirmPass: value,errorMsg:'' })}
                                        value={this.state.confirmPass}
                                        autoCapitalize={'none'}
                                        secureTextEntry={this.state.confirmPassSecure}
                                    />
                                   
                                    {this.state.confirmPassSecure ?
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye-off'}
                                            onPress={() => this.setState({ confirmPassSecure: false })}
                                        /> :
                                        <Icon
                                            style={styles.IconStyle}
                                            name={'ios-eye'}
                                            onPress={() => this.setState({ confirmPassSecure: true })} />
                                    }
                                </Item>
                            </View>
                            <Text style={styles.errorText}>{errorMsg}</Text>
                            <View style={styles.ButtonView}>
                                { isUploading ?
                               <ActivityIndicator
                               color={MenuTextColor}
                               size={'large'}
                               /> :   
                                <_Button
                                    textButton={'Save'}
                                    onPress={() => this.saveInfo()}>
                                </_Button> }
                            </View>
                </Content>
            </Container>
        )
    }
}