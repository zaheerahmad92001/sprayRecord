//import requests from '../Utils/requestRoutes.json';
import requests from '../Utils/requestRoutes.json';
import AsyncStorage from '@react-native-community/async-storage';
const BaseURL = 'http://www.daniyalrentacars.com/en/api';
let USER ='';
let authToken ='';

export function requestHandler(url,Data,pageNO){

  AsyncStorage.getItem('user').then((value)=>{
    USER = JSON.parse(value)
    console.log('user token',USER.token)
 })

 try{
   authToken= USER.token
   console.log('auth token',authToken)
 }catch(error){
 console.log('can find user token',error)
 }
let {route,req} = setUpRequest(url, authToken, Data ,pageNO);
  
 return new Promise((resolve, reject) => {
    console.log("Sending request to: ", BaseURL + route)
    fetch(BaseURL + route, req)
      .then(response => response.json())
      .then((res) => {
         //console.log('request successfully submitted',res);
          resolve(res);
        })
      .catch( (error) => {
        console.log('error while submitting request', error)  
        reject(error);
        });
  });

}

function setUpRequest(url, token ,Data ,pageNO){
    let route = null;
    let req = null;
    if(requests[url].method==='GET'){
        req={
            method:'GET',
            headers:{
                 'Accept':'application/json,text/plain',
                'Content-Type': 'application/json',
                'authorization':token
            },
        }
        route = requests[url].route + '?' + new URLSearchParams({...Data}).toString()
        console.log('get request',route)
    }
  else if(requests[url].method==='POST'){
    if(requests[url].route==='/auth/image-upload'){
      req={
          method:'POST',
          headers:{
            'Accept': 'application/json,text/plain',
            'authorization':token
        },
           body:Data,
      } 
    }else if(requests[url].route==='/auth/filter-sale'){
      req={
        method:'POST',
        headers:{
          'Accept': 'application/json,text/plain',
          'Content-Type': 'application/json,multipart/form-data',
          'authorization':token
      },body:JSON.stringify(Data)
    } 

    }else{
      req={
        method:'POST',
        headers:{
          'Accept': 'application/json,text/plain',
          'Content-Type': 'application/json,multipart/form-data',
          'authorization':token
          },body:JSON.stringify(Data)
       } 
    }
    if(requests[url].route==='/auth/filter-sale'){
      route = requests[url].route + '?' +'page'+'='+pageNO,
      console.log('route',route)
    }else{
       route=requests[url].route; 
      } 
      console.log('routeeeeee',route)
      console.log('data send to server ',JSON.stringify(Data))
  }
    return{route, req}
}