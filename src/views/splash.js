import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextColor, MenuTextColor } from '../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export default class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const scope = this;
        AsyncStorage.getItem('user').then((value) => {
            USER = JSON.parse(value)
            setTimeout(() => {
                scope.props.navigation.navigate(USER != null ? 'AdminHome' : 'AppNavigator')
                //this.props.navigation.navigate('LandingNavigator')
            }, 2000)
        })
        // setTimeout(() => {
        //     this.props.navigation.navigate('AppNavigator')
        //    //this.props.navigation.navigate('LandingNavigator')
        // }, 2000)
    }

    render() {
        return (

            <ImageBackground
                source={require('../assets/image/Splash.jpg')}
                style={{ width: screenWidth, height: screenHeight }}>
                <StatusBar backgroundColor={MenuTextColor} barStyle="light-content" />
            </ImageBackground>

        )
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})