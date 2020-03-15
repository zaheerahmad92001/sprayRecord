import {StyleSheet,Dimensions}from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextColor, CountColor } from '../../Constants/colors'
import { HeadingFont } from '../../Constants/fontsize'
export default StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex: 1,
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
    NotFound: {
        fontSize: HeadingFont,
        color: CountColor,
        fontWeight: '700',
    },
})