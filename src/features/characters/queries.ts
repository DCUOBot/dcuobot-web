import { queryOptions } from '@tanstack/react-query';
import { getCharacter, getCharactersRanking } from '@/features/characters/api';

export const characterQueries = {
  getCharacter: (name: string, worldId: number) =>
    queryOptions({
      queryKey: ['character', name, worldId],
      queryFn: () => getCharacter(name, worldId),
      staleTime: 'static',
    }),

  getCharactersRanking: (worldId: number, sort: string) =>
    queryOptions({
      queryKey: ['characters', 'ranking', worldId, sort],
      queryFn: () => getCharactersRanking(worldId, sort),
      staleTime: 'static',
    }),
};
