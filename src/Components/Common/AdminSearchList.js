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
import { Card, Thumbnail, } from 'native-base';
import { TextFont_Search } from '../../Constants/fontsize';
import { CountColor, BBCOLOR, TextColor } from '../../Constants/colors'
import { RFValue } from 'react-native-responsive-fontsize';
import { IMAGEURL } from '../../RandFunction';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class AdminSearchList extends Component {
    render() {
        const { qty, Id, name, img } = this.props;
        return (
            <TouchableOpacity style={styles.Container}
                onPress={() => this.props.navigation.navigate('ProductDetail', {
                    item: {
                        Id: Id,
                        qty: qty,
                        name: name,
                        from: 'admin'
                    }
                })}>
                <View style={styles.cardStyle}>
                    <Thumbnail large square source={{ uri: IMAGEURL + img }} />
                    <View style={styles.textStyle}>
                        <Text style={styles.count}>{name}</Text>
                        <View style={styles.priceAvailableView}>
                            <Text style={styles.count}>Qty</Text>
                            <Text style={styles.count}>{qty}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>


        )
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    priceAvailableView: {
        flexDirection: 'row',
        justifyContent: 'space-between',    
    },
    count: {
        fontSize: RFValue(14),
        fontWeight: 'normal',
        fontStyle: 'italic',
        color: TextColor,
        marginTop: 5
    },
    cardStyle: {
        borderRadius: RFValue(10),
        paddingVertical: RFValue(5),
        marginBottom: RFValue(10),
        paddingHorizontal: RFValue(10),
        marginLeft: RFValue(10),
        marginRight: RFValue(10),
        borderColor: BBCOLOR,
        borderWidth: 1,
        flexDirection: 'row',
    },
    textStyle: {
        marginHorizontal: RFValue(15),
        flex:1
    }

})