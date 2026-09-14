import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import CharacterStats from './CharacterStats';
import charactersEn from '@/features/characters/locales/en';
import charactersDe from '@/features/characters/locales/de';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';
import i18n from '@/i18n';

describe('CharacterStats', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
    i18n.addResourceBundle('de', 'characters', charactersDe);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders every stat with its localized, formatted value', () => {
    const character = createCharacter({
      stats: {
        health: 123456,
        power: 98765,
        might: 300,
        precision: 280,
        restoration: 150,
        vitalization: 140,
        dominance: 120,
        defense: 4500,
        toughness: 4200,
      },
    });

    render(<CharacterStats character={character} />);

    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('123,456')).toBeInTheDocument();
    expect(screen.getByText('Power')).toBeInTheDocument();
    expect(screen.getByText('98,765')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('4,500')).toBeInTheDocument();
    expect(screen.getByText('Toughness')).toBeInTheDocument();
    expect(screen.getByText('4,200')).toBeInTheDocument();
  });

  it('formats stats using the active locale', async () => {
    await i18n.changeLanguage('de');
    const character = createCharacter();

    render(<CharacterStats character={character} />);

    expect(screen.getByText('Gesundheit')).toBeInTheDocument();
    expect(screen.getByText('12.000')).toBeInTheDocument();
  });
});
