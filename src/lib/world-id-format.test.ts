import { describe, expect, it } from 'vitest';
import { formatWorldId } from './world-id-format';

describe('formatWorldId', () => {
  it.each([
    ['2', 'USPC/PS'],
    ['4', 'EUPC/PS'],
    ['10', 'US Switch'],
    ['11', 'EU Switch'],
    ['5001', 'Xbox'],
  ])('formats world id %s as %s', (worldId, expected) => {
    expect(formatWorldId(worldId)).toBe(expected);
  });

  it('accepts a numeric world id', () => {
    expect(formatWorldId(2)).toBe('USPC/PS');
  });

  it('falls back to the raw value for an unrecognized world id', () => {
    expect(formatWorldId('999')).toBe('999');
  });
});
