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
import { TextFont_Stnadered } from '../../Constants/fontsize';
import { CountColor, borderColor, TextColor } from '../../Constants/colors'
import { RFValue } from 'react-native-responsive-fontsize';
import { IMAGEURL } from '../../RandFunction';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class FoProductList extends Component {
    render() {
        const { qty, Id, name,price,img } = this.props;
        return (
            <TouchableOpacity style={{ width: ScreenWidth * 0.47, borderWidth: 1, borderColor:borderColor, marginHorizontal: 5, marginBottom: 5, paddingVertical: 10 }}
                onPress={() => this.props.navigation.navigate('ProductDetail', {
                    item: {
                        Id: Id,
                        from:'fo'
                    }
                })}
                >
                <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                    <Image style={styles.imageStyle}
                        source={{uri:IMAGEURL+img}}
                         />
                </View>

                <View style={{ marginTop: 10, paddingHorizontal: 10, }}>
                    {/* <Text>kdjk ak aljlakj akfda fjkalfdalfj alkorlksdlg;poirpw dfdf[pfaep;fvkdl;gg kljilejglk zaheer</Text> */}
                    <Text style={styles.name}>{name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between',marginTop:3}}>
                        <Text style={styles.name}>Qty</Text>
                    <Text style={styles.name}>{qty}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    // render() {
    //     const {qty, id, name }= this.props;
    //     return (
    //         <TouchableOpacity style={styles.Container}>
    //             <Card style={styles.cardStyle}>
    //                 <View style={styles.imageView} >
    //                     <Image
    //                         style={styles.imageStyle}
    //                         source={require('../../assets/image/1.jpg')}
    //                     />
    //                 </View>
                   
    //                 <View style={styles.priceAvailableView}>
    //                     <Text style={styles.heading}>
    //                         Name
    //                       </Text>
    //                     <Text style={styles.count}>
    //                         {name}
    //                       </Text>
    //                 </View>
                    
    //                 <View style={styles.priceAvailableView}>
    //                     <Text style={styles.heading}>
    //                         Quantity
    //                       </Text>
    //                     <Text style={styles.count}>
    //                         {qty}
    //                       </Text>

    //                 </View>
    //             </Card>
    //         </TouchableOpacity>
    //     )
    //}


}
// const styles =StyleSheet.create({
//      Container:{
//           justifyContent: 'center',
//           paddingHorizontal: 5,
//           flex:1,
//     },
//     imageStyle:{
//         width: 90, 
//         height: 90,
         
//     },
//     imageView:{
//         justifyContent: 'center', 
//         alignItems: 'center'
//     },
//     priceAvailableView:{
//         flexDirection: 'row',
//          justifyContent: 'space-around'
//     },
//     heading:{
//         fontSize: TextFont_Stnadered,
//          fontWeight: 'bold',
//           paddingHorizontal: 10,
//            color: CountColor
//     },
//     count:{
//         fontSize: TextFont_Stnadered, 
//         fontWeight: 'bold',
//          color: CountColor
//     },
//     cardStyle:{
         
//         borderRadius: 10,
//         paddingVertical:10,
//         marginLeft:2
        
//            }

// })
const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        paddingHorizontal: 3,
        flex: 1,
    },
    name:{
     color:TextColor,
     fontFamily:'Poppins',
     fontSize:RFValue(14),
     fontStyle:'normal',
     fontWeight:'500',
    },
    imageStyle: {
        //backgroundColor:'pink',
        //width: ScreenHeight*0.23,
       // height: ScreenHeight*0.22
       width:RFValue(140),
       height:RFValue(140)

    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceAvailableView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: TextFont_Stnadered,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3,
        color: CountColor
    },
    count: {
        fontSize: TextFont_Stnadered,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3,
        color: CountColor
    },
    cardStyle: {

        //borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 5,
        //marginLeft:2,
        borderColor: borderColor,
        borderWidth: 1

    }

})