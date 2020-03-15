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
    static ReturnProductList(pageNo){
        return requestHandler('return-sale-listing',{
            page:pageNo,
        })
    }
    static saleFilter(pageNo){
        return requestHandler('filter-sale',{
          //  per_month:monthly,
            //per_day:daily,
            //start_date:fromDate,
            //end_date:toDate
        },pageNo)
    }
}