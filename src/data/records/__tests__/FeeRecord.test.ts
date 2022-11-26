import { describe, it, expect } from 'vitest'
import { Currencies } from '../../records/Currencies';

import type {Fee} from '../../records/Fee'

describe('Fee', () => {
  it('default init check', () => {
    const record : Fee = {sourceId:"broker", timestamp: new Date('2020-12-17T03:24:00'),currency: Currencies.USD, amount: 0.12};
    
    expect(record.sourceId).toContain("broker");
    expect(record.timestamp.toISOString()).equals('2020-12-17T02:24:00.000Z');
    expect(record.currency).toBe(Currencies.USD);
    expect(record.amount).equal(0.12);
  });
})