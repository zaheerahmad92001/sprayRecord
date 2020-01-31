import{StyleSheet,Dimensions}from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextFont_Search} from '../../Constants/fontsize';
import { borderColor, TextColor, buttonBGcolor } from '../../Constants/colors'
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
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
        // paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
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