import { queryOptions } from '@tanstack/react-query';
import { getCharacter } from '@/features/characters/api';

export const characterQueries = {
  getCharacter: (name: string, worldId: number) =>
    queryOptions({
      queryKey: ['character', name, worldId],
      queryFn: () => getCharacter(name, worldId),
      staleTime: 'static',
    }),
};
