import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { BGColor, RED, TextColor, forgetpass, buttonBGcolor } from '../../Constants/colors'
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import _Button from '../../Components/Common/_Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { Validate, ValidateEmail } from '../../RandFunction';
import { Container, Content } from 'native-base';
const { width: ScreenWidth ,height:ScreenHeight } = Dimensions.get('window');
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errorMsg:'',
        }
    }
    goBack =()=>{
        this.props.navigation.pop()
    }
    saveInfo =()=>{
        const { email} = this.state;
        if(email && email.length && ValidateEmail(email)){
           this.setState({errorMsg:''})
           alert(email)
        }else{
            this.setState({errorMsg:'Enter valid email'})
        }
    }

    render() {
        const {errorMsg} = this.state;
        return (
            <Container  >
                    <_Header
                        HeadingText={'Forget Password'}
                        ImageLeftIcon={'keyboard-backspace'}
                        LeftPress={() => this.goBack('Login')}
                    />
                <Content  contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
                    {/* <StatusBar backgroundColor={COLOR_STATUSBAR}></StatusBar> */}
                    {/* <View style={{ flex: 1 }}> */}
                        <View style={{ height:ScreenHeight*0.3, alignItems: 'flex-start', justifyContent: 'flex-end',paddingLeft:15 }}>
                            <Text style={styles.companyName}>Forget your Password</Text>
                        </View>

                        <View style={{height:ScreenHeight*0.5, marginHorizontal: 10, }}>
                            <Text style={[styles.Heading, { marginTop: 15 }]}>EMAIL</Text>
                                
                            <View style={{ marginBottom: 10 }}>
                                <Text_Input
                                    placeholder={'EMAIL'}
                                    autoCapitalize={false}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    value={this.state.email}
                                />
                            </View>
                            <View style={{paddingBottom:10}}>
                            <Text style={{ fontSize: RFValue(12), color: 'grey', fontFamily:'Poppins' }}>
                                Enter your email address and we'll send you a link to change your password</Text>
                                </View>
                           

                            <Text style={styles.errorText}>{errorMsg}</Text>

                            <View style={styles.ButtonView}>
                                <_Button
                                    textButton={'RESET'}
                                     onPress={() => this.saveInfo()}
                                    styles={{ width: ScreenWidth * 0.9 }}
                                >
                                </_Button>
                            </View>
                            

                        </View>
                      
                    {/* </View> */}
                </Content>
            </Container>

        )
    }
}
const styles = StyleSheet.create({
    container:{
        //height:ScreenHeight*1,    
        //flex:1,  
        backgroundColor:'#FFFFFF'
    },
    Heading:{
        
        color:TextColor,
        fontSize:RFValue(12),
        fontFamily:'Poppins',
        fontWeight:'700',
        marginLeft:5,
        marginBottom:10
        
    },
    companyName:{
       
        color:'grey',
        fontSize:RFValue(16),
        fontFamily:'Poppins',
        fontWeight:'bold',
       
        
    },
    Forget:{
        alignSelf:'center',
        paddingVertical:5,
        marginTop:20,
    },
    ForgetPassword:{
        color:TextColor,
        fontSize:RFValue(14),
        fontFamily:'Poppins',
        fontStyle:'normal',
        fontWeight:'600'
       },
       SignUp:{
        alignSelf:'center',
        paddingVertical:5,
        marginTop:15,
        flexDirection:"row",
       },

       errorText: {
        marginTop:5,
        marginBottom:10,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
      },
})

