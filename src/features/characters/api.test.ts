import { afterEach, describe, expect, it, vi } from 'vitest';
import { httpClient } from '@/lib/http-client';
import { getCharacter, getCharactersRanking } from './api';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';

vi.mock('@/lib/http-client', () => ({
  httpClient: { get: vi.fn() },
}));

describe('characters api', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacter', () => {
    it('requests a character by name and world id', async () => {
      const character = createCharacter();
      vi.mocked(httpClient.get).mockResolvedValue({ data: character });

      const result = await getCharacter('Comedian', 2);

      expect(httpClient.get).toHaveBeenCalledWith('/characters', {
        params: { name: 'Comedian', worldId: 2 },
      });
      expect(result).toBe(character);
    });
  });

  describe('getCharactersRanking', () => {
    it('requests the ranking for a specific world', async () => {
      const characters = [createCharacter()];
      vi.mocked(httpClient.get).mockResolvedValue({ data: characters });

      const result = await getCharactersRanking(2, 'skill_points');

      expect(httpClient.get).toHaveBeenCalledWith('/characters', {
        params: { sort: 'skill_points', worldId: 2 },
      });
      expect(result).toBe(characters);
    });

    it('omits the world id when ranking across all servers', async () => {
      vi.mocked(httpClient.get).mockResolvedValue({ data: [] });

      await getCharactersRanking(0, 'skill_points');

      expect(httpClient.get).toHaveBeenCalledWith('/characters', {
        params: { sort: 'skill_points' },
      });
    });
  });
});
