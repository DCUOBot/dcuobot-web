import type { Character } from '@/features/characters/models/character';

export function createCharacter(overrides: Partial<Character> = {}): Character {
  return {
    name: 'Comedian',
    alignment: 'Villain',
    gender: 'Male',
    personality: 'Serious',
    stats: {
      health: 12000,
      power: 8000,
      defense: 4500,
      toughness: 4200,
      might: 300,
      precision: 280,
      restoration: 150,
      vitalization: 140,
      dominance: 120,
    },
    guild: { id: 'guild-1', name: 'Legion of Doom' },
    artifacts: [
      {
        id: 'artifact-1',
        name: 'Quislet',
        image_url: 'https://dcuo.bot/artifacts/quislet.png',
        discord_emoji_id: '1',
      },
    ],
    allies: [
      { id: 'ally-1', name: 'Shazam', combat: true },
      { id: 'ally-2', name: 'Batman', combat: false },
      { id: 'ally-3', name: 'Robin', combat: false },
    ],
    image: {
      url: 'https://dcuo.bot/characters/comedian.png',
      alt_url: 'https://dcuo.bot/characters/comedian-alt.png',
    },
    character_id: 'char-1',
    world_id: '2',
    power_type: 'Fire',
    movement_mode: 'Super Speed',
    combat_rating: 446,
    pvp_combat_rating: 101,
    skill_points: 825,
    ...overrides,
  };
}
