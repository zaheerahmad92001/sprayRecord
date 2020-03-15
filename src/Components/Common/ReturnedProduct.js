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
import { IMAGEURL, convertDateToString } from '../../RandFunction';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const _ReturnedProduct = (props) => {

    let date = new Date(props.item.entry_date*1000)
        date = convertDateToString(date)
      
    return (
        <TouchableOpacity style={styles.container}
          onLongPress={props.BottomSheet}>
            <View style={styles.imageView}>
                <Thumbnail large square
                style={{marginLeft:RFValue(5),marginRight:RFValue(7)}}
                source={{uri:IMAGEURL+props.item.product.default_image}}/>
            </View>
            <View style={{flex:7, marginTop:5  }}>
                <View style={[styles.detailView]}>
                    <Text style={[styles.name]}>{props.item.product.title}</Text>
                    <View style={{flexDirection:'row'}}>
                     <Text style={styles.value}>{props.item.weight}</Text>
                     <Text style={styles.value}>{props.item.unit}</Text>
                     </View>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={[styles.detailView, { marginBottom: 8 }]}>
                    <Text style={styles.heading}>Qty</Text>
                    <Text style={[styles.value,]} >{props.item.quantity}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Date</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{date}</Text>
                </View>
            </View>


        </TouchableOpacity>
    )
};

export default _ReturnedProduct;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: borderColor,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        paddingBottom: 10,
        flex:1
    },
   
    detailView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
       marginHorizontal:RFValue(10),
        flex:7,
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
    },
    value: {
        fontWeight: '600',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        color: TextColor,
        paddingRight:1,
        
    },
    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '93%',
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: 5
    },
    imageView: {
       marginTop:RFValue(5),     
    },
    avatar:{
        width: '100%',
        height: '100%',
        
    }
})