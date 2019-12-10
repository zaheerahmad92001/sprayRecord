import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import { ListItem, Left, Right, Body, Card, CardItem } from 'native-base';
import { TextFont } from '../../../Constants/fontsize'
import { TextColor, CountColor } from '../../../Constants/colors';

export default class _ProductNameCount extends Component {
    render() {
        const { ProductName, Count } = this.props;
        return (
            <View>
                <TouchableOpacity>
                    <View style={styles.ListStyle}>
                        <Text style={styles.NameStyle}>{ProductName}</Text>
                        <Text style={styles.CountStyle}>{Count}</Text>

                    </View>

                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    ListStyle: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    NameStyle: {
        fontSize: TextFont,
        color: TextColor,
    },
    CountStyle: {
        fontSize: TextFont,
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        color: 'gray'
    }
})