import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { Button, Container, Drawer } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class Sidebar extends Component {

    _onPress = (name) => {
        this.props.navigation.navigate({ routeName: name })
        this.props.drawerClose();
    }
    render() {
        return (
            <SafeAreaView style={styles.sidebar}>
                <View style={{ flex: 0.25, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Image
                      style={{width:screenWidth*0.55,height:screenHeight*0.2,marginTop:10}}
                       source={require('../../assets/image/squadly_logo.png')}
                    /> */}
                    <View style={{ marginVertical: 20 }}></View>
                </View>
                <View style={{ flex: 0.65 }}>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('AdminHome')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/calender.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>Home</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('DailySale')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/calender.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>Daily Sale</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('NewOrder')}
                    >
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/calender.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>New Order</Text>
                    </Button>

                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('ProductList')}
                    >
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/Todo.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>Products</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('Orders')}
                    >
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/notification.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>Order History </Text>
                    </Button>

                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('SaleHistory')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/notification.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>Sale History</Text>
                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('payment')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/notification.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>Payment</Text>
                    </Button>
                </View>
                <View style={{ flex: 0.1, bottom: 20, }}>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('Login')}>
                        <Image
                            style={styles.Icon}
                            source={require('../../assets/image/signout.png')}/>
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
        marginTop: 25,
        backgroundColor: 'white',

    },
    Icon: {
        width: RFValue(28),
        height: RFValue(21),
    },
    Button: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    Text: {
        color: '#200F8C',
        fontSize: RFValue(15),
        paddingLeft: RFValue(25)
    }

})