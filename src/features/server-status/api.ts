import type { GameServer } from '@/features/server-status/models/game-server';
import { httpClient } from '@/lib/http-client';

export async function getServerStatus(): Promise<GameServer[]> {
  const { data } = await httpClient.get<GameServer[]>('/status/game-servers');

  return data;
}
