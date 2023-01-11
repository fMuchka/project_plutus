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
    
    load(file: File):Data {
        const reader:FileReader = new FileReader();
        reader.addEventListener("load", () => {
            // this will then display a text file
            const data = reader.result;
          }, false);

        reader.readAsText(file);

        return {
            buys: [],
            sells: [],
            dividends: [],
            fees: []
        };
    }

}