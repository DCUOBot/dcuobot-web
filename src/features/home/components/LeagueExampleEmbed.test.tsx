import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LeagueExampleEmbed from './LeagueExampleEmbed';

describe('LeagueExampleEmbed', () => {
  it('renders the league name and summary', () => {
    render(<LeagueExampleEmbed />);

    expect(screen.getByText('Ethos')).toBeInTheDocument();
    expect(
      screen.getByText('Server: USPC/PS • Members: 77 • Alignment: Heroes'),
    ).toBeInTheDocument();
  });

  it('renders the league averages', () => {
    render(<LeagueExampleEmbed />);

    expect(screen.getByText('Avg. Skill Points')).toBeInTheDocument();
    expect(screen.getByText('716.48')).toBeInTheDocument();
    expect(screen.getByText('Avg. Combat Rating')).toBeInTheDocument();
    expect(screen.getByText('451.39')).toBeInTheDocument();
  });

  it('renders the league members list', () => {
    render(<LeagueExampleEmbed />);

    expect(screen.getByText('League Members:')).toBeInTheDocument();
    expect(screen.getByText('Ebk')).toBeInTheDocument();
    expect(screen.getByText('Mercenary')).toBeInTheDocument();
    expect(screen.getByText('Omnipotent')).toBeInTheDocument();
  });

  it('renders the league thumbnail image', () => {
    render(<LeagueExampleEmbed />);

    expect(screen.getByRole('img', { name: 'League thumbnail' })).toBeInTheDocument();
  });
});
