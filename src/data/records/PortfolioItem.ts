import type { Currencies } from "./Currencies";
import type { RecordBase } from "./RecordBase";

export interface PortfolioItem extends RecordBase{
    ticker: string;
    quantity: number;
    pricePerShare: number;
}