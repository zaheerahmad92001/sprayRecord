import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor, TextColor, LIGHT_WHITE, buttonBGcolor } from '../../Constants/colors';
import { Icon, Item, Thumbnail } from 'native-base';
import { IMAGEURL } from '../../RandFunction';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const _OrderDetail = (props) => {
    console.log('image url',IMAGEURL+props.item.product.default_image)
    return (
        <TouchableOpacity style={styles.container}
        onLongPress={props.EditDelete}>
            <View style={styles.imageView}>
                <Thumbnail square large 
                source={{uri:IMAGEURL+props.item.product.default_image}}
                />
            </View>
            <View style={{ width:screenWidth*0.65, backgroundColor: 'white', marginTop: 5 }}>
                <View style={[styles.detailView]}>
                    <Text style={[styles.name]}>{props.item.product.title}</Text>
                    <View style={{flexDirection:'row'}}>
                     <Text style={styles.value}>{props.item.weight}</Text>
                     <Text style={styles.value}>{props.item.weight_unit}</Text>
                     </View>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={[styles.detailView, { marginTop: 5 }]}>
                    <Text style={styles.heading}>Available</Text>
                    <Text style={styles.value} >{props.item.opening_stock}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.heading}>Received</Text>
                    <Text style={styles.value} >{props.item.quantity}</Text>
                </View>
                <View style={styles.borderBottom}></View>

                <View style={[styles.detailView, { marginBottom: 8 }]}>
                    <Text style={styles.heading}>Total Quantity</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]} >{props.item.closing_stock}</Text>
                </View>
            </View>


        </TouchableOpacity>
    )
};

export default _OrderDetail;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: borderColor,
        marginHorizontal: 5,
        marginTop: 10,
        flexDirection: 'row',
        paddingBottom: 10
    },
    imgView: {
        margin: 7,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '80%',
        backgroundColor: 'red'

    },
    detailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5, paddingRight: 10 
    },
    name: {
        fontWeight: '700',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        color: TextColor
    },
    heading: {
        fontWeight: '600',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: RFValue(14),
        color: TextColor,
        //paddingRight:50
        // width: '70%',


    },
    value: {
        fontWeight: '600',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        // color: '#FF0000',
        color: TextColor
        //  marginLeft:RFValue(60)
    },
    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: 5
    },
    imageView: {
        //width: screenWidth * 0.35,
        //height: screenHeight * 0.2,
        width: RFValue(90),
        height: RFValue(110),
        margin:10,
        //padding: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
       // backgroundColor: 'green'
    },

})