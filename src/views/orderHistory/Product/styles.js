import{StyleSheet , Dimensions}from 'react-native';
import { TextFont_Search, HeadingFont } from '../../../Constants/fontsize';
import { TextColor, borderColor, buttonBGcolor, MenuTextColor, AdminBG } from '../../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),
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
     batchText:{
        fontSize:14,
         fontStyle:'normal',
         fontWeight:'bold',
         color:MenuTextColor,
         backgroundColor:'red',
         borderRadius:10,
         paddingHorizontal:10,
         paddingVertical:2,
         textAlign:'center'
     },
     textInvoice: {
        borderWidth: 1,
        //borderColor: 'green',
        borderRadius:20,
        borderColor:AdminBG,
        marginTop: 5,
        marginLeft: 5,
        width: '90%',
        backgroundColor:AdminBG,        
    },
    InvoiceText:{
        color:MenuTextColor,
        marginRight:8,
        fontWeight:'bold',
        fontSize:14 
    },
    detailView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingLeft: 5, paddingRight: 10,
        paddingVertical:5,
        marginBottom: 3,
    },
    appbar: {
        height: ScreenHeight*0.25,
        backgroundColor: 'white',
    },
    invoiceStyle: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        color: 'green'
    },
    
})