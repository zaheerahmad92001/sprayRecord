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
import { convertDateToString, IMAGEURL } from '../../RandFunction';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const _SaleHistory = (props) => {

 let date = new Date(props.item.entry_date*1000)
 date = convertDateToString(date)

    return (
        <View style={styles.container} >
            <View style={styles.imageView}>
                <Thumbnail large square
                source={{uri:IMAGEURL+props.item.product.default_image}}
                />
            </View>
            <View style={{flex:7, marginTop: 5 }}>
                <View style={[styles.detailView]}>
                    <Text style={[styles.name]}>{props.item.product.title}</Text>
                    <View style={{flexDirection:'row'}}>
                     <Text style={styles.value}>{props.item.product.weight}</Text>
                     <Text style={styles.value}>{props.item.product.unit}</Text>
                     </View>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={[styles.detailView, { marginTop:0 }]}>
                    <Text style={styles.heading}>Opening</Text>
                    <Text style={styles.value} >{props.item.opening_stock}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.heading}>Sale</Text>
                    <Text style={styles.value} >{props.item.totalSales}</Text>
                </View>
                <View style={styles.borderBottom}></View>

                <View style={[styles.detailView, { marginBottom:0 }]}>
                    <Text style={styles.heading}>Closing</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]} >{props.item.closing_stock}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Date</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{date}</Text>
                </View>

            </View>


        </View>
    )
};

export default _SaleHistory;

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
        marginLeft:RFValue(5),
    },
    avatar:{
        width: '100%',
        height: '100%',
        
    }
})