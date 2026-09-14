export interface League {
  name: string;
  alignment: string;
  characters: LeagueCharacter[];
  guild_id: string;
  world_id: string;
  member_count: number;
  average_skill_points: number;
  average_combat_rating: number;
  average_pvp_combat_rating: number;
}

export interface LeagueCharacter {
  rank: number;
  name: string;
  character_id: string;
  world_id: string;
  skill_points: number;
  combat_rating: number;
  pvp_combat_rating: number;
}
