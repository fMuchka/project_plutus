import { RevolutProvider } from '@/data/providers/csv/RevolutProvider';
import { describe, it, expect } from 'vitest';
import * as fs from "fs";
import * as path from "path";

describe('Revolut provider', () => {
  it('default init check', () => {
    const provider : RevolutProvider = new RevolutProvider();

    expect(provider.id).toContain("Revolut");
    expect(provider.title).toContain("Revolut Trading Ltd");
    expect(provider.address).toContain("Sapia Partners LLP (Revolut Trading Ltd, 7 Westferry Circus, Canary Wharf, London, E14 4HD)");
  });

  it('no file returns empty data', () => {
    const provider : RevolutProvider = new RevolutProvider();
    const file : null = null;

    const data = provider.load(file as unknown as File);

    expect(data.buys.length).toEqual(0);
    expect(data.sells.length).toEqual(0);
    expect(data.dividends.length).toEqual(0);
    expect(data.fees.length).toEqual(0);
  });

  it('sample file returns valid data', () => {
    const provider : RevolutProvider = new RevolutProvider();

    const revolutData = fs.readFileSync(path.resolve(__dirname, 'RevolutExport.csv'));

    const file = new File([revolutData], "RevolutExport.csv", {
      type: "text/plain",
    });

    const data = provider.load(file);

    expect(data.buys.length).toEqual(0);
    expect(data.sells.length).toEqual(0);
    expect(data.dividends.length).toEqual(0);
    expect(data.fees.length).toEqual(0);
  });
})