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
import { BGColor, CountColor, TextColor, forgetpass, buttonBGcolor } from '../Constants/colors'
import _Header from '../Components/Common/AppHeader';
import Text_Input from '../Components/Common/inputField';
import _Button from '../Components/Common/_Button';
import { RFValue } from 'react-native-responsive-fontsize';
const { width: ScreenWidth ,height:ScreenHeight } = Dimensions.get('window');
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }
    _OnPress = (routeName) => {
        this.props.navigation.navigate(routeName)
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} >
                    <_Header
                        HeadingText={'Forget Password'}
                        ImageLeftIcon={'keyboard-backspace'}
                        LeftPress={() => this._OnPress('Login')}
                    />
                <View style={styles.container}>
                    {/* <StatusBar backgroundColor={COLOR_STATUSBAR}></StatusBar> */}
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-end',paddingLeft:15 }}>
                            <Text style={styles.companyName}>Forget your Password</Text>
                        </View>

                        <View style={{ flex: 7, marginHorizontal: 15, }}>
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
                           

                           

                            <View style={styles.ButtonView}>
                                <_Button
                                    textButton={'RESET'}
                                    // onPress={() => this._OnPress('AppNavigator')}
                                    styles={{ width: ScreenWidth * 0.9 }}
                                >
                                </_Button>
                            </View>
                            

                        </View>
                      
                    </View>
                </View>
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create({
    container:{
        height:ScreenHeight*1,      
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
       }
})

