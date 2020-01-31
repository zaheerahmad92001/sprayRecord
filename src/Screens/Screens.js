import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../views/splash';
import IndexFile from '../views/indexFile';
import Landing from '../views/landingpage/landing';
import FoHome from '../views/FoHome/FoHome';
import ForgetPassword from '../views/forgetpassword/ForgetPassword';
import Login from '../views/login/login';
import AdminHome from '../views/Admin/AdminHome';
import ProductDetail from '../views/productDetail/ProductDetail';
import AddNewProduct from '../views/Addproduct/AddNewProduct';
import NewOrder from '../views/order/NewOrder';
import DailySale from '../views/sale/DailySale';
import OrderProducts from '../views/orderHistory/Product/orderProduct';
import SaleHistory from '../views/saleHistory/saleHistory';
import Orders from '../views/orderHistory/orderList';
import EditOrder from '../views/EditOrder/EditOrder';
import EditOrderProduct from '../views/EditOrder/editOrderProduct';
import Signup from '../views/signUp/Signup';
import ProductList from '../views/products/productList';
import EditProduct from '../views/EditProduct/EditProduct';
import payment from '../views/payment/payment';
import paymentHistory from '../views/payment/paymentHistory'; 
import EditPayment from '../views/payment/EditPayment';
import SearchView from '../views/SearchView';
import orderSearchView from '../views/orderSearchView';
import saleSearcView from '../views/saleSearchView';
import ReturnedProductList from '../views/ReturnedProductList';
import ReturnProducts from '../views/ReturnProduct';
import EditRetrunProducts from '../views/EditReturnProduct';

import { fromRight,fromBottom } from 'react-navigation-transitions';

const LoadingNavigator = createStackNavigator({
    Splas: Splash,
},
    {
        initialRouteName: 'Splas',
        transitionConfig: () => fromBottom(),
        headerMode: 'none',
    });
const AuthNavigator = createStackNavigator({
    Login: Login,
    Signup:Signup,
    ForgetPassword:ForgetPassword,
}, {
     initialRouteName: 'Login',
     transitionConfig:()=>fromBottom(),
     headerMode: 'none'
}
);
const AppNavigator = createStackNavigator({
   // IndexFile: IndexFile,
    Landing: Landing,
    FoHome: FoHome,
    AdminHome:AdminHome,
    ProductDetail:ProductDetail,
    // AddNewProduct:AddNewProduct,
    NewOrder:NewOrder,
    DailySale:DailySale,
    Orders:Orders,
    OrderProducts:OrderProducts,
    SaleHistory:SaleHistory,
    EditOrder:EditOrder,
    EditOrderProduct:EditOrderProduct,
    ProductList:ProductList,
    AddNewProduct:AddNewProduct,
    EditProduct:EditProduct,
    payment:payment,
    paymentHistory:paymentHistory,
    EditPayment:EditPayment,
    SearchView:SearchView,
    orderSearchView:orderSearchView,
    saleSearcView:saleSearcView,
    ReturnedProductList:ReturnedProductList,
    ReturnProducts:ReturnProducts,
    EditRetrunProducts:EditRetrunProducts,
},

    {
        initialRouteName: 'Landing',
       // initialRouteName:'AdminHome',
        transitionConfig: () => fromBottom(),
        headerMode: 'none',
    },
);
// const AddNewProductNavigator = createStackNavigator({
//     AddNewProduct:AddNewProduct,
// },
// {
//     initialRouteName: 'AddNewProduct',
//     headerMode: 'none',
// }
// )
const RootNavigator = createSwitchNavigator({
    LoadingNavigator,
    AuthNavigator,
    AppNavigator,
    //AddNewProductNavigator
},
    {
        initialRouteName: 'LoadingNavigator',
        transitionConfig: () => fromBottom(),
        headerMode: 'none',
        navigationOptions:{
            headerTransparent: true
        }
    });


export default createAppContainer(RootNavigator);