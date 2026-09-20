import { describe, expect, it } from 'vitest';
import { getRankingServerOptions } from './ranking-options';
import type { TFunction } from 'i18next';

const t = ((key: string) => key) as TFunction;

describe('getRankingServerOptions', () => {
  it('returns an option for every server, keyed under the given prefix', () => {
    const options = getRankingServerOptions(t, 'character.ranking.servers');

    expect(options).toEqual([
      { id: 0, label: 'character.ranking.servers.all' },
      { id: 2, label: 'character.ranking.servers.usPcPs' },
      { id: 4, label: 'character.ranking.servers.euPcPs' },
      { id: 10, label: 'character.ranking.servers.usSwitch' },
      { id: 11, label: 'character.ranking.servers.euSwitch' },
      { id: 5001, label: 'character.ranking.servers.xbox' },
    ]);
  });
});
