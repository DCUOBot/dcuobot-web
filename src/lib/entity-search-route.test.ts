import { describe, expect, it, vi } from 'vitest';
import { requireEntitySearch, validateEntitySearch } from './entity-search-route';

vi.mock('@tanstack/react-router', () => ({
  redirect: (options: unknown) => options,
}));

describe('validateEntitySearch', () => {
  it('parses worldId and query from the search params', () => {
    expect(validateEntitySearch({ worldId: '123', query: 'Batman' })).toEqual({
      worldId: 123,
      query: 'Batman',
    });
  });

  it('returns undefined values when params are missing', () => {
    expect(validateEntitySearch({})).toEqual({ worldId: undefined, query: undefined });
  });
});

describe('requireEntitySearch', () => {
  it('throws a redirect to home when query is missing', () => {
    expect(() => requireEntitySearch({ search: { worldId: 123 } })).toThrow();
  });

  it('throws a redirect to home when worldId is missing', () => {
    expect(() => requireEntitySearch({ search: { query: 'Batman' } })).toThrow();
  });

  it('does not throw when both worldId and query are present', () => {
    expect(() => requireEntitySearch({ search: { worldId: 123, query: 'Batman' } })).not.toThrow();
  });
});
