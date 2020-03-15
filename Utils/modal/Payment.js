import { requestHandler } from "../requestHandler";
import { Component } from "react";

export default class PaymentModal extends Component{

    static AddPayment(date,amount,prNo){
        return requestHandler('payment',{
            payment_date:date,
            total_amount:amount,
            pr_number:prNo
        })
    };
    static Balance(){
        return requestHandler('balance')
    };
    static PaymentListing(pageNo){
        return requestHandler('payment-listing',{
            page:pageNo
        })
    };
}