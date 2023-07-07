import { QuoteInfo } from "./quote-info";
export interface Quote {
    id: number;
    grand_total: number|null;
    quote_date: string|null;
    quote_infos: QuoteInfo[];
    shipping_cost: number|null;
    validity:number|null;
}
