import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet,
} from 'react-native'
import { Card } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor, TextColor, buttonBGcolor, AdminBG, MenuTextColor } from '../../Constants/colors';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { convertDateToString } from '../../RandFunction';
const PaymentList = (props) => {
    let date = convertDateToString(new Date(props.item.transaction_date*1000))
    return (
        <Card noShadow style={{borderRadius:10 ,}}>
            {props.item.type === 'payment' ?
                <TouchableOpacity style={{ backgroundColor:AdminBG,borderRadius:10 ,paddingVertical:10}}
                    onLongPress={props.callBottomSheet}
                >
                    <View style={styles.contaner} >
                        <Text style={[styles.textStyle]}>Current balance</Text>
                        <Text style={[styles.textStyle]}>{props.item.opening_balance}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={[styles.textStyle]}>Paid amount</Text>
                        <Text style={[styles.textStyle]}>{props.item.total_amount}</Text>
                    </View>
                    <View style={[styles.borderBottom]}></View>
                    <View style={[styles.contaner]} >
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Total balance</Text>
                        <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{props.item.closing_balance}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle}>PR No</Text>
                        <Text style={styles.textStyle}>{props.item.pr_number}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle}>Date</Text>
                        <Text style={styles.textStyle}>{date}</Text>
                    </View>
                </TouchableOpacity> :

                <TouchableOpacity style={{ backgroundColor: '#BBBBBB',borderRadius:10,paddingVertical:10 }}
                    onLongPress={props.callBottomSheet}>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle2}>Current balance</Text>
                        <Text style={styles.textStyle2}>{props.item.opening_balance}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle2}>Order Price</Text>
                        <Text style={styles.textStyle2}>{props.item.total_amount}</Text>
                    </View>
                    <View style={[styles.borderBottom, { borderBottomColor: 'white' }]}></View>
                    <View style={styles.contaner} >
                        <Text style={[styles.textStyle2, { fontWeight: 'bold' }]}>Total balance</Text>
                        <Text style={[styles.textStyle2, { fontWeight: 'bold' }]}>{props.item.closing_balance}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle2}>Batch no</Text>
                        <Text style={styles.textStyle2}>{props.item.batch_number}</Text>
                    </View>
                    <View style={styles.contaner} >
                        <Text style={styles.textStyle2}>Date</Text>
                        <Text style={styles.textStyle2}>{date}</Text>
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
        //paddingVertical: 5,
    },
    textStyle: {
        fontSize: RFValue(14),
        fontStyle: 'normal',
        fontWeight: '600',
        color: MenuTextColor,
        //color: 'white'
    },
    textStyle2: {
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