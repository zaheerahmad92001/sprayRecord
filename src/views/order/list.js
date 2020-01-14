import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Card, CardItem } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class List extends Component {
    render() {
        return (
            <TouchableOpacity onLongPress={this.props.deleteProduct}>
            <Card noShadow key={this.props.keyVal}>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 10 }}>
                    <Text numberOfLines={1} style={styles.textStyle}>{this.props.val.name}</Text>
                    <Text numberOfLines={1} style={styles.textStyle}>{this.props.val.qty}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text numberOfLines={1} style={styles.textStyle} >{this.props.val.weight}</Text>
                    <Text numberOfLines={1} style={[styles.textStyle,{marginLeft:2}]}>{this.props.val.unit}</Text>
                    </View>
                </View>
               
            </Card>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    textStyle: {
        fontSize: RFValue(14),
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        color: 'black'
    }
})