import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest'
import { Store } from '../Store';
import { Currencies } from '../records/Currencies';

describe('Store tests', () => {
  it('sum of dividends paid in USD', async () => {
    const store = new Store();
    
    store.loadDividends([
      {currency: Currencies.USD, amount: 1, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.USD, amount: 2, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""}
    ]);

    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(dividendsByCurrency[Currencies.USD]).toBe(3);
  });

  it('sum of dividends paid in USD and EUR', async () => {
    const store = new Store();
    store.clearAll();
    
    store.loadDividends([
      {currency: Currencies.USD, amount: 1, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.USD, amount: 2, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.EUR, amount: 3, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.EUR, amount: 4, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""}
    ]);

    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(dividendsByCurrency[Currencies.USD]).toBe(3);
    expect(dividendsByCurrency[Currencies.EUR]).toBe(7);
  });

  it('sum of dividends paid in USD and EUR', async () => {
    const store = new Store();
    store.clearAll();
    
    store.loadDividends([
      {currency: Currencies.USD, amount: 1, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.USD, amount: 2, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.EUR, amount: 3, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.EUR, amount: 4, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""}
    ]);

    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(dividendsByCurrency[Currencies.USD]).toBe(3);
    expect(dividendsByCurrency[Currencies.EUR]).toBe(7);
  });
})

