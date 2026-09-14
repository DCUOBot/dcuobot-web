import type { League, LeagueCharacter } from '@/features/leagues/models/league';

export function createLeagueCharacter(overrides: Partial<LeagueCharacter> = {}): LeagueCharacter {
  return {
    rank: 0,
    name: 'Comedian',
    character_id: 'char-1',
    world_id: '2',
    skill_points: 825,
    combat_rating: 446,
    pvp_combat_rating: 101,
    ...overrides,
  };
}

export function createLeague(overrides: Partial<League> = {}): League {
  return {
    name: 'Legion of Doom',
    alignment: 'Villain',
    guild_id: 'guild-1',
    world_id: '2',
    member_count: 3,
    average_skill_points: 12345,
    average_combat_rating: 446,
    average_pvp_combat_rating: 101,
    characters: [
      createLeagueCharacter({ rank: 0, name: 'Comedian', character_id: 'char-1' }),
      createLeagueCharacter({ rank: 1, name: 'Batman', character_id: 'char-2' }),
      createLeagueCharacter({ rank: 2, name: 'Robin', character_id: 'char-3' }),
    ],
    ...overrides,
  };
}
