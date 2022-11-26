import { DummyProvider } from '@/data/providers/dummy/DummyProvider';
import { describe, it, expect } from 'vitest';

describe('Dummy provider', () => {
  it('default init check', () => {
    const provider : DummyProvider = new DummyProvider();

    expect(provider.id).toContain("Dummy");
    expect(provider.title).toContain("Dummy Provider");
    expect(provider.address).toContain("Dummy city, Dummy street 12, 12345");
  });

  it('load returns data', () => {
    const provider : DummyProvider = new DummyProvider();
    const reader : null = null;

    const data = provider.load(reader as unknown as FileReader);

    expect(data.buys.length).greaterThan(0);
    expect(data.sells.length).greaterThan(0);
    expect(data.dividends.length).greaterThan(0);
    expect(data.fees.length).greaterThan(0);
  });
})