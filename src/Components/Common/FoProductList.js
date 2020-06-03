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
        const { qty, Id, name, price, img, weight, unit } = this.props;
        return (
            <TouchableOpacity
                style={styles.Container}
                onPress={() => this.props.navigation.navigate('ProductDetail', {
                    item: {
                        Id: Id,
                        from: 'admin'
                    }
                })}
            >
                <Image style={styles.imageStyle}
                        source={{ uri: IMAGEURL + img }} />
                <View style={{marginHorizontal:5}}>
                    
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1 }}>
                         <Text style={styles.name}>{name}</Text>
                        </View>
                    <Text style={styles.name}>{weight}</Text>
                    <Text style={styles.name}>{unit}</Text> 
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.name}>Qty</Text>
                        <Text style={styles.name}>{qty}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            // <TouchableOpacity style={styles.Container}
            //     onPress={() => this.props.navigation.navigate('ProductDetail', {
            //         item: {
            //             Id: Id,
            //             from: 'admin'
            //         }
            //     })}
            // >


            //     <Image style={styles.imageStyle}
            //            source={{ uri: IMAGEURL + img }}/>
            //     <View style={{ marginTop: 0, paddingHorizontal: 5,}}>
            //         {/* <Text>kdjk ak aljlakj akfda fjkalfdalfj alkorlksdlg;poirpw dfdf[pfaep;fvkdl;gg kljilejglk zaheer</Text> */}
            //         <View style={{ flexDirection: 'row',}}>
            //             <Text style={styles.name}>{name}</Text>
            //             <View style={{ flexDirection: 'row' }}>
            //                 <Text style={styles.name}>{weight}</Text>
            //                 <Text style={styles.name}>{unit}</Text>
            //             </View>
            //         </View>
            //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
            //             <Text style={styles.name}>Qty</Text>
            //             <Text style={styles.name}>{qty}</Text>
            //         </View>
            //     </View>
            // </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        borderWidth: 1,
        borderColor: borderColor, 
        flex: 0.5,
        marginHorizontal: 3,
        marginBottom:5,
        paddingBottom:10,
        paddingTop:0, 
    },
    name: {
        color: TextColor,
        fontFamily: 'Poppins',
        fontSize: RFValue(14),
        fontStyle: 'normal',
        fontWeight: '500',
    },
    imageStyle: {
        width:'100%',
        height: RFValue(150),
        alignSelf: 'center',
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