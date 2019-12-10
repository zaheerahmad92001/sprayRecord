import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import _Header from '../Components/Common/AppHeader';
import { BGColor, TextColor, } from '../Constants/colors';
import { TextFont } from '../Constants/fontsize';
import Sidebar from '../Components/sidebar/menu'; 
import { Drawer } from 'native-base';
import _ProductNameCount from '../Components/Common/ProductNameCount/ProductList';

const myProduct =
    [
        { Id: 1, ProductName: 'ABC', Count: 22 },
        { Id: 2, ProductName: 'DEF', Count: 22 },
        { Id: 3, ProductName: 'GHI', Count: 22 },
        { Id: 4, ProductName: 'JKL', Count: 22 },
        { Id: 5, ProductName: 'MNP', Count: 22 },
        { Id: 6, ProductName: 'ABC', Count: 22 },
        { Id: 7, ProductName: 'DEF', Count: 22 },
        { Id: 8, ProductName: 'GHI', Count: 22 },
        { Id: 9, ProductName: 'JKL', Count: 22 },
        { Id: 10, ProductName: 'MNP', Count: 22 },
        { Id: 11, ProductName: 'ABC', Count: 22 },
        { Id: 12, ProductName: 'DEF', Count: 22 },
        { Id: 13, ProductName: 'GHI', Count: 22 },
        { Id: 14, ProductName: 'JKL', Count: 22 },
        { Id: 15, ProductName: 'MNP', Count: 22 },
    ]

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export default class indexFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Product: myProduct,
        }
    }

    openDrawer() {
        this.drawer._root.open()
    };
    closeDrawer() {
        this.drawer._root.close()
    };

    renderProduct = ({item})=>{
  return(
    < _ProductNameCount
      Id = {item.Id} 
      ProductName ={item.ProductName}
      Count = {item.Count}
      key={item.Id}
      
      />
  )
    }

   
    render() {
        const {Product} = this.state;

        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar navigation={this.props.navigation} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
            //side='right'
            >
                <SafeAreaView style={styles.container}>
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftButton={() => this.openDrawer()}
                        HeaderText={'Index'}
                    />

                    <View style={{flex:0.9}}>
                       <FlatList
                       data = {Product}
                       keyExtractor= {(item)=> item.Id}
                       renderItem = {this.renderProduct}

                       >

                       </FlatList>
                    </View>

                    <View style={styles.bottomBtn}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    addPopup: true
                                })
                            }}
                           
                            style={styles.AddListTouchable}>
                            <Text style={styles.AddProductText} >AddProduct</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </Drawer>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: BGColor,
        height:screenHeight*1,

    },
    bottomBtn: {
        bottom: 24,
        marginTop:20,
        flex: 0.1,
        justifyContent: 'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,


    },
    AddListTouchable: {
        
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 10
    },
    AddProductText: {
        textAlign: 'center',
        color: TextColor,
        fontSize: TextFont,
        fontFamily: 'Poppins'
    },
})