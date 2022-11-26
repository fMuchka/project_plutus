// db.ts
import Dexie, { type Table } from 'dexie';
import type { Dividend } from './records/Dividend';
import type { Fee } from './records/Fee';
import type { PortfolioItem } from './records/PortfolioItem';
import type { Data } from './providers/Data';
import type {Currencies } from './records/Currencies';

export class Store extends Dexie {

    dividends!: Table<Dividend>;
    buys!: Table<PortfolioItem>;
    sells!: Table<PortfolioItem>;
    
    constructor() {
        super('portfolio');
        this.version(1).stores({
            dividends: '++id,sourceId,timestamp,currency,ticker,amount',
            buys: '++id,sourceId,timestamp,currency,ticker,amount,quantity,pricePerShare',
            sells: '++id,sourceId,timestamp,currency,ticker,amount,quantity,pricePerShare'
        });
    }

    clearAll(){
        this.dividends.clear();
        this.buys.clear();
        this.sells.clear();
    }

    loadDividends(dividends: Dividend[]) {
        for (const dividend of dividends) {
            this.dividends.add(dividend);
        }
    }

    async groupDividendsByCurrencyAndYear(year: number) : Promise<{[key in Currencies]? : number}> {
        let sumByCurrency: {[key in Currencies]? : number} = {};

        await this.dividends.each(d => {
          if (d.timestamp.getFullYear() == year) {
            sumByCurrency[d.currency] = (sumByCurrency[d.currency] || 0) + d.amount;
          }
        });

        return sumByCurrency;
    }
}

export const db = new Store();