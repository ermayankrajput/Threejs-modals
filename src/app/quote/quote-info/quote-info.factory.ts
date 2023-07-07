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
            finishing: '', 
            image_file: '',
            technique: '', 
            transported_file: '',
            material_search: '', 
            unit_quotes: [
                {
                    id: Math.random(),
                    unit_price: null,
                    quantity: null,
                    lead_time: null
                }
            ],
            uploded_file: '',
            x_size: null,
            y_size: null,
            z_size: null,
        };
    }

    buildUnitQuote(){
        return {
            id: Math.random(),
            unit_price: null,
            quantity: null,
            lead_time: null
        }
    }
}