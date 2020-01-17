import React, { Component } from 'react';
import {
    View, Text
} from 'react-native';
import _Header from '../../../Components/Common/AppHeader';
import { Content, Container } from 'native-base';
export default class EditPaidAmount extends Component {
    goBack=()=>{
        this.props.navigation.pop();
    }
    render() {
        return (
            <Container>
                <_Header
                    ImageLeftIcon={'keyboard-backspace'}
                    LeftPress={() => this.goBack()}
                    HeadingText={'Edit Paid amount'} />
            </Container>
        )
    }
}