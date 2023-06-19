import { UnitQuote } from "./unitquote/unit-quote";
export interface QuoteInfo {
    id: number;
    material: string;
    technique: string;
    finishing: string;
    unitQuote: UnitQuote[];
}
