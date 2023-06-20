import { Injectable } from "@angular/core";
import * as _ from 'lodash';

@Injectable({
    providedIn:'root'
})

export class QuoteInfoFactory{
    constructor(){}

    buildQuoteInfo(image:string=''){
        return {
            id: Math.random(), 
            material: '', 
            technique: '', 
            finishing: '', 
            image: image,
            unitQuote: [
                {
                    id: Math.random(),
                    unitPrice: null,
                    quantity: null,
                    amount: null,
                    leadTime: null
                }
            ]
        };
    }

    buildUnitQuote(){
        return {
            id: Math.random(),
            unitPrice: null,
            quantity: null,
            amount: null,
            leadTime: null
        }
    }
}