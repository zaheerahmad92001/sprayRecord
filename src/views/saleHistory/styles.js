import {StyleSheet,Dimensions}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor, BBCOLOR, TextColor} from '../../Constants/colors';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    scene: {
        width: ScreenWidth,
        height: ScreenHeight
    },
    appbar: {
        height: ScreenHeight*0.28,
        backgroundColor: 'white',
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
    datePickerView:{
        flexDirection: 'row',
        marginTop:5,
        marginHorizontal: 7,
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BBCOLOR,
    },
    SearchIconView:{
        width: ScreenWidth * 0.2,
        paddingVertical: 10,
       // backgroundColor:'yellow'
    },
    selectDateStyle: {
         //backgroundColor: 'green',
        paddingVertical: 12,
        width: ScreenWidth * 0.34,
    },
    Toview:{
    justifyContent:'center',
   // backgroundColor:'blue',
    alignItems:'flex-start'
    
    },
    to:{
      // backgroundColor:'red',
      // textAlign:'center',
       alignSelf:'center'

    },
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),
    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        fontWeight: 'normal',
        color: TextColor,
        marginLeft: 10,
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
        marginHorizontal: 0,
        marginBottom: 5
    },
     NotFound: {
        fontSize: RFValue(20),
        color: '#d3d3d3',
        fontWeight: '700',
        alignSelf:'center'
    },
    radiobutton:{
        marginTop:RFValue (10),
        marginBottom:RFValue (5),
    }
})