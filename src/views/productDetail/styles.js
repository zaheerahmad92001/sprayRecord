import{StyleSheet ,Dimensions}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor } from '../../Constants/colors';
import {TextColor, buttonBGcolor } from '../../Constants/colors';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    uperView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: RFValue(30),
        backgroundColor: buttonBGcolor,
        width: RFValue(30),
        borderRadius: 30 / 2,
    },
    descriptionView: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: borderColor
    },
    name: {
        fontWeight: '700',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        color: TextColor
    },
    quantity: {
        fontWeight: '500',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: RFValue(14),
        color: TextColor,
        paddingTop: 5
    },

    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        marginTop:23,
        width: ScreenWidth, height: ScreenHeight * 0.4,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    Modalstyling: {
        width: "100%",
        height: ScreenHeight*0.7,
        backgroundColor: 'white',
        paddingTop:10,
        alignItems: "center",
    }
})