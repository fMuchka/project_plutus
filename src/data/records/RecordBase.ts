import type { Currencies } from "./Currencies";

export interface RecordBase {
    sourceId: string;
    timestamp: Date;
    currency: Currencies;
    amount: number;
}