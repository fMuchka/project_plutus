import { describe, it, expect } from 'vitest'
import { Currencies } from '../Currencies';
import type { Dividend } from '../Dividend';

describe('Dividend', () => {
  it('default init check', () => {
    const record : Dividend = {sourceId:"broker", timestamp: new Date('2020-12-17T03:24:00'),ticker: "AAPL", currency: Currencies.USD, amount: 1.234};

    expect(record.sourceId).toContain("broker");
    expect(record.timestamp.toISOString()).equals('2020-12-17T02:24:00.000Z');
    expect(record.ticker).toContain("AAPL");
    expect(record.currency).toBe(Currencies.USD);
    expect(record.amount).equal(1.234);
  })
})