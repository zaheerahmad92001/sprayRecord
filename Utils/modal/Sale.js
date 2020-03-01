import { Component } from "react";
import { requestHandler } from "../requestHandler";
export default class SaleModal extends Component{

    static sale(id,qty,weight,unit,date){
        return requestHandler('sale',{
            product_id:id,
            quantity:qty,
            weight:weight,
            unit:unit,
            entry_date:date
        })
    };
    static ReturnProduct(id,qty,weight,unit,date){
        return requestHandler('return-sale',{
            product_id:id,
            quantity:qty,
            weight:weight,
            unit:unit,
            entry_date:date
        })
    };
    // static saleFilter(page,daily,weekly,monthly){
    //     return requestHandler('filter-sale',{
    //       page:page,
    //     })
    // }
}