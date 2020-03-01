import { Component } from "react";
import { requestHandler } from "../requestHandler";

export default class OrderModal extends Component{
    static orderList(){
        return requestHandler('orders-listing')
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
    // static saveOrder(batchNo,invoice,date,img,)
}