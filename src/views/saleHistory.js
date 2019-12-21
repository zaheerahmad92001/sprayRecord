import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { borderColor, TextColor, LIGHT_WHITE, buttonBGcolor, BBCOLOR } from '../Constants/colors';
import { Icon, Item, Container, Content, Drawer } from 'native-base';
import _Header from '../Components/Common/AppHeader';
import Sidebar from '../Components/sidebar/menu';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { TabView, SceneMap } from 'react-native-tab-view';
import Autocomplete from 'react-native-autocomplete-input';
import DateTimePicker from "react-native-modal-datetime-picker";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import _SaleHistory from '../Components/Common/saleHistory';
import { ScrollView } from 'react-native-gesture-handler';
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');
var radio_props = [
    { label: 'Daily', value: 0 },
    { label: 'Weekly', value: 1 },
    { label: 'Monthly', value: 2 }
];
// const myStock =
//     [
//         { Id: 1, qty: 22, name: 'Tryezophas' },
//         { Id: 2, qty: 21, name: 'Lemda' },
//         { Id: 3, qty: 22, name: 'Karatay' },
//         { Id: 4, qty: 24, name: 'Danydar' },
//         { Id: 5, qty: 25, name: 'PhasPhoras' },
//         { Id: 6, qty: 22, name: 'Jugni' },
//         { Id: 7, qty: 26, name: 'pqu' },
//         { Id: 8, qty: 24, name: 'akd' },
//         { Id: 9, qty: 22, name: 'ae' },
//         { Id: 10, qty: 28, name: 'adc' },
//         { Id: 10, qty: 28, name: 'adc' },
//     ]
    const sale_history =
    [
        { Id: 1,  name: 'Tryezophas',open:'1000',sale:'400',close:'600',date:'20-Aug-2019', },
        { Id: 2,  name: 'Lemda' ,open:'1000',sale:'400',close:'600',date:'20-Aug-2019',},
        { Id: 3,  name: 'Karatay' ,open:'1000',sale:'400',close:'600',date:'20-Aug-2019',},
        { Id: 4,  name: 'Danydar' ,open:'1000',sale:'400',close:'600',date:'20-Aug-2019',},
        { Id: 5,  name: 'PhasPhoras' ,open:'200',sale:'400',close:'600',date:'20-Aug-2019',},
        { Id: 6,  name: 'Jugni' ,open:'200',sale:'400',close:'600',date:'20-Aug-2019',},

    ]

// const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>

//     </View>
// );

// const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
// );
// const ThirdRoute = () => (
//     <View style={[styles.scene, { backgroundColor: 'blue' }]} />
// );

