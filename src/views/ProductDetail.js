import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    FlatList,
    Text,
    Image,
    TextInput,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import Dialog,
{
    DialogTitle,
    DialogContent,
    SlideAnimation,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import { Item, Card, Container, Content, Icon } from 'native-base';
import { TextFont_Search } from '../Constants/fontsize';
import { BGColor, CountColor, TextColor, buttonBGcolor } from '../Constants/colors';
import _Header from '../Components/Common/AppHeader';
import Text_Input from '../Components/Common/inputField';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor } from '../Constants/colors';
import Swiper from 'react-native-page-swiper';
import Modal from "react-native-modal";

//import Swiper from "react-native-custom-swiper";
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        console.log("props asad",this.props)
        this.param = this.props.navigation.getParam('item'),
            this.state = {
                name: this.param.name,
                qty: this.param.qty,
                price: null,
                desc: null,
                Edit: true,
                visible: false,
                isModalVisible: false,
                URL:null,
                imgArray: [
                    require('../assets/image/3.jpg'),
                    require('../assets/image/1.jpg'),
                    //require('../assets/image/2.jpg'),
                    require('../assets/image/p.png'),

                ],
            }
    }

    CallDialogBox = () => {
        this.setState({
            visible: true,
        })
    }
    CancelDialog = () => {
        this.setState({
            visible: false
        })
    }
    Delete = () => {
        this.setState({
            visible: false,
        })
    }
    Save = () => {
        this.setState({ Edit: true })
    }
    Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    setModalVisible = (visible,url) => {
        this.setState({
            isModalVisible: visible,
            URL:url,
            
        });
    };
 setModalHide=(Hide)=>{
    this.setState({
        isModalVisible:Hide
    })
}

    render() {
        const {URL,imgArray} = this.state;
        console.log('image URL',URL)
        console.log('Image Array',this.state.imgArray[1])
        return (

            <Container style={{ width: ScreenWidth * 1 }}>
            {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
                <Content style={styles.container}>
               
                    {/* <ImageBackground
                         source={require('../assets/image/3.jpg')}
                        style={{ width:ScreenWidth, height: ScreenHeight * 0.4,}} >
                        <View style={styles.ButtonStyle}>
                            <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('AdminHome')}
                            >
                                <View style={[styles.uperView]}>
                                    <Icon
                                        style={[styles.IconStyle]}
                                        type="MaterialIcons"
                                        name="arrow-back" >
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground> */}
                    <Swiper showsButtons={true} pager={true} activeDotColor={'blue'} threshold={25}>
                        <TouchableOpacity style={styles.slide1}
                         onPress={() => this.setModalVisible(true,this.state.imgArray[0])}>
                            <Image
                                source={this.state.imgArray[0]}
                                style={{ width: ScreenWidth, height: ScreenHeight * 0.4, }}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.slide1}
                         onPress={() => this.setModalVisible(true,this.state.imgArray[1])}>
                            <Image
                                source={this.state.imgArray[1]}
                                style={{ width: ScreenWidth, height: ScreenHeight * 0.4, }}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.slide1}
                         onPress={() => this.setModalVisible(true,this.state.imgArray[2])}>
                            <Image
                                source={this.state.imgArray[2]}
                                style={{ width: ScreenWidth, height: ScreenHeight * 0.4, }}/>
                        </TouchableOpacity>
                    </Swiper>

                    <View style={styles.descriptionView}>
                        <Text style={styles.name}>SandaPhas</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.quantity}>Total Quantity</Text>
                            <Text style={[styles.quantity,{fontWeight:'bold'}]}>2500</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.quantity}>Available Quantity</Text>
                            <Text style={[styles.quantity,{fontWeight:'bold'}]}>1213</Text>
                        </View>
                    </View>
                    <View style={[styles.descriptionView, { marginTop: 10 }]}>
                        <Text style={styles.name}>Description :</Text>
                        <Text>aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj
                        aka lkajkfla akjfkaljfkalfjkla lkajklajflaloil;sald;'akrpoqwei ;sdfldv;ladskjn oigiopwekkldxjvklsdfjhgoisd flkdj fvkldsdjpsdfl kdscv.kslj

                         </Text>
                    </View>


                    <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn="slideInUp"
                    coverScreen={true}
                    animationInTiming={700}
                    animationOutTiming={500}
                    presentationStyle={"formSheet"}
                    onBackButtonPress={()=>this.setModalVisible(!this.state.isModalVisible)}
                    onBackdropPress={()=>this.setModalVisible(!this.state.isModalVisible)}
                    onSwipeComplete={() => this.setModalVisible(!this.state.isModalVisible)}
                    swipeDirection={['up','down','left','right']}>
                    <View style={styles.Modalstyling}>
                       <Image
                       style={{width:'100%',height:'90%',}}
                       source={this.state.URL}
                       />
            <Text style={[styles.name,{paddingVertical:10}]}>SundaPhas</Text>
                    </View>

                </Modal>

                </Content>
            </Container>


        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Input: {
        paddingVertical: 10,
    },
    EditDelete: {
        backgroundColor: buttonBGcolor,
        paddingVertical: 10,
        borderRadius: 10,
    },
    EditDeleteText: {
        textAlign: "center",
        color: 'white',
        fontWeight: '700',
        fontSize: RFValue(12),
        fontStyle: 'normal'
    },
    DialogText: {
        fontSize: RFValue(18),
    },
    DialogOK_CancelButton: {
        color: TextColor,
        fontSize: RFValue(12),
        fontStyle: 'normal',
        fontWeight: '600',
        fontFamily: 'Poppins'
    },
    uperView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: RFValue(30),
        backgroundColor: buttonBGcolor,
        width: RFValue(30),
        borderRadius: 30 / 2,
    },
    ButtonStyle: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    IconStyle: {
        fontSize: 20,
        color: 'white',
    },
    descriptionView: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: borderColor
    },
    name: {
        fontWeight: '700',
        fontFamily: 'Poppins',
        fontStyle: 'italic',
        fontSize: RFValue(14),
        color: TextColor
    },
    quantity: {
        fontWeight: '500',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: RFValue(14),
        color: TextColor,
        paddingTop: 5
    },

    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        marginTop:23,
        width: ScreenWidth, height: ScreenHeight * 0.4,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    Modalstyling: {
          width: "100%",
      // width:ScreenWidth,
        height: ScreenHeight*0.7,
        backgroundColor: 'white',
        paddingTop:10,
        
        //justifyContent: "center"s,
        alignItems: "center",
    }


})

 