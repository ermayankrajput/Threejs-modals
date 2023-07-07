import { UnitQuote } from "./unit-quote";
export interface QuoteInfo {
    id: number;
    finishing: string|null;
    image_file: string|null;
    technique: string|null;
    transported_file: string|null;
    unit_quotes: UnitQuote[];
    uploded_file:string|null;
    material_search: string|null;
    x_size: number|null;
    y_size:number|null;
    z_size:number|null;
}
