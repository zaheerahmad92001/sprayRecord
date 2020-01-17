import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    FlatList,
} from 'react-native';
import _Header from '../../Components/Common/AppHeader';
import { Content, Container } from 'native-base';
import _BottomSheet from '../../Components/Common/BottomSheet';
import PaymentList from '../../Components/Common/_paymentHistory';
import Modalize from 'react-native-modalize';
import styles from '../SearchView/styles';
import Dialog,
{
    DialogTitle,
    DialogContent,
    SlideAnimation,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import { buttonBGcolor, TextColor } from '../../Constants/colors';
const paymentList =
    [
        { Id: 1, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020', type: 'orderPrice', ordeNo: 1, batch_no: 'Qskxx23xxxxkmsjdfk' },
        { Id: 2, currentbalance: 40000, price: '2000', total: '42000', date: 'jan 21 2020', type: 'orderPrice', ordeNo: 1, batch_no: 'Wskxx23xxxxkjkalfd' },
        { Id: 3, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020', type: 'payment' },
        { Id: 4, currentbalance: 20000, price: '40000', total: '42000', date: 'jan 21 2020', type: 'orderPrice', ordeNo: 1, batch_no: 'Dskkx23xxxxkkjafld' },
        { Id: 5, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020', type: 'payment' },
        { Id: 6, currentbalance: 20000, price: '2000', total: '22000', date: 'jan 21 2020', type: 'payment' },
    ]
export default class SearchView extends Component {
    bottomSheet = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isDatePickerVisible: false,
            showBottomSheet: false,
            type: '',
            paymentDetail: '',
            paymentId: '',

        }
    }
    goBack = () => {
        this.props.navigation.pop();
    }
    callBottomSheet = (item) => {
        const scope = this;
        scope.setState({
            type: item.type,
            paymentDetail: item,
            paymentId: item.Id
        })
        scope.onOpenSheet();
    }
    onOpenSheet = () => {
        const bottomSheet = this.bottomSheet.current;
        if (bottomSheet) {
            this.setState({ showBottomSheet: true })
            bottomSheet.open();
        }
    };
    onCloseSheet = () => {
        this.setState({ showBottomSheet: false })
        if (this.bottomSheet.current) {
            this.bottomSheet.current.close();
        }
    };
    CallDialogBox = () => {
        this.setState({ visible: true })
    }
    CancelDialog = () => {
        this.setState({ visible: false });
    }
    _navigateTo = (routeName) => {
        const { paymentId, paymentDetail } = this.state;
        this.props.navigation.navigate(routeName, { paymentDetail })
        this.onCloseSheet();
    }
    Delete = () => {
        this.setState({ visible: false });
        this.onCloseSheet();
        alert(this.state.paymentId + 'deleted')
    }
    renderBottomSheet = () => {
        const { type } = this.state;
        return (
            <_BottomSheet
                _navigateTo={() => this._navigateTo('EditPayment')}
                CallDialogBox={() => this.CallDialogBox()}
                CancelSheet={() => this.onCloseSheet()} />
        )
    }
    renderPayments = ({ item }) => {
        return (
            <PaymentList
                item={item}
                key={item.Id}
                callBottomSheet={() => this.callBottomSheet(item)}
                navigation={this.props.navigation} />
        )
    }
    render() {
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Search Results'} />

                <View style={styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={paymentList}
                        keyExtractor={(item) => item.Id}
                        renderItem={this.renderPayments}
                        numColumns={1}
                        horizontal={false}
                    />
                </View>
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'right',
                    })}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                textStyle={styles.DialogOK_CancelButton}
                                text="CANCEL"
                                onPress={() => this.CancelDialog()} />
                            <DialogButton
                                textStyle={styles.DialogOK_CancelButton}
                                text="OK"
                                onPress={() => this.Delete()} />
                        </DialogFooter>
                    }
                    dialogTitle={
                        <DialogTitle
                            textStyle={styles.DialogTitleStyle}
                            title="Payment"
                            style={{ backgroundColor: buttonBGcolor, color: 'white' }} />}>
                    <DialogContent
                        style={{ width: 300 }}>
                        <Text style={styles.DialogText}>Do you want to Delete? Action can`t Undo</Text>
                    </DialogContent>
                </Dialog>
                <Modalize
                    adjustToContentHeight
                    ref={this.bottomSheet}
                    onClosed={this.onClosed} >
                    {this.renderBottomSheet()}
                </Modalize>
            </Container>
        )
    }
}
