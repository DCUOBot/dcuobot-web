import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import LeagueInfo from './LeagueInfo';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';

describe('LeagueInfo', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the league name and server', () => {
    const league = createLeague({ name: 'Legion of Doom', world_id: '4' });

    render(<LeagueInfo league={league} />);

    expect(screen.getByText('Legion of Doom')).toBeInTheDocument();
    expect(screen.getByText('EUPC/PS')).toBeInTheDocument();
  });

  it('formats the member count using the active locale', () => {
    const league = createLeague({ member_count: 12345 });

    render(<LeagueInfo league={league} />);

    expect(screen.getByText('12,345')).toBeInTheDocument();
  });
});
