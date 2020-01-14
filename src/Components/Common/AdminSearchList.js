import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import { Card, } from 'native-base';
import { TextFont_Search } from '../../Constants/fontsize';
import { CountColor, BBCOLOR, TextColor } from '../../Constants/colors'
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class AdminSearchList extends Component {
    render() {
        const { qty, Id, name } = this.props;
        return (
            <TouchableOpacity style={styles.Container}
                onPress={() => this.props.navigation.navigate('ProductDetail', {
                    item: {
                        Id: Id,
                        qty: qty,
                        name: name,
                        from:'admin'
                    }
                })}>
                <View style={styles.cardStyle}>
                    <View style={styles.imageView} >
                        <Image
                            style={styles.imageStyle}
                             source={require('../../assets/image/p.png')}/>
                    </View>
                   <Text style={styles.count}>{name}</Text>
                    <View style={styles.priceAvailableView}>
                        <Text style={styles.count}>Quantity</Text>
                        <Text style={styles.count}>{qty}</Text>
                    </View>
                </View>

            </TouchableOpacity>


        )
    }
}
const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        flex: 1,

    },
    imageStyle: {
        width:RFValue(200),
        height:RFValue(200),
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },
    priceAvailableView: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    heading: {
        fontSize: RFValue(16),
        fontWeight: '500',
        color: TextColor,
        
    },
    count: {
        fontSize: RFValue(14),
        fontWeight: 'bold',
        fontStyle:'italic',
        color: TextColor,
        marginTop:5
        
    },
    cardStyle: {
        borderRadius: 10,
        paddingVertical:10,
        marginBottom:10,
        paddingHorizontal:RFValue(30),
        marginLeft: 10,
        marginRight: 10,
        borderColor:BBCOLOR,
        borderWidth:1,
    }

})