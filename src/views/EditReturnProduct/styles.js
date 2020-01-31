import {StyleSheet,Dimensions}from 'react-native';
import {RED, TextColor, borderColor } from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        height: ScreenHeight
    },
    content: {
        paddingHorizontal: 10,
        flex: 1,
        marginTop: 15,
    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: borderColor,
        paddingHorizontal: 15,
    },
    Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',

    },
    logo: {
        flex: 0.35,
        justifyContent: "center",
        alignItems: "center",
    },
    Input: {
        paddingVertical: 10
    },

    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: 75
    },
    avatar: {
        borderRadius: RFValue(75),
        width: RFValue(150),
        height: RFValue(150),
    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        width: '100%',
        color: 'black',
        fontSize: RFValue(16),
        backgroundColor: 'white',
    },
    startDContainer: {
        backgroundColor: 'white',
        borderColor: borderColor,
        borderWidth: 1,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginBottom: 5
    },
    errorText: {
        marginTop: 5,
        marginBottom: 5,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
})