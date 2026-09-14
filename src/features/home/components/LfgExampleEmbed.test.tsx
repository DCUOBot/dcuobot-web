import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LfgExampleEmbed from './LfgExampleEmbed';

describe('LfgExampleEmbed', () => {
  it('renders the LFG post title and creator', () => {
    render(<LfgExampleEmbed />);

    expect(screen.getByText('LFG Source Wall (Elite Plus)')).toBeInTheDocument();
    expect(screen.getByText('Created by hypeeeeeeeeee#0')).toBeInTheDocument();
  });

  it('renders every role with its filled/open slot count', () => {
    render(<LfgExampleEmbed />);

    expect(screen.getByText('Tank (0/4)')).toBeInTheDocument();
    expect(screen.getByText('Healer (0/1)')).toBeInTheDocument();
    expect(screen.getByText('Controller (0/1)')).toBeInTheDocument();
    expect(screen.getByText('DPS (1/2)')).toBeInTheDocument();
    expect(screen.getByText('hypeeeeeeeeee#0')).toBeInTheDocument();
  });

  it('renders a role icon for every role', () => {
    render(<LfgExampleEmbed />);

    expect(screen.getByRole('img', { name: 'Tank' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Healer' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Controller' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'DPS' })).toBeInTheDocument();
  });
});
