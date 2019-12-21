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
import { Icon, Item } from 'native-base';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const _OrderDetail = (props) => {
    return (
        <View style={styles.container} >
            <View style={styles.imageView}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../assets/image/p.png')}
                //source={require('../../assets/image/p.png')}
                />
            </View>
            <View style={{ width: screenWidth * 0.61, backgroundColor: 'white', marginTop: 5 }}>
                <View style={[styles.detailView]}>
                    <Text style={[styles.name]}>{props.item.name}</Text>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={[styles.detailView, { marginTop: 5 }]}>
                    <Text style={styles.heading}>Available</Text>
                    <Text style={styles.value} >{props.item.AQty}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.heading}>Received</Text>
                    <Text style={styles.value} >{props.item.RQty}</Text>
                </View>
                <View style={styles.borderBottom}></View>

                <View style={[styles.detailView, { marginBottom: 8 }]}>
                    <Text style={styles.heading}>Total Quantity</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]} >{props.item.TQty}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Date</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.date}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Batch</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.batchNO}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.textInvoice}
                        onPress={props.invoice}>
                        <View style={[styles.detailView, { paddingRight: 5 }]}>
                            <Text style={{ color: 'green' }}>Invoice</Text>
                            <Icon name={'file'}
                                type={'MaterialCommunityIcons'}
                                style={{ fontSize: 20, color: 'green' }}></Icon>
                        </View>
                    </TouchableOpacity>
                    <Icon
                        name={'dots-vertical'}
                        type={'MaterialCommunityIcons'}
                        onPress={props.EditDelete}
                    />
                </View>

            </View>


        </View>
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
        // width:screenWidth*0.35,
        //height:screenHeight*0.2,
        width: '40%',
        height: '80%',
        //  alignSelf:'center',
        backgroundColor: 'red'

    },
    detailView: {
        // justifyContent:'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5, paddingRight: 10
        //alignItems:'center',
        // paddingHorizontal:15,
        // marginTop: 5,
        //marginBottom:3
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
        width: RFValue(120),
        height: RFValue(140),
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'green'
    },
    textInvoice: {
        borderWidth: 1,
        borderColor: 'green',
        marginTop: 5,
        marginLeft: 5,
        width: '40%'
    }
})