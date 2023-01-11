import type { Dividend } from "../records/Dividend";
import type { Fee } from "../records/Fee";
import type { PortfolioItem } from "../records/PortfolioItem";

export interface Data {
    dividends : Dividend[];
    fees: Fee[];
    buys: PortfolioItem[];
    sells: PortfolioItem[];
}