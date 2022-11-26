import { describe, it, expect } from 'vitest'
import { Currencies } from '../../records/Currencies';

import type {PortfolioItem} from '../../records/PortfolioItem'

describe('PortfolioItem', () => {
  it('default init check', () => {
    const record : PortfolioItem = {sourceId:"broker", timestamp: new Date('2020-12-17T03:24:00'),ticker: "AAPL", currency: Currencies.USD, pricePerShare: 12.34, quantity: 2, amount: 24.68};
    
    expect(record.sourceId).toContain("broker");
    expect(record.timestamp.toISOString()).equals('2020-12-17T02:24:00.000Z');
    expect(record.ticker).toContain("AAPL");
    expect(record.currency).toBe(Currencies.USD);
    expect(record.quantity).equal(2);
    expect(record.pricePerShare).equal(12.34);
    expect(record.amount).equal(24.68);
  });
})