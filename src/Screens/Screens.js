import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../views/splash';
import IndexFile from '../views/indexFile';
import Landing from '../views/landing';
import FoHome from '../views/FoHome';
import ForgetPassword from '../views/ForgetPassword';
import Login from '../views/login';
import AdminHome from '../views/AdminHome';
import ProductDetail from '../views/ProductDetail';
import AddNewProduct from '../views/AddNewProduct';
import NewOrder from '../views/NewOrder';
import DailySale from '../views/DailySale';
import OrderHistory from '../views/orderHistory';
import SaleHistory from '../views/saleHistory';

const LoadingNavigator = createStackNavigator({
    Splas: Splash,

},
    {
        initialRouteName: 'Splas',
        headerMode: 'none',
    });
const AuthNavigator = createStackNavigator({
    Login: Login,
    ForgetPassword:ForgetPassword,
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
}
);
const AppNavigator = createStackNavigator({
   // IndexFile: IndexFile,
    Landing: Landing,
    FoHome: FoHome,
    AdminHome:AdminHome,
    ProductDetail:ProductDetail,
    AddNewProduct:AddNewProduct,
    NewOrder:NewOrder,
    DailySale:DailySale,
    OrderHistory:OrderHistory,
    SaleHistory:SaleHistory
},
    {
        initialRouteName: 'Landing',
        headerMode: 'none',
    },
);
const RootNavigator = createSwitchNavigator({
    LoadingNavigator,
    AuthNavigator,
    AppNavigator,
},
    {
        initialRouteName: 'LoadingNavigator',
        headerMode: 'none',
        navigationOptions:{
            headerTransparent: true
        }
    });


export default createAppContainer(RootNavigator);