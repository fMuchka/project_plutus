import { Currencies } from "@/data/records/Currencies";
import type { Data } from "../Data";
import type { IDataProvider } from "../IDataProvider";
import { parse } from 'csv-parse';
import type { Dividend } from "@/data/records/Dividend";
import type { Fee } from "@/data/records/Fee";
import type { PortfolioItem } from "@/data/records/PortfolioItem";

export class RevolutProvider implements IDataProvider{
    
    id: string;
    title: string;
    address: string;
    headers: string[];

    private static readonly CUSTODY_FEE: string = "CUSTODY_FEE";
    private static readonly CUSTODY_FEE_SPACE : string = "CUSTODY FEE";
    private static readonly DIVIDEND_ID: string = "DIVIDEND";
    private static readonly BUY_ID: string = "BUY";
    private static readonly BUY_MARKET_ID: string = "BUY - MARKET";
    private static readonly SELL_ID: string = "SELL";
    private static readonly SELL_MARKET_ID: string = "SELL - MARKET";
    
    constructor() {
        this.id = "Revolut";
        this.title = "Revolut Trading Ltd";
        this.address = "Sapia Partners LLP (Revolut Trading Ltd, 7 Westferry Circus, Canary Wharf, London, E14 4HD)";
    
        this.headers = ["Date","Ticker","Type","Quantity","Price per share","Total Amount","Currency","FX Rate"];
    }

    static parsePrice(value: string) : number {
        value = value.replace("$", "");
        return parseFloat(value);
    }
    
    load(file: File):Promise<Data> {
        const providerId = this.id;
        const promise = new Promise<Data>((resolve, reject) => {
            if(file)
            {
                const reader:FileReader = new FileReader();
                reader.addEventListener("load", () => {
                    // this will then display a text file
                    const csvData:string = reader.result as string;
                    const dividends : Dividend[] = [];
                    const fees : Fee[] = [];
                    const buys : PortfolioItem[] = [];
                    const sells : PortfolioItem[] = [];

                    const parser = parse(csvData, {delimiter: ',', from_line: 2/*, columns: headers*/});
                    
                    parser.on('readable', function(){
                        let record;
                        while ((record = parser.read()) !== null) {
                            const currency : Currencies = Currencies[record[6] as keyof typeof Currencies];
                            const timestamp : Date = new Date(record[0]);
                            const amount = RevolutProvider.parsePrice(record[5]);
                            const ticker = record[1];
                            const quantity = RevolutProvider.parsePrice(record[3]);
                            const pricePerShare = RevolutProvider.parsePrice(record[4]);

                            switch(record[2])
                            {
                                case RevolutProvider.CUSTODY_FEE_SPACE:
                                case RevolutProvider.CUSTODY_FEE:
                                    const fee : Fee = {sourceId:providerId, timestamp: timestamp,currency: currency, amount: amount};
                                    fees.push(fee);
                                    break;

                                case RevolutProvider.DIVIDEND_ID:
                                    const dividend : Dividend = {sourceId: providerId, timestamp: timestamp,ticker: ticker, currency: currency, amount: amount};
                                    dividends.push(dividend);
                                    break;

                                case RevolutProvider.BUY_MARKET_ID:
                                case RevolutProvider.BUY_ID:
                                    const buy : PortfolioItem = {sourceId: providerId, timestamp: timestamp,ticker: ticker, currency: currency, amount: amount, pricePerShare: pricePerShare, quantity: quantity};
                                    buys.push(buy);
                                    break;

                                case RevolutProvider.SELL_MARKET_ID:
                                case RevolutProvider.SELL_ID:
                                    const sell : PortfolioItem = {sourceId: providerId, timestamp: timestamp,ticker: ticker, currency: currency, amount: amount, pricePerShare: pricePerShare, quantity: quantity};
                                    sells.push(sell);
                                    break;
                            }
                        }
                    });

                    parser.on('end',function (){
                        resolve({
                            buys: buys,
                            sells: sells,
                            dividends: dividends,
                            fees: fees
                        });
                    });

                }, false);

                reader.readAsText(file);
            }
            else{
                resolve({
                    buys: [],
                    sells: [],
                    dividends: [],
                    fees: []
                });
            }
        });

        return promise;
    }

}