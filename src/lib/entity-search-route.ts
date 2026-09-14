import { redirect } from '@tanstack/react-router';

export type EntitySearch = {
  worldId?: number;
  query?: string;
};

export function validateEntitySearch(search: Record<string, unknown>): EntitySearch {
  return {
    worldId: search.worldId ? Number(search.worldId) : undefined,
    query: search.query ? (search.query as string) : undefined,
  };
}

export function requireEntitySearch({ search }: { search: EntitySearch }) {
  if (!search.query || !search.worldId) {
    throw redirect({ to: '/' });
  }
}
