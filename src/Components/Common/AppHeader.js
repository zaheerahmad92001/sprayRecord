
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
    StatusBar,
    View,
    Image,
    Text
} from 'react-native';

import { Card, CardItem, Thumbnail, Left, Body, Right, Button, Header, Icon } from 'native-base';
import { StatusColor, HeaderColor, HeadingColor } from '../../Constants/colors';
import { HeadingFont } from '../../Constants/fontsize';
const _Header = (props) => {
    return (
        <Header noShadow transparent>
            <StatusBar backgroundColor={StatusColor} barStyle="dark-content" />
            <Left style={{flex:1,marginLeft:10}}>
		 			<Button transparent onPress={props.LeftPress?props.LeftPress:null}>
		 			{!props.ImageLeftIcon?
		 			<Thumbnail small square
		 					style={{ width: 23, height: 23, resizeMode:"contain" }}
		 					source={props.ImageLeft} />:

		 			<Icon name={props.ImageLeftIcon} type="MaterialIcons" style={{fontSize:RFValue(24),color:'#141250'}}/>}
		 			</Button>
		 	</Left>
			<Body style={{ flex: 3,alignItems:'center' }}>
				<Text style={styles.dashboardHeading}>{props.HeadingText}</Text>
			</Body>
			<Right style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
			<Button transparent onPress={props.RightPress?props.RightPress:null}>
		 			{!props.ImageRightIcon?
		 			<Thumbnail small square
		 					style={{ width: 23, height: 23, resizeMode:"contain" }}
		 					source={props.ImageRight} />:

		 			<Icon name={props.ImageRightIcon} type="MaterialIcons" style={{fontSize:RFValue(24),color:'#141250'}}/>}
		 			</Button>
			</Right>
        </Header>
    )
}
export default _Header;
const styles = StyleSheet.create({
    HeaderHeading: {
        color: HeadingColor,
        fontSize: HeadingFont,
	},
	dashboardHeading:{
		color:HeadingColor,
		fontSize:HeadingFont,
		fontWeight:'500',

	}
})