import type { GameServer } from '@/features/server-status/models/game-server.ts';
import { httpClient } from '@/lib/http-client.ts';

export async function getServerStatus(): Promise<GameServer[]> {
  const { data } = await httpClient.get<GameServer[]>('/status/game-servers');

  return data;
}
