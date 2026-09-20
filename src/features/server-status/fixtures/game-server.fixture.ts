import type { GameServer } from '@/features/server-status/models/game-server';

export function createGameServer(overrides: Partial<GameServer> = {}): GameServer {
  return {
    server_name: 'US',
    population: 'High',
    status: 'ONLINE',
    ...overrides,
  };
}
