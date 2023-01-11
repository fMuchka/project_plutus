import type { Data } from "./Data";

export interface IDataProvider {
    id: string;
    title: string;
    address: string;

    load(reader: FileReader): Data;
}