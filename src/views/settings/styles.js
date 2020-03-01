import React ,{Component}from 'react';
import {StyleSheet}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AdminBG } from '../../Constants/colors';
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
    backgroundColor:AdminBG,
    borderRadius:RFValue(10),  
    paddingVertical:RFValue(10),
    paddingHorizontal:RFValue(10)
    },
    changepassText:{
        color:'white',
        fontSize:RFValue(14),
        fontWeight:'bold'
    }
})