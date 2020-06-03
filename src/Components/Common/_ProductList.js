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
import { Card, Thumbnail, Body, Right, Icon, CardItem, Left, } from 'native-base';
import { TextFont_Stnadered } from '../../Constants/fontsize';
import { CountColor, borderColor, TextColor } from '../../Constants/colors'
import { RFValue } from 'react-native-responsive-fontsize';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
import {IMAGEURL} from '../../RandFunction'

const _Prouducts = (props) => {
    return (
        <Card noShadow>
            <CardItem
                button onLongPress={props.BottomSheet}
                >
                <Thumbnail circle  
                 style={{backgroundColor:'white'}}
                source={{uri:IMAGEURL+props.item.default_image}} 
                /> 
                   <View style={{flex:1,marginLeft:15,marginRight:3}}>
                    <Text numberOfLines={2} style={styles.Text}>{props.item.title}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                     <Text style={styles.Text}>{props.item.weight}</Text>
                     <Text style={styles.Text}>{props.item.unit}</Text>
                    </View>
            </CardItem>
        </Card>
    )
}
export default _Prouducts;
const styles = StyleSheet.create({
    Text:{
        color:TextColor,
        fontFamily:'Poppins',
        fontSize:RFValue(14),
        fontStyle:'normal',
        fontWeight:'bold'
    }
})