import { Currencies } from "@/data/records/Currencies";
import type { Data } from "../Data";
import type { IDataProvider } from "../IDataProvider";

export class DummyProvider implements IDataProvider{
    
    id: string;
    title: string;
    address: string;

    constructor() {
        this.id = "Dummy";
        this.title = "Dummy Provider";
        this.address = "Dummy city, Dummy street 12, 12345";
    }
    
    load(reader: FileReader):Data {
        return {
            buys: [{sourceId: this.id, timestamp: new Date('2022-11-01T00:00:01'), ticker: "AAPL", pricePerShare: 140.2, quantity: 5, currency: Currencies.USD, amount: 701}],
            sells: [{sourceId: this.id, timestamp: new Date('2022-11-17T00:00:01'), ticker: "AAPL", pricePerShare: 150.1, quantity: 3, currency: Currencies.USD, amount: 450.3}],
            dividends: [{sourceId: this.id, timestamp: new Date('2022-11-03T00:00:01'),ticker: "AAPL", currency: Currencies.USD, amount: 1.15}],
            fees: [{sourceId: this.id, timestamp: new Date('2022-11-01T00:00:01'), currency: Currencies.USD, amount: 1}]
        };
    }

}