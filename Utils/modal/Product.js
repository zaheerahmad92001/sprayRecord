import { Component } from "react";
import { requestHandler } from "../requestHandler";

export default class ProuductModal extends Component {

    static ProductListing(pageNo) {
        return requestHandler('products-filter',{
            page:pageNo
        })
    };
    static ProductDetails(id) {
        return requestHandler('product-details', {
            product_id: id
        })
    };
    static ProductDelete(id) {
        return requestHandler('product-delete', {
            id: id
        })
    };
    static ProductEdit(id) {
        return requestHandler('product-edit', {
            product_id: id
        })
    }
    static ProductEditSave(id, desc, title, images, qty, weight, unit) {
        return requestHandler('productEdit', {
            product_id: id,
            short_description: desc,
            title: title,
            images,
            quantity: qty,
            weight: weight,
            unit: unit
        })
    }
    static ProductSave(desc, title, images, qty, weight, unit) {
        return requestHandler('product-save', {
            short_description: desc,
            title: title,
            images,
            quantity: qty,
            weight: weight,
            unit: unit
        })
    }

}