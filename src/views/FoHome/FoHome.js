import React, { Component } from 'react';
import {
    View,ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import FoProductList from '../../Components/Common/FoProductList';
import Autocomplete from 'react-native-autocomplete-input';
import FoSearchList from '../../Components/Common/FoSearchList';
import {TextColor, MenuTextColor } from '../../Constants/colors';
import styles from '../FoHome/styles';
import {Icon, Container}from 'native-base';
import ProuductModal from '../../../Utils/modal/Product';

export default class FoHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product: '',dummySearch:'',
            SearchValue: '',loading:true,
        }
    }
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
    _Navigation = (rootName) => {
        this.props.navigation.navigate(rootName)
    }

    renderProduct = ({ item }) => {
        return (
            < FoProductList
                qty={item.quantity}
                Id ={item.id}
                name={item.title}
                price={item.price}
                img={item.default_image}
                weight={item.weight}
                unit={item.unit}
                navigation= {this.props.navigation}
            />
        )
    };
    renderFoSearchList = ({ item }) => {
        return (
            < FoSearchList
            Id={item.id}
            qty={item.quantity}
            name={item.title}
            key={item.Id}
            img={item.default_image}
            weight={item.weight}
            unit={item.unit}
            navigation={this.props.navigation}
            />
        )
    };

    findProduct(query) {
        if (query === '') {
            return [];
        }
        const {Product} = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return Product.filter((product) => product.title.search(regex) >= 0);
    }

    render() {
        const { Product,dummySearch,SearchValue,loading } = this.state;
        const matchedproduct = this.findProduct(SearchValue);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this._Navigation('Landing')}
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
                    
               <View style={{ flex: 1, marginTop: 0, }}>
                        {loading ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
                                        renderItem={this.renderFoSearchList}
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
        )
    }
}
