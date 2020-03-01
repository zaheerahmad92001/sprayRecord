//import requests from '../Utils/requestRoutes.json';
import requests from '../Utils/requestRoutes.json';
import AsyncStorage from '@react-native-community/async-storage';
const BaseURL = 'http://www.daniyalrentacars.com/en/api';
let USER ='';
let authToken ='';

export function requestHandler(url,Data){

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
let {route,req} = setUpRequest(url, authToken, Data);
  
 return new Promise((resolve, reject) => {
    console.log("Sending request to: ", BaseURL + route)
    fetch(BaseURL + route, req)
      .then(response => response.json())
      .then((res) => {
         console.log('request successfully submitted',res);
          resolve(res);
        })
      .catch( (error) => {
        console.log('error while submitting request', error)  
        reject(error);
        });
  });

}

function setUpRequest(url, token ,Data){
    let route = null;
    let req = null;

    if(requests[url].method==='GET'){
        req={
            method:'GET',
            headers:{
                 'Accept':'application/json,text/plain',
                'Content-Type': 'application/json',
                'authorization':token
               // 'authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzMiwiaXNzIjoiaHR0cDovL3d3dy5kYW5peWFscmVudGFjYXJzLmNvbS9lbi9hcGkvbG9naW4iLCJpYXQiOjE1ODE4NjI0OTIsImV4cCI6MTU4MTk0ODg5MiwibmJmIjoxNTgxODYyNDkyLCJqdGkiOiJoNU5UUEpTRkxVcXZNbG9rIiwiZmNtX3Rva2VuIjoiIiwidXNlcl9pZCI6MjMyfQ.jj6UEVVET-c-jPMo-Rb1qy-rSuPSzAaKXVwlW3Wvp5s'
            },
        }
        route = requests[url].route + '?' + new URLSearchParams({...Data}).toString()
        
    }
  else if(requests[url].method==='POST'){
    console.log('image wala data')
    if(requests[url].route==='/auth/image-upload'){
      req={
          method:'POST',
          headers:{
            'Accept': 'application/json,text/plain',
            //'Content-Type': 'application/json,multipart/form-data',
            // 'Content-Type':'application/json,multipart/form-data,boundary=--------------------------992868958103024010201038',
            'authorization':token
            //'authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIzMiwiaXNzIjoiaHR0cDovL3d3dy5kYW5peWFscmVudGFjYXJzLmNvbS9lbi9hcGkvbG9naW4iLCJpYXQiOjE1ODE2MjA4MDYsImV4cCI6MTU4MTcwNzIwNiwibmJmIjoxNTgxNjIwODA2LCJqdGkiOiJXYm9BakxpYlpodjNnOHhIIiwiZmNtX3Rva2VuIjoiIiwidXNlcl9pZCI6MjMyfQ.kZ5AZqWljaKAX8xvqMaX4gWhvRqo42zJh8IMKJxhYzU'
        },
           //body:JSON.stringify(Data)
           body:Data,
      } 
    }else{
      console.log('baki data')
      req={
        method:'POST',
        headers:{
          'Accept': 'application/json,text/plain',
          'Content-Type': 'application/json,multipart/form-data',
          'authorization':token
      },
         body:JSON.stringify(Data)
        // body:Data,
    } 
    }
       route=requests[url].route;  
       console.log('routeeeeee',route)
      console.log('data send to server ',Date)
  }
    return{route, req}
}