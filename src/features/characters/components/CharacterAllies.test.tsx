import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import CharacterAllies from './CharacterAllies';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';
import i18n from '@/i18n';

describe('CharacterAllies', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the combat ally and both support allies', () => {
    const character = createCharacter({
      allies: [
        { id: '1', name: 'Shazam', combat: true },
        { id: '2', name: 'Batman', combat: false },
        { id: '3', name: 'Robin', combat: false },
      ],
    });

    render(<CharacterAllies character={character} />);

    expect(screen.getByText('Shazam')).toBeInTheDocument();
    expect(screen.getByText('Batman')).toBeInTheDocument();
    expect(screen.getByText('Robin')).toBeInTheDocument();
  });

  it('shows a placeholder for the combat and support ally slots when there are no allies', () => {
    const character = createCharacter({ allies: [] });

    render(<CharacterAllies character={character} />);

    expect(screen.getAllByText('—')).toHaveLength(3);
  });

  it('only fills the support ally slots that have an ally', () => {
    const character = createCharacter({
      allies: [
        { id: '1', name: 'Shazam', combat: true },
        { id: '2', name: 'Batman', combat: false },
      ],
    });

    render(<CharacterAllies character={character} />);

    expect(screen.getByText('Batman')).toBeInTheDocument();
    expect(screen.getAllByText('—')).toHaveLength(1);
  });
});
