import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import LeagueSummaryStats from './LeagueSummaryStats';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';

describe('LeagueSummaryStats', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('always shows all four league stats', () => {
    const league = createLeague({
      average_skill_points: 12345,
      average_combat_rating: 446,
      average_pvp_combat_rating: 101,
      member_count: 3,
    });

    render(
      <LeagueSummaryStats
        league={league}
        sort="memberCount"
      />,
    );

    expect(screen.getByText('12,345')).toBeInTheDocument();
    expect(screen.getByText('446')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('Avg. Skill Points')).toHaveLength(1);
    expect(screen.getAllByText('Avg. Combat Rating')).toHaveLength(1);
    expect(screen.getAllByText('Avg. PvP Combat Rating')).toHaveLength(1);
    expect(screen.getAllByText('Member Count')).toHaveLength(1);
  });

  it('formats numbers using the active locale', () => {
    const league = createLeague({ average_skill_points: 12345 });

    render(
      <LeagueSummaryStats
        league={league}
        sort="averageSkillPoints"
      />,
    );

    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it.each([
    'averageSkillPoints',
    'averageCombatRating',
    'averagePvpCombatRating',
    'memberCount',
  ] as const)('highlights the %s stat when sorted by it', (sort) => {
    const league = createLeague();

    render(
      <LeagueSummaryStats
        league={league}
        sort={sort}
      />,
    );

    expect(screen.getAllByText('Avg. Skill Points')).toHaveLength(1);
    expect(screen.getAllByText('Avg. Combat Rating')).toHaveLength(1);
    expect(screen.getAllByText('Avg. PvP Combat Rating')).toHaveLength(1);
    expect(screen.getAllByText('Member Count')).toHaveLength(1);
  });
});
