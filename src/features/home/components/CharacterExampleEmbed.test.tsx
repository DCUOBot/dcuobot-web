import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CharacterExampleEmbed from './CharacterExampleEmbed';

describe('CharacterExampleEmbed', () => {
  it('renders the character name and server', () => {
    render(<CharacterExampleEmbed />);

    expect(screen.getByText('ObsidianChill')).toBeInTheDocument();
    expect(screen.getByText('Server: USPC/PS')).toBeInTheDocument();
  });

  it('renders the basic character stats', () => {
    render(<CharacterExampleEmbed />);

    expect(screen.getByText('Skill Points')).toBeInTheDocument();
    expect(screen.getByText('825')).toBeInTheDocument();
    expect(screen.getByText('PVE CR')).toBeInTheDocument();
    expect(screen.getByText('446')).toBeInTheDocument();
    expect(screen.getByText('PVP CR')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('renders the equipped artifacts with their icons', () => {
    render(<CharacterExampleEmbed />);

    expect(screen.getByText('Quislet')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Quislet' })).toBeInTheDocument();
    expect(screen.getByText('The Transformation Card')).toBeInTheDocument();
    expect(screen.getByText("Ebon's Untethered Shadow")).toBeInTheDocument();
  });

  it('renders empty artifact slots', () => {
    render(<CharacterExampleEmbed />);

    expect(screen.getByText('Artifact Four')).toBeInTheDocument();
    expect(screen.getByText('Artifact Five')).toBeInTheDocument();
    expect(screen.getAllByText('No Artifact')).toHaveLength(2);
  });

  it('renders the combat and support allies', () => {
    render(<CharacterExampleEmbed />);

    expect(screen.getByText('Death Metal Batman')).toBeInTheDocument();
    expect(screen.getByText('Shazam')).toBeInTheDocument();
    expect(screen.getByText('Batman Who Laughs')).toBeInTheDocument();
  });
});
