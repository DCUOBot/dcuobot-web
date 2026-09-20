import { afterEach, describe, expect, it, vi } from 'vitest';
import { httpClient } from '@/lib/http-client';
import { getLeague, getLeaguesRanking } from './api';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';

vi.mock('@/lib/http-client', () => ({
  httpClient: { get: vi.fn() },
}));

describe('leagues api', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getLeague', () => {
    it('requests a league by name and world id', async () => {
      const league = createLeague();
      vi.mocked(httpClient.get).mockResolvedValue({ data: league });

      const result = await getLeague('Legion of Doom', 2);

      expect(httpClient.get).toHaveBeenCalledWith('/guilds', {
        params: { name: 'Legion of Doom', worldId: 2 },
      });
      expect(result).toBe(league);
    });
  });

  describe('getLeaguesRanking', () => {
    it('requests the ranking for a specific world, sorted descending', async () => {
      const leagues = [createLeague()];
      vi.mocked(httpClient.get).mockResolvedValue({ data: leagues });

      const result = await getLeaguesRanking(2, 'averageSkillPoints');

      expect(httpClient.get).toHaveBeenCalledWith('/guilds', {
        params: { sort: 'averageSkillPoints', sortDirection: 'DESC', worldId: 2 },
      });
      expect(result).toBe(leagues);
    });

    it('omits the world id when ranking across all servers', async () => {
      vi.mocked(httpClient.get).mockResolvedValue({ data: [] });

      await getLeaguesRanking(0, 'averageSkillPoints');

      expect(httpClient.get).toHaveBeenCalledWith('/guilds', {
        params: { sort: 'averageSkillPoints', sortDirection: 'DESC' },
      });
    });
  });
});
