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

const _Prouducts = (props) => {
    return (
        <Card noShadow>
            <CardItem
                button onLongPress={props.BottomSheet}
                >
                <Thumbnail 
                style={{backgroundColor:'white'}}
                source={require('../../assets/image/p.png')} 
                /> 
                   <View style={{flex:1,marginLeft:15,marginRight:3}}>
                    <Text numberOfLines={2} style={styles.Text}>{props.item.name}</Text>
                    </View>
                    {/* <Icon
                        name={'dots-vertical'}
                        type={'MaterialCommunityIcons'}
                        onPress={props.BottomSheet}
                    /> */}
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