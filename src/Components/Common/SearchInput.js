import React from 'react';
import {
   StyleSheet,
} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base'
const Search_Input = (props) =>
   <Item style={styles.Input}>
      <Input
         placeholder={props.placeholder}
         placeholderTextColor={props.placeholderTextColor}
         value={props.value}
         onChangeText={props.onChangeText}
         autoCapitalize={props.autoCapitalize}
         secureTextEntry={props.secureTextEntry}
         keyboardType={props.keyboardType}
      />
      <Icon name="ios-search"
         onPress={props.onPress} />
   </Item>
export default Search_Input;
const styles = StyleSheet.create({
   Input: {
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderBottomColor: 'transparent',
      alignItems: "center",
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,
   }
})