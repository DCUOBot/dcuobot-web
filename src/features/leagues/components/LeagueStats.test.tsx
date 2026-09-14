import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import LeagueStats from './LeagueStats';
import leaguesEn from '@/features/leagues/locales/en';
import leaguesDe from '@/features/leagues/locales/de';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';

describe('LeagueStats', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
    i18n.addResourceBundle('de', 'leagues', leaguesDe);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders every average stat with its formatted value', () => {
    const league = createLeague({
      average_skill_points: 123456,
      average_combat_rating: 446,
      average_pvp_combat_rating: 101,
    });

    render(<LeagueStats league={league} />);

    expect(screen.getByText('Average Skill Points')).toBeInTheDocument();
    expect(screen.getByText('123,456')).toBeInTheDocument();
    expect(screen.getByText('Average Combat Rating')).toBeInTheDocument();
    expect(screen.getByText('446')).toBeInTheDocument();
    expect(screen.getByText('Average PvP Combat Rating')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('formats stats using the active locale', async () => {
    await i18n.changeLanguage('de');
    const league = createLeague({ average_skill_points: 12000 });

    render(<LeagueStats league={league} />);

    expect(screen.getByText('Durchschn. Fertigkeitspunkte')).toBeInTheDocument();
    expect(screen.getByText('12.000')).toBeInTheDocument();
  });
});
