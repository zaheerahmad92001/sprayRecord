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
import _Header from '../../Components/Common/AppHeader';
import Text_Input from '../../Components/Common/inputField';
import _Button from '../../Components/Common/_Button';
import { RFValue } from 'react-native-responsive-fontsize';
import {ValidateEmail } from '../../RandFunction';
import { Container, Content } from 'native-base';
import styles from '../forgetpassword/styles';
import { MenuTextColor } from '../../Constants/colors';
import AuthModal from '../../../Utils/modal/Auth';
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
 /////////////////////////////////////////////////////////
             AuthModal.ForgetPass(email).then(
                 (response)=>{
                    if(response.success){
                        console.log('response success',response.success)
                        alert('Instructions has been sent to your account')
                    } else{
                        console.log('response server error',response)
                        alert('Server Error')
                    }
                 },(error)=>{
                   console.log('Error forget password',error)
                 }
             )
 ////////////////////////////////////////////////////////            
        }else{
            this.setState({errorMsg:'Enter valid email'})
        }
    }

    render() {
        const {errorMsg} = this.state;
        return (
            <Container>
                  <StatusBar backgroundColor={MenuTextColor}></StatusBar>
                    <_Header
                        HeadingText={'Forget Password'}
                        ImageLeftIcon={'keyboard-backspace'}
                        LeftPress={() => this.goBack('Login')}/>
                <Content  contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
                        <View style={styles.midContainer}>
                            <Text style={styles.companyName}>Forget your Password</Text>
                        </View>

                        <View style={styles.Content}>
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
                                    textButton={'Reset'}
                                     onPress={() => this.saveInfo()}
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


