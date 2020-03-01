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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { convertDateToString } from '../../RandFunction';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const _OrderList = (props) => {
    let date = new Date(props.item.order_date)
    return (
        <TouchableOpacity style={styles.container} 
        onLongPress={props.showProducts} >
            {/* <TouchableOpacity style={styles.imageView}
              onPress={props.showProducts}>
                <Thumbnail square large source={require('../../assets/image/p.png')}/>
            </TouchableOpacity> */}
            <View style={{ width: screenWidth * 0.96, backgroundColor: 'white', marginTop: 5 ,paddingHorizontal:10 }}>

                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Date</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{convertDateToString(date)}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Batch</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.batch_number}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>order#</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.order_number_received}</Text>
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
                    {/* <Icon
                        name={'dots-vertical'}
                        type={'MaterialCommunityIcons'}
                        onPress={props.EditDelete}
                    /> */}
                </View>

            </View>


        </TouchableOpacity>
    )
};

export default _OrderList;

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
        paddingLeft: 5, paddingRight: 10,
        //alignItems:'center',
        // paddingHorizontal:15,
        // marginTop: 5,
        marginBottom: 3
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
        width: RFValue(110),
        height: RFValue(110),
        marginTop: 10,
        //padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    avatar: {
        width: '100%',
        height: '100%'
    },
    textInvoice: {
        borderWidth: 1,
        borderColor: 'green',
        marginTop: 5,
        marginLeft: 5,
        width: '30%'
    },

})