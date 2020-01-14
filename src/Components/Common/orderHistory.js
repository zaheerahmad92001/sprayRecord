import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor, TextColor, LIGHT_WHITE, buttonBGcolor } from '../../Constants/colors';
import { Icon, Item, Thumbnail } from 'native-base';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const _OrderDetail = (props) => {
    return (
        <TouchableOpacity style={styles.container}
        onLongPress={props.EditDelete}
        >
            <View style={styles.imageView}>
                {/* <Image
                    style={styles.avatar}
                    source={require('../../assets/image/p.png')}
                /> */}
                <Thumbnail square large 
                source={require('../../assets/image/p.png')}
                />
            </View>
            <View style={{ width: screenWidth * 0.65, backgroundColor: 'white', marginTop: 5 }}>
                <View style={[styles.detailView]}>
                    <Text style={[styles.name]}>{props.item.name}</Text>
                    <View style={{flexDirection:'row'}}>
                     <Text style={styles.value}>{props.item.weight}</Text>
                     <Text style={styles.value}>{props.item.unit}</Text>
                     </View>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={[styles.detailView, { marginTop: 5 }]}>
                    <Text style={styles.heading}>Available</Text>
                    <Text style={styles.value} >{props.item.AQty}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.heading}>Received</Text>
                    <Text style={styles.value} >{props.item.RQty}</Text>
                </View>
                <View style={styles.borderBottom}></View>

                <View style={[styles.detailView, { marginBottom: 8 }]}>
                    <Text style={styles.heading}>Total Quantity</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]} >{props.item.TQty}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Date</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.date}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Batch</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.batchNO}</Text>
                </View>

                {/* <View style={{ flexDirection: 'row',justifyContent:'flex-end' }}>
                   
                    <Icon
                        name={'dots-vertical'}
                        type={'MaterialCommunityIcons'}
                        onPress={props.EditDelete}
                    />
                </View> */}

            </View>


        </TouchableOpacity>
    )
};

export default _OrderDetail;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: borderColor,
        marginHorizontal: 5,
        marginTop: 10,
        flexDirection: 'row',
        paddingBottom: 10
    },
    imgView: {
        margin: 7,
        justifyContent: 'center',
        alignItems: 'center',
        // width:screenWidth*0.35,
        //height:screenHeight*0.2,
        width: '40%',
        height: '80%',
        //  alignSelf:'center',
        backgroundColor: 'red'

    },
    detailView: {
        // justifyContent:'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5, paddingRight: 10
        //alignItems:'center',
        // paddingHorizontal:15,
        // marginTop: 5,
        //marginBottom:3
    },
    name: {
        fontWeight: '700',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        color: TextColor
    },
    heading: {
        fontWeight: '600',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: RFValue(14),
        color: TextColor,
        //paddingRight:50
        // width: '70%',


    },
    value: {
        fontWeight: '600',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        // color: '#FF0000',
        color: TextColor
        //  marginLeft:RFValue(60)
    },
    borderBottom: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: 5
    },
    imageView: {
        //width: screenWidth * 0.35,
        //height: screenHeight * 0.2,
        width: RFValue(110),
        height: RFValue(110),
        marginTop:10,
        //padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: 'green'
    },
    avatar:{
   width:'100%',
   height:'100%'
    },
   

})