export default class SaleHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Stock: sale_history,
            input: '',
            matchedValue: sale_history,
            isDatePickerVisible: false,
           // Sale:sale_history,
            date: new Date(),
            report: 0,
            index: 0,
            routes: [
                { key: 'daily', title: 'Daily' },
                { key: 'weekly', title: 'Weekly' },
                { key: 'monthly', title: 'Monthly' },
            ],
        };
    }
    openDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.open();
    };
    closeDrawer = () => {
        this.drawer && this.drawer._root && this.drawer._root.close();

    };
    showDateTimePicker = (from) => {
        this.setState({ isDateTimePickerVisible: true });
    };
    handleDatePicked = date => {
        //let dateText = this.convertDateTimeToString(date)
        this.setState({ date: date });
        this.hideDateTimePicker();

    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    openDate(start) {
        this.showDateTimePicker(start);
    }
    findProduct(query) {
        if (query === '') {
            return [];
        }

        const { matchedValue } = this.state;
        const regex = new RegExp([query.trim()], 'i');
        return matchedValue.filter((Stock) => Stock.name.search(regex) >= 0);
    }
    renderSaleHistory = ({ item }) => {
        return (
            <_SaleHistory
               item={item}
                key={item.Id}
                navigation= {this.props.navigation} />
        )
    };
     
    render() {
        const { input, date, Stock ,Sale } = this.state;
        const matchedValue = this.findProduct(input);
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
                        LeftPress={() => this.openDrawer()}
                        HeadingText={'Sale History'} />
                    <View style={styles.radiobutton}>
                        <RadioForm
                            style={{justifyContent:'space-around',marginHorizontal:8,}}
                            radio_props={radio_props}
                            initial={0}
                            onPress={(value) => this.setState({ report: value })}
                            formHorizontal={true}
                            labelHorizontal={true}
                            labelColor={'red'}
                            buttonColor={buttonBGcolor}
                            selectedButtonColor={'blue'}
                            buttonInnerColor={'red'}
                            buttonOuterColor={'black'}
                            animation={true}
                            buttonWrapStyle={{ marginLeft: 10 }}
                            buttonSize={10}
                            labelStyle={{ fontSize: RFValue(13), color: 'black', paddingRight: 20 }}
                        />
                    </View>

                    <TouchableOpacity style={styles.startDContainer} onPress={() => this.openDate(true)}>
                        <View>
                            <Text style={styles.startDInput}>
                                {this.state.date.toString().slice(3, 16)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        is24Hour={false}
                        mode={'date'}
                        datePickerModeAndroid={'spinner'}
                        timePickerModeAndroid={'spinner'}
                        date={date}
                    />
                    <View style={styles.SearchView}>
                        <Autocomplete
                            style={styles.AutocompleteStyle}
                            autoCapitalize="none"
                            hideResults={true}
                            autoCorrect={false}
                            autoFocus={false}
                            inputContainerStyle={{ borderWidth: 0, }}
                            listStyle={{ borderWidth: 0, }}
                            data={matchedValue.length >= 1 && comp(input, matchedValue[0].name) ? [] : matchedValue}
                            defaultValue={input}
                            onChangeText={(text) => this.setState({ input: text })}
                            placeholder="Search "
                            placeholderTextColor={TextColor}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ input: item.name })}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}>
                        </Autocomplete>
                        <Icon
                            style={styles.IconStyle}
                            name={'ios-search'}
                            type={'Ionicons'} />
                    </View>


                    {/* <TabView
                       
                        navigationState={this.state}
                        renderScene={SceneMap({
                            daily: FirstRoute,
                            weekly: SecondRoute,
                            monthly: ThirdRoute,
                            
                        })}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        labelStyle={'green'}
                        style={{backgroundColor:'#333333'}}
                    /> */}
                    <View style={{ flex: 1,marginBottom:10 }}>
                    { input ==='' ?
                    <FlatList
                     showsVerticalScrollIndicator={false}
                     data={Stock}
                     keyExtractor={(item) => item.Id}
                     renderItem={this.renderSaleHistory}
                     numColumns={1}
                     horizontal={false}
                    /> :
                   matchedValue.length >=1 ?
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={matchedValue}
                    keyExtractor={(item) => item.Id}
                    renderItem={this.renderSaleHistory}
                    numColumns={1}
                    horizontal={false}
                    /> :
                <View style={{flex:1,justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.NotFound}>No Search Result</Text>
                </View>
                
                }
                  
                </View>

                </Container>
            </Drawer>

        )
    }
}
const styles = StyleSheet.create({
    scene: {
        width: ScreenWidth,
        height: ScreenHeight

    },
    SearchView: {
        width: ScreenWidth * 0.97,
        //paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: borderColor,
        paddingHorizontal: 10,
    },
    IconStyle: {
        width: RFValue(35),
        height: RFValue(40),
        fontSize: RFValue(30),
        marginTop: RFValue(10),

    },
    startDInput: {
        fontFamily: 'Poppins',
        fontSize: RFValue(16),
        width: '100%',
        color: 'black',
        fontSize: RFValue(16),
        backgroundColor: 'white',
        // paddingTop:10,
        // paddingLeft:10,
        // marginBottom:10,
    },
    startDContainer: {
        backgroundColor: 'white',
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 5,
        marginBottom: 5
    },
    // radiobutton:{ 
    //      paddingVertical: 10, 
    //      borderRadius:10,
    //      borderColor:borderColor,
    //      borderWidth:1 ,
    //      marginHorizontal:6,
    //      marginBottom:5,
    //  },
     NotFound: {
        fontSize: RFValue(20),
        color: '#d3d3d3',
        fontWeight: '700',
        alignSelf:'center'
    },

});