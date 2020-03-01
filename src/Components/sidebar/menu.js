import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { Button,Icon } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from "@react-native-community/async-storage"
import { MenuTextColor } from '../../Constants/colors';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class Sidebar extends Component {

    _onPress = (name) => {
        this.props.navigation.pop()
        this.props.navigation.navigate({ routeName: name })
        this.props.drawerClose();
    }
    _signOut =()=>{
        const scope = this;
        AsyncStorage.removeItem("user").then(()=>{
           scope.props.navigation.navigate('Login')
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.sidebar}>
                <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{width:screenWidth*0.80,height:screenHeight*0.2,//marginTop:RFValue(13)
                    }}
                       source={require('../../assets/image/banner2.jpeg')}
                    />
                    {/* <View style={{ marginVertical: 20 }}></View> */}
                </View>
                <View style={{ flex: 0.65 }}>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('AdminHome')}>
                        <Image
                        style={styles.Icon}
                        source={require('../../assets/image/Home.png')}>
                        </Image>
                        <Text style={styles.Text}>Home</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('DailySale')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/DailySale.png')}>
                        </Image>
                        <Text style={styles.Text}>Sale</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('NewOrder')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/OrderHistory.png')}>
                        </Image>
                        <Text style={styles.Text}>Order</Text>
                    </Button>

                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('ProductList')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/Products.png')}>
                        </Image>
                        <Text style={styles.Text}>Products</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('Orders')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/OrderHistory.png')}>
                        </Image>
                        <Text style={styles.Text}>Order Detail </Text>
                    </Button>

                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('SaleHistory')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/OrderHistory.png')}>
                        </Image>
                        <Text style={styles.Text}>Sale Detail</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('ReturnedProductList')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/Products.png')}>
                        </Image>
                        <Text style={styles.Text}>Return</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('payment')}>
                        <Image
                            style={styles.Icon}
                        source={require('../../assets/image/Payment.png')}>
                        </Image>
                        <Text style={styles.Text}>Payment</Text>
                    </Button>
                    <Button transparent
                        style={[styles.Button,{paddingHorizontal:0}]}
                        onPress={() => this._onPress('Settings')}>
                        {/* <Image
                            style={styles.Icon}
                        source={require('../../assets/image/Payment.png')}>
                        </Image> */}
                        
                        <Icon
                        name={'settings-outline'}
                        type={'MaterialCommunityIcons'}
                        style={{color:MenuTextColor,fontSize:RFValue(28)}}
                        />
                        <Text style={[styles.Text,{paddingLeft:0}]}>Settings</Text>
                    </Button>
                </View>
                <View style={{ flex: 0.1, bottom: 20, }}>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._signOut()}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/Logout.png')}/>
                        <Text style={[styles.Text, { color: '#EB5757' }]}>Signout</Text>
                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    sidebar: {
        flex: 1,
       // marginTop: 25,
        marginTop:RFValue(8),
        backgroundColor: 'white',

    },
    Icon: {
        width: RFValue(32),
        height: RFValue(32),
    },
    Button: {
        width: '100%',
        paddingHorizontal: 20,
       // marginTop: 10,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    Text: {
       // color: '#200F8C',
       color:'#094422',
       //color:'black',
        fontSize: RFValue(15),
        fontStyle:'normal',
        fontWeight:'bold',
        paddingLeft: RFValue(15)
    }

})