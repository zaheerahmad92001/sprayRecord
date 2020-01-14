import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet,
} from 'react-native'
import { Card } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor, TextColor } from '../../Constants/colors';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
const PaymentList = (props) => {
    return (

        <Card noShadow >
            {props.item.payment ?
                <TouchableOpacity style={{ backgroundColor: 'green' }} >
                    <View style={styles.contaner} >
                        <Text style={[styles.textStyle]}>Current balance</Text>
            <Text style={[styles.textStyle]}>{props.item.currentbalance}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={[styles.textStyle]}>Paid amount</Text>
            <Text style={[styles.textStyle]}>{props.item.payment}</Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>
                    <View style={[styles.contaner]} >
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Total balance</Text>
            <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{props.item.total}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle}>Date</Text>
            <Text style={styles.textStyle}>{props.item.date}</Text>
                    </View>
                </TouchableOpacity> :

                <TouchableOpacity style={{backgroundColor:'#BBBBBB'}}>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle}>Current balance</Text>
            <Text style={styles.textStyle}>{props.item.currentbalance}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle}>Order price</Text>
            <Text style={styles.textStyle}>{props.item.orderPrice}</Text>
                    </View>
                    <View style={[styles.borderBottom,{borderBottomColor:'white'}]}></View>
                    <View style={styles.contaner} >
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Total balance</Text>
            <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{props.item.total}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle}>Date</Text>
            <Text style={styles.textStyle}>{props.item.date}</Text>
                    </View>
                </TouchableOpacity>

            }
        </Card>

    )
}
export default PaymentList;
const styles = StyleSheet.create({
    contaner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textStyle: {
        fontSize: RFValue(14),
        fontStyle: 'normal',
        fontWeight: '600',
        color: TextColor,
        //color: 'white'
    },

    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: 5
    },
})