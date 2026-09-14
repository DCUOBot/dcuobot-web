import { queryOptions } from '@tanstack/react-query';
import { getLeague } from '@/features/leagues/api';

export const leagueQueries = {
  getLeague: (name: string, worldId: number) =>
    queryOptions({
      queryKey: ['league', name, worldId],
      queryFn: () => getLeague(name, worldId),
      staleTime: 'static',
    }),
};
