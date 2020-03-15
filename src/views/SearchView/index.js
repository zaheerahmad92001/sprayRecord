import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList,
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { Content, Container } from 'native-base';
import _BottomSheet from '../../Components/Common/BottomSheet';
import PaymentList from '../../Components/Common/_paymentHistory';
import styles from '../SearchView/styles';
import { convertDateToString } from '../../RandFunction';

export default class SearchView extends Component {
    bottomSheet = React.createRef();
    constructor(props) {
        super(props);
        this.param = this.props.navigation.getParam('item'),
            this.state = {
                payments: [],
            }
    }
    componentDidMount() {
        const { date, paymentList } = this.param;
        //console.log('zaheeevalue',paymentList)
        let _payment = [];
        paymentList.map((value) => {
            let transactionDate = value.transaction_date
            transactionDate = convertDateToString(new Date(transactionDate * 1000))
            if (date === transactionDate) {
                _payment.push(value)
            }

        })
        this.setState({ payments: _payment })
    }
    goBack = () => {
        this.props.navigation.pop();
    }
    renderPayments = ({ item }) => {
        return (
            <PaymentList
                item={item}
                key={item.Id}
                navigation={this.props.navigation} />
        )
    }
    render() {
     const {payments} = this.state;
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Search Results'} />
                {payments.length>0 ?
                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={payments}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderPayments}
                        numColumns={1}
                        horizontal={false}
                    />
                </View>:
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                   <Text style={styles.NotFound}>No Search Results</Text>
                </View>
                }
            </Container>
        )
    }
}
