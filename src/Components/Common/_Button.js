import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {buttonBGcolor, AdminBG, MenuTextColor}from '../../Constants/colors';
import { Icon } from 'native-base';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const _Button = props => (
  <View style={{ alignItems: 'center' }}>
    <TouchableOpacity style={[styles.container, props.styles]} onPress={props.onPress} disabled={props.disabled}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text style={[styles.text, props.textStyle]}>{props.textButton}</Text>
        <Icon
        name={props.IconNmae}
        type={'MaterialCommunityIcons'}
        style={[styles.IconStyle]}
        />
      </View>
    </TouchableOpacity>
  </View>
);

export default _Button;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.07,
    borderRadius: 20,
    backgroundColor:AdminBG,
  //backgroundColor: 'rgba(34, 35, 38, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 20
  },
  text: {
    color: MenuTextColor,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(16),
    alignSelf: 'center',
  },
  IconStyle:{
    color:'white',
    alignItems:'center',
    fontSize:RFValue(26),
    marginLeft:5

  }
});