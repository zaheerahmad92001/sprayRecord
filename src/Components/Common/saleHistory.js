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

const _SaleHistory = (props) => {
    return (
        <View style={styles.container} >
            <View style={styles.imageView}>
                {/* <Image
                    style={styles.avatar}
                    source={require('../../assets/image/p.png')}
                //source={require('../../assets/image/p.png')}
                /> */}
                <Thumbnail large square
                source={require('../../assets/image/p.png')}/>
            </View>
            <View style={{flex:7, marginTop: 5 }}>
                <View style={[styles.detailView]}>
                    <Text style={[styles.name]}>{props.item.name}</Text>
                    <View style={{flexDirection:'row'}}>
                     <Text style={styles.value}>{props.item.weight}</Text>
                     <Text style={styles.value}>{props.item.unit}</Text>
                     </View>
                </View>
                <View style={styles.borderBottom}></View>
                <View style={[styles.detailView, { marginTop: 5 }]}>
                    <Text style={styles.heading}>Opening</Text>
                    <Text style={styles.value} >{props.item.open}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.heading}>Sale</Text>
                    <Text style={styles.value} >{props.item.sale}</Text>
                </View>
                <View style={styles.borderBottom}></View>

                <View style={[styles.detailView, { marginBottom: 8 }]}>
                    <Text style={styles.heading}>Closing</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]} >{props.item.close}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={[styles.heading]}>Date</Text>
                    <Text style={[styles.value, { color: TextColor, fontWeight: '500' }]} >{props.item.date}</Text>
                </View>

                {/* <TouchableOpacity style={{borderWidth:1,borderColor:'green',marginTop:5,width:'40%'}}
                   onPress={props.invoice}
                >
                    <View style={[styles.detailView,{paddingRight:5}]}>
                        <Text style={{color:'green'}}>Invoice</Text>
                        <Icon name={'file'}
                        type={'MaterialCommunityIcons'}
                        style={{fontSize:20,color:'green'}}></Icon>
                    </View>
                </TouchableOpacity> */}
            </View>


        </View>
    )
};

export default _SaleHistory;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: borderColor,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        paddingBottom: 10,
        flex:1
    },
    imgView: {
        margin: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flex:3,
        // width:screenWidth*0.35,
        //height:screenHeight*0.2,

        //width: '40%',
        //height: '80%',
        
        backgroundColor: 'red'

    },
    detailView: {
        // justifyContent:'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight:10,
        // marginLeft:5,marginRight:10,
        flex:7,
        //paddingLeft: 5, paddingRight: 10
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
        color: TextColor,
        //alignSelf:'flex-end',

        ///padding and width put due to oppo  mob bcoz text cutt off
       // width:'78%',
        paddingRight:1,
        
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
 // width: screenWidth * 0.35,
// height: screenHeight * 0.2,
      //    width:RFValue(110),
      //    height:RFValue(110),
      // alignItems:'center',
      // justifyContent:'center',
       marginTop:10,
      // flex:3
// padding: 5,
    },
    avatar:{
        width: '100%',
        height: '100%',
        
    }
})