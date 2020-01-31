import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextColor } from '../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export default class Splash extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('AppNavigator')
           //this.props.navigation.navigate('LandingNavigator')
        }, 2000)
    }

    render() {
        return (
            // <SafeAreaView style={styles.Container}>
            //     {/* <View style={{alignItems:'center',justifyContent:'center'}}>
            //     <Text style={{fontSize:RFValue(25),color:TextColor,fontStyle:'normal',fontWeight:'bold'}}>AL Yousaf Spray Center</Text> 
            //     </View> */}
                <ImageBackground
                    source={require('../assets/image/Splash.jpg')} 
                    style={{width:screenWidth, height:screenHeight}}
                    />
            // </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        //height: screenHeight * 1,
        //backgroundColor: '#000000',
        flex:1,
        justifyContent: 'center',
        alignItems: "center"
    }
})