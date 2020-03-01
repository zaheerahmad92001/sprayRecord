import {StyleSheet,Dimensions}from 'react-native';
import { TextFont_Search,} from '../../../Constants/fontsize';
import { TextColor, borderColor, BBCOLOR } from '../../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        marginRight: 5,
        fontSize: TextFont_Search,
    },
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),
    },
    SearchView: {
        width: ScreenWidth * 0.97,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
    },
    invoiceStyle: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        color: 'green'
    },
    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
    },
    imgView: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: ScreenWidth * 0.98,
        height: ScreenHeight * 0.8
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
    DialogText: {
        fontSize: RFValue(12),
        fontStyle:'italic',
        fontWeight:'bold'
    },
    DialogOK_CancelButton:{ 
        color:TextColor,
        fontSize:RFValue(12),
        fontStyle:'normal',
        fontWeight:'bold',
        fontFamily:'Poppins'
     },
     datePickerView:{
        flexDirection: 'row',
        marginTop:5,
        marginHorizontal:5,
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BBCOLOR,
    },
    SearchIconView:{
        width: ScreenWidth * 0.2,
        paddingVertical: 10
    },
    selectDateStyle: {
        // backgroundColor: 'green',
        paddingVertical: 12,
        width: ScreenWidth * 0.75,
    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        fontWeight: 'normal',
        color: TextColor,
        marginLeft: 10,
    },
})