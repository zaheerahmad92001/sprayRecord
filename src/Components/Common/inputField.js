import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,

} from 'react-native';
import {borderColor}from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const Text_Input = (props) => { 
    return (
              <TextInput
                    style={[styles.inputStyle,props.styles]}
                    selection={props.selection}
                    placeholder={props.placeholder}
                    placeholderTextColor={'#979797'}
                    value={props.value}
                    autoCapitalize={props.autoCapitalize}
                    editable={props.editable}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                    multiline={props.multiline}
                    secureTextEntry={props.secureTextEntry}
                    // ref={props.ref}
                    // returnKeyType={props.returnKeyType}
                    // onSubmitEditing={props.onSubmitEditing}
                    
                    
                />
      
    )
}
export default Text_Input;
const styles = StyleSheet.create({
    inputStyle: {
        padding:10,
        color: 'black',
        fontSize:RFValue(16),
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderBottomRightRadius:15,
        paddingHorizontal:15,
        fontFamily: 'normal',
        borderWidth:1,
        borderColor:borderColor
    },

}) 