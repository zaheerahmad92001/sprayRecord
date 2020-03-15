import { Component } from "react";
import { requestHandler } from "../requestHandler";

export default class OrderModal extends Component{
    static orderList(pageNo){
        return requestHandler('orders-listing',{
            page:pageNo,
        })
    };
    static orderDetails(id){
        return requestHandler('order-detail',{
            order_id:id
        })
    };
    static imageUpload(data){
        // fd.append('image',img)
        return requestHandler('image-upload',data)
    };
     static saveOrder(orderNote,batchNo,invoice,date,orderNo, products,payment){
         return requestHandler('save-order',{
            order_note:orderNote, 
            batch_number:batchNo,
            invoice:invoice,
            order_date:date,
            order_number_received:orderNo,
            products:products,
            total_amount:payment
         })
     }
}