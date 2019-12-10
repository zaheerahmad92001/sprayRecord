import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export default class Splash extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('AppNavigator')
        }, 1000)
    }

    render() {
        return (
            <SafeAreaView style={styles.Container}>
                <Image
                   // source={require('../assets/image/squadly_logo.png')} 
                    />
            </SafeAreaView>
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