import{StyleSheet, Dimensions}from 'react-native';
import { RED, TextColor,buttonBGcolor } from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        height: ScreenHeight,
        backgroundColor: 'white'
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
      Heading: {
        paddingHorizontal: 5,
        color: TextColor,
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontWeight: '500',
      },
      errorText: {
        marginTop: 10,
        color: RED,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontWeight: '500',
        fontStyle: 'normal',
      },
      buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        paddingLeft: 10,
        padding: 5,
        marginHorizontal: 10,
      },
      
      Imagepickerbutton: {
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: buttonBGcolor
      }
})