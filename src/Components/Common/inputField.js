import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,

} from 'react-native';
import {borderColor}from '../../Constants/colors';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
const Text_Input = (props) => { 
    return (
              <TextInput
                    style={styles.inputStyle}
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
                    
                />
      
    )
}
export default Text_Input;
const styles = StyleSheet.create({
    inputStyle: {
        padding:10,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderBottomRightRadius:15,
        paddingHorizontal:15,
        fontFamily: 'normal',
        borderWidth:2,
        borderColor:borderColor
    },

}) 