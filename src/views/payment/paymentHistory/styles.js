import { StyleSheet,Dimensions } from "react-native";
import {TextColor, borderColor, BBCOLOR } from '../../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    appbar: {
        height: ScreenHeight*0.3,
        backgroundColor: 'white',
    },
    content: {
        // marginHorizontal: 3,
        // flex: 1,

    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',

    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        fontWeight: 'normal',
        color: TextColor,
        marginLeft: 10,
    },
    startDContainer: {
        backgroundColor: 'green',
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    IconStyle: {
        width: ScreenWidth * 0.15,
        // height: RFValue(40),
        fontSize: RFValue(30),
        backgroundColor: 'red',
        marginRight: RFValue(20)
    },
    SearchView: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        marginHorizontal: 7,
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BBCOLOR,
    },
    selectDateStyle: {
        // backgroundColor: 'green',
        paddingVertical: 12,
        width: ScreenWidth * 0.75,
    },
    SearchIconView: {
        //backgroundColor: 'blue',
        width: ScreenWidth * 0.2,
        paddingVertical: 10
    },
    buttonStyle: {
        backgroundColor: TextColor,
        marginHorizontal: 20,
        marginVertical: 7,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: RFValue(18)
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
})