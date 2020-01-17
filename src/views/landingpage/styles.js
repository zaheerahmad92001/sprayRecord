import {StyleSheet , Dimensions}from 'react-native';
import { BGColor } from '../../Constants/colors';
import { AdmingIcon, HeadingFont, TextFont } from '../../Constants/fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        height: ScreenHeight * 1,
        backgroundColor:BGColor,
    },
    logoStyle: {
        flex: 0.45,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonView: {
        flex: 0.55,
    },
    buttonstyle: {
        flex: 0.4,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    AdminTextView: {
        justifyContent: "center",
        paddingLeft: 10,
        flex: 0.6
    },
    AdminText:{ 
        fontWeight: 'bold',
         fontSize: TextFont, 

}
})