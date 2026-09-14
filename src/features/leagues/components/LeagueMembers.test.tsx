import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import LeagueMembers from './LeagueMembers';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeague, createLeagueCharacter } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';

describe('LeagueMembers', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the members table with the league characters', () => {
    const league = createLeague({
      characters: [
        createLeagueCharacter({ rank: 0, name: 'Comedian' }),
        createLeagueCharacter({ rank: 1, name: 'Batman', character_id: 'char-2' }),
      ],
    });

    render(<LeagueMembers league={league} />);

    expect(screen.getByRole('grid', { name: 'Members' })).toBeInTheDocument();
    expect(screen.getByText('Comedian')).toBeInTheDocument();
    expect(screen.getByText('Batman')).toBeInTheDocument();
  });

  it('shows the empty state when the league has no members', () => {
    const league = createLeague({ characters: [] });

    render(<LeagueMembers league={league} />);

    expect(screen.getByText('No members.')).toBeInTheDocument();
  });
});
