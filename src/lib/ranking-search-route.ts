export type RankingSearch = {
  worldId: number;
  sort: string;
};

export function validateRankingSearch(
  search: Record<string, unknown>,
  defaultSort: string,
): RankingSearch {
  return {
    worldId: search.worldId ? Number(search.worldId) : 0,
    sort: search.sort ? (search.sort as string) : defaultSort,
  };
}
