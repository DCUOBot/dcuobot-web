import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import CharacterImage from './CharacterImage';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';
import i18n from '@/i18n';

describe('CharacterImage', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the character portrait with translated alt text', () => {
    const character = createCharacter({
      image: { url: 'https://dcuo.bot/characters/comedian.png', alt_url: '' },
    });

    render(<CharacterImage character={character} />);

    const image = screen.getByRole('img', { name: 'Character image' });
    expect(image).toHaveAttribute('src', 'https://dcuo.bot/characters/comedian.png');
  });
});
