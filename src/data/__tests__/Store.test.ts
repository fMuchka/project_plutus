import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest'
import { Store } from '../Store';
import { Currencies } from '../records/Currencies';

describe('Store tests', () => {
  it('no dividends paid', async () => {
    const store = new Store();
    
    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(Object.keys(dividendsByCurrency).length).toBe(0);
  });
  
  it('sum of dividends paid in USD', async () => {
    const store = new Store();
    
    await store.loadDividends([
      {currency: Currencies.USD, amount: 3, sourceId: "", timestamp: new Date('2021-12-31'),ticker: ""},
      {currency: Currencies.USD, amount: 1, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.USD, amount: 2, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""}
    ]);

    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(dividendsByCurrency[Currencies.USD]).toBe(3);
  });

  it('sum of dividends paid in USD and EUR', async () => {
    const store = new Store();
    store.clearAll();
    
    await store.loadDividends([
      {currency: Currencies.USD, amount: 1, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.USD, amount: 2, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.EUR, amount: 3, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""},
      {currency: Currencies.EUR, amount: 4, sourceId: "", timestamp: new Date('2022-11-03'),ticker: ""}
    ]);

    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(dividendsByCurrency[Currencies.USD]).toBe(3);
    expect(dividendsByCurrency[Currencies.EUR]).toBe(7);
  });

  it('empty portfolio', async () => {
    const store = new Store();
    store.clearAll();
    
    const portfolio = await store.getPortfolio();

    expect(Object.keys(portfolio).length).toBe(0);
  });

  it('sum of portfolio after 2 buys of same stock', async () => {
    const store = new Store();
    store.clearAll();
    
    await store.loadBuys([
      {currency: Currencies.USD, quantity: 1, sourceId: "", timestamp: new Date('2022-01-01'),ticker: "AAPL", pricePerShare: 3, amount: 3},
      {currency: Currencies.USD, quantity: 2, sourceId: "", timestamp: new Date('2022-01-02'),ticker: "AAPL", pricePerShare: 4, amount: 8}
    ]);

    const portfolio = await store.getPortfolio();

    expect(Object.keys(portfolio).length).toBe(1);
    expect(portfolio["AAPL"]).toBe(3);
  });

  it('no sells in 2022', async () => {
    const store = new Store();
    store.clearAll();
    
    const sumOfSells = await store.getSellsAmount(2022);

    expect(sumOfSells).toBe(0);
  });

  it('taxable amount after 2 sells in 2022', async () => {
    const store = new Store();
    store.clearAll();
    
    await store.loadSells([
      {currency: Currencies.USD, quantity: 3, sourceId: "", timestamp: new Date('2021-12-31'),ticker: "O", pricePerShare: 5, amount: 15},
      {currency: Currencies.USD, quantity: 1, sourceId: "", timestamp: new Date('2022-01-01'),ticker: "AAPL", pricePerShare: 3, amount: 3},
      {currency: Currencies.USD, quantity: 2, sourceId: "", timestamp: new Date('2022-12-31'),ticker: "MSFT", pricePerShare: 4, amount: 8},
      {currency: Currencies.USD, quantity: 4, sourceId: "", timestamp: new Date('2023-01-01'),ticker: "LMT", pricePerShare: 2, amount: 6}
    ]);

    const sumOfSells = await store.getSellsAmount(2022);

    expect(sumOfSells).toBe(11);
  });

  it('there is no fees applicable in 2022', async () => {
    const store = new Store();
    store.clearAll();
    
    const sumOfFees = await store.getFeesAmount(2022);

    expect(sumOfFees).toBe(0);
  });

  it('fees applicable in 2022', async () => {
    const store = new Store();
    store.clearAll();
    
    await store.loadFees([
      {currency: Currencies.USD, sourceId: "", timestamp: new Date('2021-12-31'),amount: 1},
      {currency: Currencies.USD, sourceId: "", timestamp: new Date('2022-01-01'),amount: 2},
      {currency: Currencies.USD, sourceId: "", timestamp: new Date('2022-12-31'),amount: 3},
      {currency: Currencies.USD, sourceId: "", timestamp: new Date('2023-01-01'),amount: 4}
    ]);

    const sumOfFees = await store.getFeesAmount(2022);

    expect(sumOfFees).toBe(5);
  });
})

