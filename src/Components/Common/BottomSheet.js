import React ,{Component}from 'react';
import{
    TouchableOpacity,
    View,StyleSheet,
    Text,
}from 'react-native';
import {TextColor}from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';

const _BottomSheet=(props)=>{
    return(
        <View style={{ backgroundColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
        <View style={{ marginTop: 15, }}>
            <TouchableOpacity style={styles.buttonStyle}
             onPress={props._navigateTo}>
            <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}
                onPress={props.CallDialogBox}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: 'white', paddingVertical: 0, paddingBottom: 7 }]}
                 onPress={props.CancelSheet}
                >
                <Text style={[styles.buttonText, { color: TextColor, fontSize: RFValue(14) }]}>Cancel</Text>
            </TouchableOpacity>

        </View>
    </View>

    )
}
export default _BottomSheet;
const styles = StyleSheet.create({
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
})