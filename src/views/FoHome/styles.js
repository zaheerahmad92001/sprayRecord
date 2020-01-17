import{StyleSheet,Dimensions}from 'react-native';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import {RFValue}from 'react-native-responsive-fontsize';
import { CountColor, BGColor, TextColor,borderColor } from '../../Constants/colors';
import { TextFont_Search, HeadingFont } from '../../Constants/fontsize';

export default StyleSheet.create({
    container: {
        //height: ScreenHeight * 1,
       flex:1,
        backgroundColor: 'white',
    },
    itemText: {
        fontSize: 15,

    },
    NotFound: {
        fontSize: HeadingFont,
        color: CountColor,
        fontWeight: '700',
    },
    AutocompleteStyle: {
        backgroundColor: 'transparent',
        // borderWidth: 1,
        // borderColor:'black',
        //borderRadius: 20,
        //paddingLeft: 15,
        //marginHorizontal:5,
        marginRight: 5,
        fontSize: TextFont_Search,

    },
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),

    },
    SearchView:{
        width: ScreenWidth * 0.97,
       // paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
        marginBottom:10,
    }
})