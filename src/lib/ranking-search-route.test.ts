import { describe, expect, it } from 'vitest';
import { validateRankingSearch } from './ranking-search-route';

describe('validateRankingSearch', () => {
  it('parses worldId and sort from the search params', () => {
    expect(validateRankingSearch({ worldId: '4', sort: 'combat_rating' }, 'skill_points')).toEqual({
      worldId: 4,
      sort: 'combat_rating',
    });
  });

  it('defaults worldId to 0 when missing', () => {
    expect(validateRankingSearch({ sort: 'combat_rating' }, 'skill_points')).toEqual({
      worldId: 0,
      sort: 'combat_rating',
    });
  });

  it('defaults sort to the provided default when missing', () => {
    expect(validateRankingSearch({ worldId: '2' }, 'skill_points')).toEqual({
      worldId: 2,
      sort: 'skill_points',
    });
  });

  it('defaults both values when the search is empty', () => {
    expect(validateRankingSearch({}, 'combat_rating')).toEqual({
      worldId: 0,
      sort: 'combat_rating',
    });
  });
});
