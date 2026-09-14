import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CharacterArtifacts from './CharacterArtifacts';
import { createCharacter } from '@/features/characters/character.fixture';

describe('CharacterArtifacts', () => {
  it('renders an image for each equipped artifact with the dcuo.bot host stripped', () => {
    const character = createCharacter({
      artifacts: [
        {
          id: 'a1',
          name: 'Quislet',
          image_url: 'https://dcuo.bot/artifacts/quislet.png',
          discord_emoji_id: '1',
        },
        {
          id: 'a2',
          name: 'The Transformation Card',
          image_url: 'https://dcuo.bot/artifacts/transformation_card.png',
          discord_emoji_id: '2',
        },
      ],
    });

    render(<CharacterArtifacts character={character} />);

    expect(screen.getByRole('img', { name: 'Quislet' })).toHaveAttribute(
      'src',
      '/artifacts/quislet.png',
    );
    expect(screen.getByRole('img', { name: 'The Transformation Card' })).toHaveAttribute(
      'src',
      '/artifacts/transformation_card.png',
    );
  });

  it('renders a tooltip trigger for each artifact so its name is available on hover', () => {
    const character = createCharacter({
      artifacts: [
        {
          id: 'a1',
          name: 'Quislet',
          image_url: 'https://dcuo.bot/artifacts/quislet.png',
          discord_emoji_id: '1',
        },
      ],
    });

    render(<CharacterArtifacts character={character} />);

    expect(screen.getByRole('button', { name: 'Quislet' })).toBeInTheDocument();
  });
});
