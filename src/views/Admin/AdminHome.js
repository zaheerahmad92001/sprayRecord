import React, { Component } from 'react';
import {
    View,StyleSheet,Dimensions,FlatList,
    Text,TouchableOpacity,Keyboard,ActivityIndicator
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import AdminProductList from '../../Components/Common/AdminProductList'
import Autocomplete from 'react-native-autocomplete-input';
import AdminSearchList from '../../Components/Common/AdminSearchList';
import { TextColor,MenuTextColor } from '../../Constants/colors';
import { Drawer, Icon, Container, Content } from 'native-base';
import Sidebar from '../../Components/sidebar/menu';
import styles from '../Admin/styles';
import ProuductModal from '../../../Utils/modal/Product';

export default class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Product: '',dummySearch:'',
            SearchValue: '',loading:true,
        }
    }

    openDrawer = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            this.drawer && this.drawer._root && this.drawer._root.open();
        }, 500)
    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();
    };
    componentDidMount() {
        ProuductModal.ProductListing().then(
            (res) => {
              if(res.success){
                  this.setState({
                      Product:res.data.collection,
                      loading:false
                  })
              }else{
                  alert('server error')
              }
            }, (error) => {
             console.log('error',error)
            }
        )
    }

    renderProduct = ({ item }) => {
        return (
            < AdminProductList
                // Id={item.Id}
                 qty={item.quantity}
                // name={item.name}
                // key={item.Id}
                Id ={item.id}
                name={item.title}
                price={item.price}
                img={item.default_image}
               // img={'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg'}
                navigation={this.props.navigation}
            />
        )
    };
    renderAdminSearchList = ({ item }) => {
        return (
            < AdminSearchList
                Id={item.id}
                qty={item.quantity}
                name={item.title}
                key={item.Id}
                img={item.default_image}
                navigation={this.props.navigation}
            />
        )
    };

    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { Product } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return Product.filter((product) => product.title.search(regex) >= 0);
    }

    render() {
  
        const { Product,loading ,SearchValue,dummySearch } = this.state;
        console.log('response',Product)
        //const {SearchValue} = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Drawer ref={(ref) => this.drawer = ref}
                content={<Sidebar navigation={this.props.navigation} drawerClose={this.closeDrawer} />}
                navigation={this.props.navigation}
                onClose={() => this.closeDrawer()}
                panOpenMask={0.2}
                negotiatePan={true}
                tapToClose={true}
            //side='right'
            >
                <Container>
                    <_Header
                        ImageLeftIcon={'menu'}
                        LeftPress={() => { this.openDrawer() }}
                        HeadingText={'Available Products'} />
{loading ?
                    <View style={styles.SearchView}>
                        <Autocomplete
                            style={styles.AutocompleteStyle}
                            autoCapitalize="none"
                            hideResults={true}
                            autoCorrect={false}
                            autoFocus={false}
                            inputContainerStyle={{ borderWidth: 0, }}
                            listStyle={{ borderWidth: 0, }}
                          //  data={matchedproduct.length >= 1 && comp(dummySearch, matchedproduct[0].title) ? [] : matchedproduct}
                            defaultValue={dummySearch}
                            onChangeText={(text) => this.setState({ dummySearch: text })}
                            placeholder="Search "
                            placeholderTextColor={TextColor}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ dummySearch: item.title })}>
                                    <Text style={styles.itemText}>{item.title}</Text>
                                </TouchableOpacity>
                            )}>
                        </Autocomplete>
                        <Icon
                            style={styles.IconStyle}
                            name={'ios-search'}
                            type={'Ionicons'}
                        />
                    </View>
                    :
                     <View style={styles.SearchView}>
                     <Autocomplete
                         style={styles.AutocompleteStyle}
                         autoCapitalize="none"
                         hideResults={true}
                         autoCorrect={false}
                         autoFocus={false}
                         inputContainerStyle={{ borderWidth: 0, }}
                         listStyle={{ borderWidth: 0, }}
                         data={matchedproduct.length >= 1 && comp(SearchValue, matchedproduct[0].title) ? [] : matchedproduct}
                         defaultValue={SearchValue}
                         onChangeText={(text) => this.setState({ SearchValue: text })}
                         placeholder="Search "
                         placeholderTextColor={TextColor}
                         renderItem={({ item }) => (
                             <TouchableOpacity onPress={() => this.setState({ SearchValue: item.title })}>
                                 <Text style={styles.itemText}>{item.title}</Text>
                             </TouchableOpacity>
                         )}>
                     </Autocomplete>
                     <Icon
                         style={styles.IconStyle}
                         name={'ios-search'}
                         type={'Ionicons'}
                     />
                 </View> 
        }
                    <View style={{ flex: 1, marginTop: 10 }}>
                          { loading ? 
                          <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                          <ActivityIndicator
                          color={MenuTextColor}
                          size={'large'}
                          /> 
                          </View>
                          :
                         this.state.SearchValue === '' ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={Product}
                                keyExtractor={(item) => item.Id}
                                renderItem={this.renderProduct}
                                numColumns={2}>
                            </FlatList> :
                            
                            matchedproduct.length >= 1 ?
                                <FlatList
                                    data={matchedproduct}
                                    keyExtractor={(item) => item.Id}
                                    renderItem={this.renderAdminSearchList}
                                    key={1}
                                    numColumns={1}
                                    showsVerticalScrollIndicator={false}
                                     /> :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.NotFound}>No Search Result</Text>
                                </View>
                        } 
                    
                    </View>

                </Container>
            </Drawer>
        )
    }
}
