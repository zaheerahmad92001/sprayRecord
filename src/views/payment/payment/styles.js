import {StyleSheet, Dimensions } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { CountColor, buttonBGcolor, TextColor, borderColor, RED } from '../../../Constants/colors';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    content: {
        height: ScreenHeight,
        marginHorizontal: 10,
        marginTop: ScreenHeight * 0.03
        // marginTop:RFValue(40),

    },
    paymentTouch: {
        marginTop: ScreenHeight * 0.02,
        marginRight: 10,
        paddingVertical: 10,
        //width:ScreenWidth*0.35,

        alignSelf: 'flex-end'
    },

    textStyle: {
        color: 'white',
        fontSize: RFValue(12),
        fontWeight: 'bold',
        fontStyle: 'normal',
        backgroundColor: buttonBGcolor,
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 5,
        letterSpacing: 1
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',
        marginTop: 10,

    },
    startDContainer: {
        backgroundColor: 'white',
        borderColor: borderColor,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 0,
        marginBottom: 5
    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        width: '100%',
        color: 'black',
        fontSize: RFValue(16),
        backgroundColor: 'white',
    },
    DialogTitleStyle: {
        color: 'white',
        fontSize: RFValue(16),
        fontStyle: 'normal',
        fontWeight: '700',
        fontFamily: 'Poppins'
    },
    DialogText: {
        fontSize: RFValue(12),
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    DialogOK_CancelButton: {
        color: TextColor,
        fontSize: RFValue(12),
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: 'Poppins'
    },
    errorText: {
        //marginBottom: 10,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
    Input: {
        paddingVertical: 10
    },
    RsText: {
        borderColor: borderColor,
        borderWidth: 1,
        paddingVertical: 15,
        paddingLeft: 15,
        borderTopLeftRadius: 10,
        borderRightWidth: 0,
        color: '#979797',
        alignSelf: 'center'
    },
})
