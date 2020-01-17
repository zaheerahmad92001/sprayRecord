import { StyleSheet, Dimensions } from 'react-native';
import { TextFont_Search, HeadingFont } from '../../Constants/fontsize';
import { RFValue } from 'react-native-responsive-fontsize';
import { CountColor, RED, TextColor, borderColor, buttonBGcolor } from '../../Constants/colors';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        height: ScreenHeight
    },
    content: {
        paddingHorizontal: 10,
        flex: 1,
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
    Input: {
        paddingVertical: 10
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: RFValue(180),
        height: RFValue(180),
        borderRadius: RFValue(90)
    },
    avatar: {
        borderRadius: RFValue(90),
        width: RFValue(180),
        height: RFValue(180),
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
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 0,
        marginBottom: 5
    },
    errorText: {
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
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
    Nextbutton: {
        flexDirection: 'row',
        width: RFValue(40),
        height: RFValue(40),
        borderRadius: RFValue(40 / 2),
        backgroundColor: buttonBGcolor,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 5
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
    }
})