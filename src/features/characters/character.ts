import type { Artifact } from '@/features/characters/artifact';
import type { Ally } from '@/features/characters/ally';

export interface Character {
  name: string;
  alignment: string;
  gender: string;
  personality: string;
  stats: CharacterStats;
  guild: CharacterGuild | null;
  artifacts: Artifact[];
  allies: Ally[];
  image: CharacterImage;
  character_id: string;
  world_id: string;
  power_type: string;
  movement_mode: string;
  combat_rating: number;
  pvp_combat_rating: number;
  skill_points: number;
}

export interface CharacterGuild {
  id: string;
  name: string;
}

export interface CharacterStats {
  health: number;
  power: number;
  defense: number;
  toughness: number;
  might: number;
  precision: number;
  restoration: number;
  vitalization: number;
  dominance: number;
}

export interface CharacterImage {
  url: string;
  alt_url: string;
}
