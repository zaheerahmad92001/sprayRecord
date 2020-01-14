import React, { Component } from 'react';
import {Text, View, StyleSheet, Dimensions } from 'react-native';
import { buttonBGcolor } from '../../Constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const {width:screenWidth , hieght:screenHeight} = Dimensions.get('window');
export default class BlinkingClass extends Component {
    constructor(props) {
      super(props);
      this.state = {showText: true};
    //   setInterval(() => {
    //     this.setState(previousState => {
    //       return { showText: !this.state.showText };
    //     });
    //   }, 
    //   1000);
    // }
    setInterval(() => {
            this.setState(previousState => {
              return { showText: !previousState.showText };
            });
          }, 
          4000);
        }
   
    render() {
      const {showText} = this.state;
      let display =this.props.text ;
      return (
          <View style={[styles.Content, showText ?{backgroundColor:buttonBGcolor}:{backgroundColor:'green'}]}>
           <Text style = {[styles.textStyle , showText ?{color:'black'}:{color:'white'}]}>{'Current Balance'}</Text>   
           <Text style = {[styles.textStyle , showText ?{color:'black'}:{color:'white'}]}>{display}</Text>
          </View>
        
      );
    }
  }
  const styles = StyleSheet.create({
      Content:{
          paddingVertical:10,
         // width:screenWidth,
         // alignSelf:'center',
          justifyContent:'space-around',
          flexDirection:'row'
      },
      textStyle:{
          textAlign:'center',
          fontSize:RFValue(16),
          fontStyle:'italic',
          fontWeight:'bold',
          letterSpacing:1
          
      }
  })
   