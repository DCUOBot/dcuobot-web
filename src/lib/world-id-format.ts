const WORLD_NAMES: Record<string, string> = {
  '2': 'USPC/PS',
  '4': 'EUPC/PS',
  '10': 'US Switch',
  '11': 'EU Switch',
  '5001': 'Xbox',
};

export function formatWorldId(worldId: string | number): string {
  return WORLD_NAMES[worldId.toString()] || worldId.toString();
}
