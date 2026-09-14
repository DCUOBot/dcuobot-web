import type { Character } from '@/features/characters/character';
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
