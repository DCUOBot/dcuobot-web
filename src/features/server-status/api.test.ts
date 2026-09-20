import { afterEach, describe, expect, it, vi } from 'vitest';
import { httpClient } from '@/lib/http-client';
import { getServerStatus } from './api';
import { createGameServer } from '@/features/server-status/fixtures/game-server.fixture';

vi.mock('@/lib/http-client', () => ({
  httpClient: { get: vi.fn() },
}));

describe('server-status api', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getServerStatus', () => {
    it('requests the game server statuses', async () => {
      const gameServers = [createGameServer()];
      vi.mocked(httpClient.get).mockResolvedValue({ data: gameServers });

      const result = await getServerStatus();

      expect(httpClient.get).toHaveBeenCalledWith('/status/game-servers');
      expect(result).toBe(gameServers);
    });
  });
});
