import 'react-native-gesture-handler'
import React ,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

//import Screens from '../Screens';
import Screens from './src/Screens/Screens'
export default class App extends Component{
  render(){
    return(
      <Screens></Screens>
    )
  }

}