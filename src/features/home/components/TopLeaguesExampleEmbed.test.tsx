import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TopLeaguesExampleEmbed from './TopLeaguesExampleEmbed';

describe('TopLeaguesExampleEmbed', () => {
  it('renders the title and filter summary', () => {
    render(<TopLeaguesExampleEmbed />);

    expect(screen.getByText('Top Leagues')).toBeInTheDocument();
    expect(screen.getByText('Server: USPC/PS • Sort by: AVGSP')).toBeInTheDocument();
  });

  it('renders every ranked league with their average skill points', () => {
    render(<TopLeaguesExampleEmbed />);

    expect(screen.getByText('1. Evil')).toBeInTheDocument();
    expect(screen.getByText('Avg. Skill Points: 915.21')).toBeInTheDocument();
    expect(screen.getByText('2. Sever')).toBeInTheDocument();
    expect(screen.getByText('Avg. Skill Points: 819')).toBeInTheDocument();
    expect(screen.getByText('3. Wind')).toBeInTheDocument();
    expect(screen.getByText('Avg. Skill Points: 805.67')).toBeInTheDocument();
    expect(screen.getByText('4. Versed')).toBeInTheDocument();
    expect(screen.getByText('Avg. Skill Points: 787.11')).toBeInTheDocument();
  });
});
