import React ,{Component}from 'react';
import {StyleSheet}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AdminBG, TextColor, borderColor, RED } from '../../Constants/colors';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    content:{
        marginHorizontal:RFValue(10),
        marginTop:RFValue(20)
    },
    ChangePassView:{
    backgroundColor:'white',
    // borderRadius:RFValue(10), 
    borderTopLeftRadius: 15,
    borderBottomRightRadius:15,
    borderColor:borderColor,
    borderWidth:RFValue(1), 
    paddingVertical:RFValue(15),
    paddingHorizontal:RFValue(10)
    },
    changepassText:{
        color:'#979797',
        fontSize:RFValue(14),
        fontWeight:'normal'
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500', 
    },
    errorText: {
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
})