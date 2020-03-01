import { Component } from "react";
import { requestHandler } from "../requestHandler";

export default class AuthModal extends Component{

    static Login(email,pass){
      return requestHandler('login',{
          email:email,
          password:pass
      })
    };
    static SignUp(fname,lname,email,pass,confirmPass,phoneNum,roleId){
        return requestHandler('register',{
            first_name:fname,
            last_name:lname,
            email:email,
            password:pass,
            password_confirmation:confirmPass,
            phone:phoneNum,
            role_id:roleId
        })
    };
    static ForgetPass(email){
        return requestHandler('forgot-password',{
               email:email 
        })
    };
    static PasswordChange(currentPass,newPass,confirmPass){
        return requestHandler('change-password',{
            current_password:currentPass,
            password:newPass,
            password_confirmation:confirmPass
        })
    }
  
}