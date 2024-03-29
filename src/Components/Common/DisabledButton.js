import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {buttonBGcolor}from '../../Constants/colors';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const _DisabledButton = props => (
  <View style={{ alignItems: 'center' }}>
    <TouchableOpacity style={[styles.container, props.styles]} onPress={props.onPress} disabled={props.disabled}>
      <View>
        <Text style={[styles.text, props.textStyle]}>{props.textButton}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default _DisabledButton;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.07,
    borderRadius: 10,
   // backgroundColor:buttonBGcolor,
    backgroundColor: 'rgba(34, 35, 38, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 20
  },
  text: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(20),
    alignSelf: 'center',
  }
});