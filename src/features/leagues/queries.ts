import { queryOptions } from '@tanstack/react-query';
import { getLeague, getLeaguesRanking } from '@/features/leagues/api';

export const leagueQueries = {
  getLeague: (name: string, worldId: number) =>
    queryOptions({
      queryKey: ['league', name, worldId],
      queryFn: () => getLeague(name, worldId),
      staleTime: 'static',
    }),

  getLeaguesRanking: (worldId: number, sort: string) =>
    queryOptions({
      queryKey: ['leagues', 'ranking', worldId, sort],
      queryFn: () => getLeaguesRanking(worldId, sort),
      staleTime: 'static',
    }),
};
