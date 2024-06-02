import { QuoteInfo } from "./quote-info";
import { User } from "./user";
export interface Quote {
    id: number;
    name:string|null;
    grand_total: number|null;
    quote_date: string|null;
    quote_infos: QuoteInfo[];
    attachments: any|null;
    shipping_cost: string|'0';
    validity:number|null;
    parent_id: number|0; 
    versions: number|0;
    usd_to_rmb: number|10;
    commission: number|1;
    client:User;
    is_final:number|0;
    is_version_finalized:boolean|false;
}
export interface QuoteAttachment {
    id: number;
    file: string;
    filename:string;
    date: string;

}
