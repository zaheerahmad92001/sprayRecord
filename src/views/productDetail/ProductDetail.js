import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Container, Content } from 'native-base';
import _Header from '../../Components/Common/AppHeader';
import Swiper from 'react-native-page-swiper';
import Modal from "react-native-modal";
import styles from '../productDetail/styles';
import ProuductModal from '../../../Utils/modal/Product';
import { RFValue } from 'react-native-responsive-fontsize';
import { MenuTextColor } from '../../Constants/colors';
import { IMAGEURL } from '../../RandFunction';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        //  console.log("props asad",this.props)
        this.param = this.props.navigation.getParam('item'),
            this.state = {
                // name: this.param.name,
                // qty: this.param.qty,
                // price: null,
                from: this.param.from,
                // desc: null,
                // Edit: true,
                // visible: false,
                isModalVisible: false,
                URL: null,
                // imgArray: [],
                data: [],
                loading: true,
                // dataLoaded: false

                // require('../../assets/image/3.jpg'),
                // require('../../assets/image/1.jpg'),
                // //require('../assets/image/2.jpg'),
                // require('../../assets/image/p.png'),


            }
    }

    componentDidMount() {
        const scope = this;

        ProuductModal.ProductDetails(scope.param.Id).then(
            (res) => {
                if (res.success) {
                    this.setState({
                        imgArray: res.data.collection.productImages,
                        data: res.data.collection,
                        loading: false,
                        // dataLoaded: true
                    })
                    //  alert('success')
                } else {
                    alert('server error')
                }
            }, (error) => {
                console.log('Product details error', error)
                alert('fail')
            })
    }

    Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }
    setModalVisible = (visible, url) => {
        this.setState({
            isModalVisible: visible,
            URL: url,
        });
    };
    setModalHide = (Hide) => {
        this.setState({
            isModalVisible: Hide
        })
    }

    render() {
        const { URL, from, data, loading, dataLoaded } = this.state;
        console.log('image', data.default_image)
        return (
            <View style={{ flex: 1, }}>
                {loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            size={'large'}
                            color={MenuTextColor}
                        />
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 4, backgroundColor: MenuTextColor, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.setModalVisible(true, IMAGEURL + data.default_image)}>
                                <Image
                                    style={{ width: ScreenWidth, height: ScreenHeight * 0.4, marginTop: RFValue(20) }}
                                    source={{ uri: IMAGEURL + data.default_image }}>
                                </Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 6, marginTop: RFValue(10) }}>
                            <View style={styles.descriptionView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.name}>{data.title}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.quantity, { marginHorizontal: RFValue(10), paddingTop: 0 }]}>{data.weight}</Text>
                                        <Text>{data.unit}</Text>
                                    </View>
                                </View>
                                {/* {from==='admin' ? */}
                                <View>
                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.quantity}>Total Quantity</Text>
                            <Text style={[styles.quantity,{fontWeight:'bold'}]}>2500</Text>
                        </View> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.quantity}>Available Quantity</Text>
                                        <Text style={[styles.quantity, { fontWeight: 'bold' }]}>{data.quantity}</Text>
                                    </View>
                                </View>
                                {/* : null} */}
                            </View>
                            <View style={styles.borderBottom}></View>
                            <View style={[styles.descriptionView, { marginTop: RFValue(5) }]}>
                                <Text style={styles.name}>Description :</Text>
                                <Text style={styles.quantity}>{data.short_description}</Text>
                            </View>
                        </View>
                        <Modal
                            isVisible={this.state.isModalVisible}
                            animationIn="slideInDown"
                            coverScreen={true}
                            animationInTiming={700}
                            animationOutTiming={500}
                            presentationStyle={"formSheet"}
                            onBackButtonPress={() => this.setModalVisible(!this.state.isModalVisible)}
                            onBackdropPress={() => this.setModalVisible(!this.state.isModalVisible)}
                            onSwipeComplete={() => this.setModalVisible(!this.state.isModalVisible)}
                            swipeDirection={['up', 'down', 'left', 'right']}>
                            <View style={styles.Modalstyling}>
                                <Image
                                    style={{ width: '100%', height: '90%', }}
                                    source={{ uri: URL }}
                                />
                                <Text style={[styles.name, { paddingVertical: 10 }]}>{data.title}</Text>
                            </View>

                        </Modal>
                    </View>
                }
            </View>

            //         <Container style={{ width: ScreenWidth * 1 }}>
            //             {loading ?
            //             <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            //               <ActivityIndicator
            //               color={MenuTextColor}
            //               size={'large'}/>
            //             </View>:
            //             <Content style={styles.container}>
            //                 { dataLoaded ?
            //                 <Swiper showsButtons={true} pager={true} activeDotColor={'blue'} threshold={25}>
            //                     <TouchableOpacity style={styles.slide1}
            //                      onPress={() => this.setModalVisible(true,imgArray[0])}>
            //                         <Image
            //                             source={imgArray[0]}
            //                             style={{ width: ScreenWidth, height: ScreenHeight * 0.4, }}/>
            //                     </TouchableOpacity>

            //                     <TouchableOpacity style={styles.slide1}
            //                      onPress={() => this.setModalVisible(true,this.state.imgArray[1])}>
            //                         <Image
            //                             source={this.state.imgArray[1]}
            //                             style={{ width: ScreenWidth, height: ScreenHeight * 0.4, }}/>
            //                     </TouchableOpacity>

            //                     <TouchableOpacity style={styles.slide1}
            //                      onPress={() => this.setModalVisible(true,this.state.imgArray[2])}>
            //                         <Image
            //                             source={imgArray[2]}
            //                             style={{ width: ScreenWidth, height: ScreenHeight * 0.4, }}/>
            //                     </TouchableOpacity>
            //                 </Swiper>
            //                     :  alert('dataFailed')}
            //                 <View style={styles.descriptionView}>
            //                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}> 
            //                 <Text style={styles.name}>{data.title}</Text>
            //                 <View style={{flexDirection:'row'}}>
            //                 <Text style={[styles.quantity,{marginHorizontal:RFValue(10),paddingTop:0}]}>{data.weight}</Text>
            //                 <Text>{data.unit}</Text>
            //                 </View>
            //                 </View>
            //                     {/* {from==='admin' ? */}
            //                     <View>
            //                     {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            //                         <Text style={styles.quantity}>Total Quantity</Text>
            //                         <Text style={[styles.quantity,{fontWeight:'bold'}]}>2500</Text>
            //                     </View> */}
            //                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            //                         <Text style={styles.quantity}>Available Quantity</Text>
            //                         <Text style={[styles.quantity,{fontWeight:'bold'}]}>{data.quantity}</Text>
            //                     </View>
            //                     </View> 
            //                     {/* : null} */}
            //                 </View>

            //                 <View style={[styles.descriptionView, { marginTop: 10 }]}>
            //                     <Text style={styles.name}>Description :</Text>
            //                 <Text style={styles.quantity}>{data.short_description}</Text>
            //                 </View>


            //                 <Modal
            //                 isVisible={this.state.isModalVisible}
            //                 animationIn="slideInDown"
            //                 coverScreen={true}
            //                 animationInTiming={700}
            //                 animationOutTiming={500}
            //                 presentationStyle={"formSheet"}
            //                 onBackButtonPress={()=>this.setModalVisible(!this.state.isModalVisible)}
            //                 onBackdropPress={()=>this.setModalVisible(!this.state.isModalVisible)}
            //                 onSwipeComplete={() => this.setModalVisible(!this.state.isModalVisible)}
            //                 swipeDirection={['up','down','left','right']}>
            //                 <View style={styles.Modalstyling}>
            //                    <Image
            //                    style={{width:'100%',height:'90%',}}
            //                    source={this.state.URL}
            //                    />
            //                 <Text style={[styles.name,{paddingVertical:10}]}>SundaPhas</Text>
            //                 </View>

            //             </Modal>

            //             </Content>
            // }
            //         </Container>


        )
    }
}


