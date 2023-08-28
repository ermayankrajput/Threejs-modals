import { QuoteInfo } from "./quote-info";
export interface Quote {
    id: number;
    grand_total: number|null;
    quote_date: string|null;
    quote_infos: QuoteInfo[];
    attachments: any|null;
    shipping_cost: string|'0';
    validity:number|null;
}
export interface QuoteAttachment {
    id: number;
    file: string;
    filename:string;
    date: string;

}
