import { Currencies } from "@/data/records/Currencies";
import type { Data } from "../Data";
import type { IDataProvider } from "../IDataProvider";

export class RevolutProvider implements IDataProvider{
    
    id: string;
    title: string;
    address: string;

    constructor() {
        this.id = "Revolut";
        this.title = "Revolut Trading Ltd";
        this.address = "Sapia Partners LLP (Revolut Trading Ltd, 7 Westferry Circus, Canary Wharf, London, E14 4HD)";
    }
    
    load(file: File):Promise<Data> {
        const promise = new Promise<Data>((resolve, reject) => {
            if(file)
            {
                const reader:FileReader = new FileReader();
                reader.addEventListener("load", () => {
                    // this will then display a text file
                    const data = reader.result;

                    resolve({
                        buys: [],
                        sells: [],
                        dividends: [],
                        fees: []
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