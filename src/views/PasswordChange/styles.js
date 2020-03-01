import React ,{Component}from 'react';
import {StyleSheet}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AdminBG, TextColor, CountColor, RED } from '../../Constants/colors';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    content:{
        marginHorizontal:RFValue(10),
        marginTop:RFValue(20)
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',
        
      },
      Input: {
        paddingVertical: 10,
    },
    item: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1

    },
    IconStyle: {
        fontSize: RFValue(25),
        color: CountColor
    },
    ButtonView: {
        marginTop: 10,
    },
    errorText: {
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
    // ChangePassView:{
    // backgroundColor:AdminBG,
    // borderRadius:RFValue(10),  
    // paddingVertical:RFValue(10),
    // paddingHorizontal:RFValue(10)
    // },
    // changepassText:{
    //     color:'white',
    //     fontSize:RFValue(14),
    //     fontWeight:'bold'
    // }
})