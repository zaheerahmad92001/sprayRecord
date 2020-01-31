import {StyleSheet , Dimensions}from 'react-native';
import { MenuTextColor, AdminBG } from '../../Constants/colors';
import { AdmingIcon, HeadingFont, TextFont } from '../../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default StyleSheet.create({
        textStyle:{
            color:MenuTextColor,
            marginLeft:RFValue(5),
            fontStyle:'normal',
            fontSize:RFValue(18),
            fontWeight:'bold'
        },
        adminButton:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            paddingVertical:RFValue (10),
            borderRadius:RFValue(20),
            backgroundColor:AdminBG
        },
        buttonStyle:{
            marginHorizontal:RFValue(15),
            marginBottom:RFValue(20)
        },
        buttonView:{
            marginBottom:RFValue(35),
            flex: 1, justifyContent: 'flex-end',
        }
})