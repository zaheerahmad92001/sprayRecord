import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import { Button, Container, Drawer } from 'native-base';
export default class Sidebar extends Component {

    _onPress = (name) => {
        this.props.navigation.navigate({ routeName: name })
        this.props.drawerClose();
    }
    render() {
        return (
            <View style={styles.sldebar}>
                <View style={{ flex: 0.3, backgroundColor: 'white', justifyContent: "center", alignItems: "center" }}>
                    <Image
                    // style={{ width: 60, height: 60 }}
                    //  source={require('../../assets/image/squadly_logo.png')}
                    />
                </View>
                <View style={{ flex: 0.7 }}>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('AdminHome')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/calender.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>
                            Home
                    </Text>

                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('DailySale')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/calender.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>
                            Daily Sale
                    </Text>

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
                        <Text style={styles.Text}>
                            New Order
                    </Text>

                    </Button>

                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('AddNewProduct')}
                    >
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/Todo.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>
                            Add new Product
                    </Text>

                    </Button>
                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('OrderHistory')}
                    >
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/notification.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>
                            Order History
                    </Text>
                    </Button>

                    <Button transparent
                        style={styles.Button}
                        onPress={() => this._onPress('SaleHistory')}>
                        <Image
                            style={styles.Icon}
                        //source={require('../assets/images/notification.png')}
                        >
                        </Image>
                        <Text style={styles.Text}>
                            Sale History
                    </Text>

                    </Button>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sldebar: {
        flex: 1,
        backgroundColor: 'white',
    },
    Icon: {
        width: 40,
        height: 40,
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
        fontSize: 15,
        paddingLeft: 25
    }

})