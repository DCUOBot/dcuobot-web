import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CharacterSummaryHeading from './CharacterSummaryHeading';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';

describe('CharacterSummaryHeading', () => {
  it('renders the character name and rank', () => {
    const character = createCharacter({ name: 'Comedian' });

    render(
      <CharacterSummaryHeading
        character={character}
        index={3}
      />,
    );

    expect(screen.getByText('Comedian')).toBeInTheDocument();
    expect(screen.getByText('#4', { exact: false })).toBeInTheDocument();
  });

  it('renders the formatted world id and alignment', () => {
    const character = createCharacter({ world_id: '4', alignment: 'Hero' });

    render(
      <CharacterSummaryHeading
        character={character}
        index={0}
      />,
    );

    expect(document.body.textContent).toContain('EUPC/PS');
    expect(document.body.textContent).toContain('Hero');
  });

  it.each([
    [0, 'text-yellow-500'],
    [1, 'text-gray-400'],
    [2, 'text-amber-600'],
  ])('renders the rank %i medal', (index, colorClass) => {
    const character = createCharacter();

    const { container } = render(
      <CharacterSummaryHeading
        character={character}
        index={index}
      />,
    );

    expect(container.querySelector(`.${colorClass} svg`)).toBeInTheDocument();
  });

  it('does not render a medal for ranks after the top three', () => {
    const character = createCharacter();

    const { container } = render(
      <CharacterSummaryHeading
        character={character}
        index={3}
      />,
    );

    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
