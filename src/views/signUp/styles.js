import { StyleSheet, Dimensions } from 'react-native';
import { TextColor, RED, CountColor } from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    
    Input: {
        paddingVertical: 10,
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
    imageView: {
        //flex: 2,
        //justifyContent: 'center',
        height:screenHeight*0.15,
        width:screenWidth,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent:'center'
    },
    InputView: {
        flex: 8,
        marginHorizontal: 10
        // paddingHorizontal: 10,
    },
    TextInputView: {
        marginBottom: 10
    },
    Heading: {
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',
        marginBottom: 5,
    },
    ButtonView: {
        marginTop: 10,

    },
    errorText: {
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
    },
    IconStyle: {
        fontSize: RFValue(25),
        color: CountColor
    },
})