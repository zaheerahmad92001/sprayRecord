import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { Icon } from 'native-base';
import { AdmingIcon } from '../../Constants/fontsize';
import styles from '../landingpage/styles';
export default class Landing extends Component {

    _OnPress = (rootName) => {
        this.props.navigation.navigate(rootName)
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.logoStyle}>
                    <Image
                    // source={require('../assets/image/squadly_logo.png')}
                    />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={{ marginBottom: 10 }}
                        onPress={() => this._OnPress('AuthNavigator')}
                    >
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.buttonstyle} >
                                <Icon
                                    style={{ fontSize: AdmingIcon, }}
                                    name={'user'}
                                    type={'Entypo'} />
                            </View>
                            <View style={styles.AdminTextView}>
                                <Text style={styles.AdminText}>Admin</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => this._OnPress('FoHome')}
                    >
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.buttonstyle} >
                                <Icon
                                    style={{ fontSize: AdmingIcon, }}
                                    name={'user'}
                                    type={'Entypo'}
                                ></Icon>
                            </View>
                            <View style={styles.AdminTextView}>
                                <Text style={styles.AdminText}>Field Officer</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        )
    }
}
