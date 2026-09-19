import type { League } from '@/features/leagues/models/league';
import { httpClient } from '@/lib/http-client';

export async function getLeague(name: string, worldId: number): Promise<League> {
  const { data } = await httpClient.get<League>('/guilds', {
    params: {
      name,
      worldId,
    },
  });

  return data;
}

export async function getLeaguesRanking(worldId: number, sort: string): Promise<League[]> {
  const { data } = await httpClient.get<League[]>('/guilds', {
    params: {
      sort,
      sortDirection: 'DESC',
      ...(worldId !== 0 && { worldId }),
    },
  });

  return data;
}
