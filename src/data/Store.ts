// db.ts
import Dexie, { type Table } from 'dexie';
import type { Dividend } from './records/Dividend';
import type { Fee } from './records/Fee';
import type { PortfolioItem } from './records/PortfolioItem';
import type { Data } from './providers/Data';
import type {Currencies } from './records/Currencies';
import type { RecordBase } from './records/RecordBase';

export class Store extends Dexie {
    dividends!: Table<Dividend>;
    buys!: Table<PortfolioItem>;
    sells!: Table<PortfolioItem>;
    fees!: Table<Fee>;
    
    constructor() {
        super('portfolio');
        this.version(1).stores({
            dividends: '++id,sourceId,timestamp,currency,ticker,amount',
            buys: '++id,sourceId,timestamp,currency,ticker,amount,quantity,pricePerShare',
            sells: '++id,sourceId,timestamp,currency,ticker,amount,quantity,pricePerShare',
            fees: '++id, timestamp, amount'
        });
    }

    clearAll(){
        this.dividends.clear();
        this.buys.clear();
        this.sells.clear();
        this.fees.clear();
    }

    async load(data: Data) {
        await this.loadBuys(data.buys);
        await this.loadSells(data.sells);
        await this.loadDividends(data.dividends);
        await this.loadFees(data.fees);
    }

    async loadBuys(items: PortfolioItem[]) {
        await this.transaction("rw", this.buys, () => {
            for (const item of items) {
                this.fixAmount(item);
                this.buys.add(item);
            }
        });
    }

    async loadSells(items: PortfolioItem[]) {
        await this.transaction("rw", this.sells, () => {
            for (const item of items) {
                this.fixAmount(item);
                this.sells.add(item);
            }
        });
    }

    fixAmount(item: PortfolioItem){
        item.amount = item.pricePerShare * item.quantity;
    }

    async loadDividends(dividends: Dividend[]) {
        await this.transaction("rw", this.dividends, () => {
            for (const dividend of dividends) {
                this.dividends.add(dividend);
            }
        });
    }

    async loadFees(fees: Fee[]) {
        await this.transaction("rw", this.fees, () => {
            for (const fee of fees) {
                this.fees.add(fee);
            }
        });
    }

    async groupDividendsByCurrencyAndYear(year: number) : Promise<{[key in Currencies]? : number}> {
        let sumByCurrency: {[key in Currencies]? : number} = {};

        await this.dividends.each(d => {
          if (this.matchYear(d,year)) {
            sumByCurrency[d.currency] = (sumByCurrency[d.currency] || 0) + d.amount;
          }
        });

        return sumByCurrency;
    }

    async getPortfolio() : Promise<{[key in string] : number}> {
        let sumByTicker: {[key in string]: number} = {};

        await this.buys.each(d => {
          sumByTicker[d.ticker] = (sumByTicker[d.ticker] || 0) + d.quantity;
        });

        return sumByTicker;
    }

    async getSellsAmount(year: number) : Promise<number> {
        let sum = 0;

        await this.sells.each(sell => {
            if (this.matchYear(sell,year)) {
                sum += sell.amount;
            }
        });

        return sum;
    }

    async getFeesAmount(year: number) : Promise<number> {
        let sum = 0;

        await this.fees.each(fee => {
            if (this.matchYear(fee,year)) {
                sum += fee.amount;
            }
        });

        return sum;
    }

    matchYear(record: RecordBase, year: number){
        return record.timestamp.getFullYear() == year;
    }
}

export const db = new Store();