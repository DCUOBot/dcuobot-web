import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import CharacterSummaryStats from './CharacterSummaryStats';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';
import i18n from '@/i18n';

describe('CharacterSummaryStats', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('always shows skill points, combat rating and PvP combat rating', () => {
    const character = createCharacter({
      skill_points: 825,
      combat_rating: 446,
      pvp_combat_rating: 101,
    });

    render(
      <CharacterSummaryStats
        character={character}
        sort="max_health"
      />,
    );

    expect(screen.getByText('825')).toBeInTheDocument();
    expect(screen.getByText('446')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getAllByText('Skill Points')).toHaveLength(1);
    expect(screen.getAllByText('Combat Rating')).toHaveLength(1);
    expect(screen.getAllByText('PvP Combat Rating')).toHaveLength(1);
  });

  it('formats numbers using the active locale', () => {
    const character = createCharacter({ skill_points: 12345 });

    render(
      <CharacterSummaryStats
        character={character}
        sort="skill_points"
      />,
    );

    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it.each(['skill_points', 'combat_rating', 'pvp_combat_rating'])(
    'does not show a fourth stat when sorted by %s',
    (sort) => {
      const character = createCharacter();

      render(
        <CharacterSummaryStats
          character={character}
          sort={sort}
        />,
      );

      expect(screen.getAllByText('Skill Points')).toHaveLength(1);
      expect(screen.getAllByText('Combat Rating')).toHaveLength(1);
      expect(screen.getAllByText('PvP Combat Rating')).toHaveLength(1);
    },
  );

  it.each([
    ['max_health', 'Health', 'health'],
    ['max_power', 'Power', 'power'],
    ['toughness', 'Toughness', 'toughness'],
    ['might', 'Might', 'might'],
    ['precision', 'Precision', 'precision'],
    ['defense', 'Defense', 'defense'],
    ['dominance', 'Dominance', 'dominance'],
    ['restoration', 'Restoration', 'restoration'],
    ['vitalization', 'Vitalization', 'vitalization'],
  ] as const)('shows the %s stat and label when sorted by it', (sort, label, statKey) => {
    const character = createCharacter({
      stats: {
        health: 1,
        power: 2,
        defense: 3,
        toughness: 4,
        might: 5,
        precision: 6,
        restoration: 7,
        vitalization: 8,
        dominance: 9,
      },
    });

    render(
      <CharacterSummaryStats
        character={character}
        sort={sort}
      />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(String(character.stats[statKey]))).toBeInTheDocument();
  });

  it('shows a zero fourth stat for an unrecognized sort value', () => {
    const character = createCharacter();

    render(
      <CharacterSummaryStats
        character={character}
        sort="unknown"
      />,
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
