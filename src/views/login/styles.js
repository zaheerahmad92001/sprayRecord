import { StyleSheet, Dimensions } from 'react-native';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import { CountColor, TextColor, RED } from '../../Constants/colors'
import { RFValue } from 'react-native-responsive-fontsize';
export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: ScreenHeight,
    },
    subcontainer: {
        flex: 1,
    },
    content: {
        flex: 0.65,
        paddingHorizontal: 10,
    },
    Input: {
        paddingVertical: 10,
    },
    ButtonView: {
        marginTop: 10,

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
    logoStyle: {
        flex: 0.35,
        justifyContent: "center",
        alignItems: "center",
    },
    IconStyle: {
        fontSize: RFValue(25),
        color: CountColor
    },
    Forget: {
        alignSelf: 'center',
        paddingVertical: 5,
        marginTop: 10,
    },
    ForgetPassword: {
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600'
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',

    },
    errorText: {
        // marginBottom: 10,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
        marginLeft: 15,
    },
})