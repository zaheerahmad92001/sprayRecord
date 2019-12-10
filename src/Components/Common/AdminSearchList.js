import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import { Card, } from 'native-base';
import{TextFont_Search} from '../../Constants/fontsize';
import {CountColor}from '../../Constants/colors'
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class AdminSearchList extends Component {
    render() {
        const  {qty, Id, name }= this.props;
        console.log ('props',this.props.name) 
        return (
            <TouchableOpacity style={styles.Container}
            onPress={()=>this.props.navigation.navigate('ProductDetail',{
                item:{
                    Id:Id,
                    qty:qty,
                    name:name,
                }
            })}
            >
                <Card style={styles.cardStyle}>
                    <View style={styles.imageView} >
                        <Image
                            style={styles.imageStyle}
                            source={require('../../assets/image/1.jpg')}
                        />
                    </View>
                   

                    <View style={styles.priceAvailableView}>
                        <Text style={styles.heading}>
                            Name
                          </Text>
                        <Text style={styles.count}>
                            {name}
                          </Text>
                    </View>
                    
                    <View style={styles.priceAvailableView}>
                        <Text style={styles.heading}>
                            Quantity
                          </Text>
                        <Text style={styles.count}>
                            {qty}
                          </Text>

                    </View>
                </Card> 
               
            </TouchableOpacity>
        
        
        )
    }
}
const styles =StyleSheet.create({
    Container:{
         justifyContent: 'center',
         paddingHorizontal: 5,
         flex:1,
         
   },
   imageStyle:{
       width: 120, 
       height: 120,
        
   },
   imageView:{
       justifyContent: 'center', 
       alignItems: 'center',
       marginBottom:10,
       
   },
   priceAvailableView:{
       flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingHorizontal:20,
   },
   heading:{
       fontSize: TextFont_Search,
        fontWeight: 'bold',
        // paddingHorizontal: 10,
          color: CountColor,
          padding:7
   },
   count:{
       fontSize: TextFont_Search, 
       fontWeight: 'bold',
        color: CountColor,
        padding:7
   },
   cardStyle:{
       borderRadius: 10,
       padding:20,
       marginLeft:20,
       marginRight:20,
          }

})