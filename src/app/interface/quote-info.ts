import { UnitQuote } from "./unit-quote";
export interface QuoteInfo {
    id: number|null;
    material: string|null;
    technique: string|null;
    finishing: string|null;
    unitQuote: UnitQuote[];
    image: string;
}
