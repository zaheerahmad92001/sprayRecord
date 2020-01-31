import React, { Component } from 'react';
import {
    View, StatusBar,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground
} from 'react-native';
import { Icon, Col } from 'native-base';
import { AdmingIcon } from '../../Constants/fontsize';
import styles from '../landingpage/styles';
import { StatusColor, ADMIN_BUTTON, MenuTextColor } from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export default class Landing extends Component {

    _OnPress = (rootName) => {
        this.props.navigation.navigate(rootName)
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/image/Splash.jpg')}
                style={{ height: screenHeight, width: screenWidth }}>
                 <StatusBar backgroundColor={MenuTextColor} barStyle="light-content" />
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonStyle}
                            onPress={() => this._OnPress('AuthNavigator')}>
                            <View style={styles.adminButton}>
                                <Icon
                                    style={{ fontSize: RFValue(20), color: MenuTextColor }}
                                    name={'user-tie'}
                                    type={'FontAwesome5'} />
                                <Text style={styles.textStyle}>Admin</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonStyle}
                            onPress={() => this._OnPress('FoHome')}>
                            <View style={styles.adminButton}>
                                <Icon
                                    style={{ fontSize: RFValue(20), color: MenuTextColor }}
                                    name={'user-tie'}
                                    type={'FontAwesome5'} />
                                <Text style={styles.textStyle}>Field Officer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
               
            </ImageBackground>
        )
    }
}
