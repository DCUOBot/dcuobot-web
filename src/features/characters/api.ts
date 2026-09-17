import type { Character } from '@/features/characters/models/character';
import { httpClient } from '@/lib/http-client';

export async function getCharacter(name: string, worldId: number): Promise<Character> {
  const { data } = await httpClient.get<Character>('/characters', {
    params: {
      name,
      worldId,
    },
  });

  return data;
}

export async function getCharactersRanking(worldId: number, sort: string): Promise<Character[]> {
  const { data } = await httpClient.get<Character[]>('/characters', {
    params: {
      worldId,
      sort,
    },
  });

  return data;
}
