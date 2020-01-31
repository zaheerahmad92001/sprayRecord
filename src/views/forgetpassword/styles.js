import{StyleSheet,Dimensions}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BGColor, RED, TextColor, forgetpass, buttonBGcolor, MenuTextColor } from '../../Constants/colors'
const { width: ScreenWidth ,height:ScreenHeight } = Dimensions.get('window');
export default StyleSheet.create({
    container:{
        //height:ScreenHeight*1,    
        //flex:1,  
        backgroundColor:'#FFFFFF'
    },
    midContainer:{
        height:ScreenHeight*0.3,
         alignItems: 'flex-start',
          justifyContent: 'flex-end',
          paddingLeft:15
    },
    Content:{
        height:ScreenHeight*0.5,
         marginHorizontal: 10, 
    },
    Heading:{
        
        color:TextColor,
        fontSize:RFValue(12),
        fontFamily:'Poppins',
        fontWeight:'700',
        marginLeft:5,
        marginBottom:10
        
    },
    companyName:{
       
        color:MenuTextColor,
        fontSize:RFValue(16),
        fontFamily:'Poppins',
        fontWeight:'bold',
       
        
    },
    Forget:{
        alignSelf:'center',
        paddingVertical:5,
        marginTop:20,
    },
    ForgetPassword:{
        color:TextColor,
        fontSize:RFValue(14),
        fontFamily:'Poppins',
        fontStyle:'normal',
        fontWeight:'600'
       },
       SignUp:{
        alignSelf:'center',
        paddingVertical:5,
        marginTop:15,
        flexDirection:"row",
       },

       errorText: {
        marginTop:5,
        marginBottom:10,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
      },
})