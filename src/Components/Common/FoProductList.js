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
import{TextFont_Stnadered} from '../../Constants/fontsize';
import {CountColor}from '../../Constants/colors'
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class FoProductList extends Component {
    render() {
        const {qty, id, name }= this.props;
        return (
            <TouchableOpacity style={styles.Container}>
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
        width: 90, 
        height: 90,
         
    },
    imageView:{
        justifyContent: 'center', 
        alignItems: 'center'
    },
    priceAvailableView:{
        flexDirection: 'row',
         justifyContent: 'space-around'
    },
    heading:{
        fontSize: TextFont_Stnadered,
         fontWeight: 'bold',
          paddingHorizontal: 10,
           color: CountColor
    },
    count:{
        fontSize: TextFont_Stnadered, 
        fontWeight: 'bold',
         color: CountColor
    },
    cardStyle:{
         
        borderRadius: 10,
        paddingVertical:10,
        marginLeft:2
        
           }

})