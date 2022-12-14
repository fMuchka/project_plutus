import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest'
import { Store } from '../Store';
import { Currencies } from '../records/Currencies';
import { DummyProvider } from "../providers/dummy/DummyProvider";

describe('Providers integration tests', () => {
  it('no dividends paid', async () => {
    const store = new Store();
    store.clearAll();
    
    const provider : DummyProvider = new DummyProvider();
    const reader : null = null;

    const data = provider.load(reader as unknown as FileReader);

    await store.load(data);

    const fees = await store.getFeesAmount(2022);

    expect(fees).toBe(1);

    const dividendsByCurrency = await store.groupDividendsByCurrencyAndYear(2022);

    expect(Object.keys(dividendsByCurrency).length).toBe(1);
  });
})

