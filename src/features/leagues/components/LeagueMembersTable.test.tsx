import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import LeagueMembersTable from './LeagueMembersTable';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeagueCharacter } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';

describe('LeagueMembersTable', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders every member with their rank, name and locale-formatted stats', () => {
    const data = [
      createLeagueCharacter({
        rank: 0,
        name: 'Comedian',
        skill_points: 12345,
        combat_rating: 446,
        pvp_combat_rating: 101,
      }),
      createLeagueCharacter({
        rank: 1,
        name: 'Batman',
        character_id: 'char-2',
        skill_points: 999,
        combat_rating: 300,
        pvp_combat_rating: 50,
      }),
    ];

    render(<LeagueMembersTable data={data} />);

    const comedianRow = screen.getByText('Comedian').closest('tr')!;
    expect(within(comedianRow).getByText('1')).toBeInTheDocument();
    expect(within(comedianRow).getByText('12,345')).toBeInTheDocument();
    expect(within(comedianRow).getByText('446')).toBeInTheDocument();
    expect(within(comedianRow).getByText('101')).toBeInTheDocument();

    const batmanRow = screen.getByText('Batman').closest('tr')!;
    expect(within(batmanRow).getByText('2')).toBeInTheDocument();
    expect(within(batmanRow).getByText('999')).toBeInTheDocument();
  });

  it('shows a leader crown for the top-ranked member only', () => {
    const data = [
      createLeagueCharacter({ rank: 0, name: 'Comedian' }),
      createLeagueCharacter({ rank: 1, name: 'Batman', character_id: 'char-2' }),
    ];

    render(<LeagueMembersTable data={data} />);

    expect(screen.getByLabelText('Leader')).toBeInTheDocument();
    const batmanRow = screen.getByText('Batman').closest('tr')!;
    expect(within(batmanRow).queryByLabelText('Leader')).not.toBeInTheDocument();
  });

  it('shows the empty state when there are no members', () => {
    render(<LeagueMembersTable data={[]} />);

    expect(screen.getByText('No members.')).toBeInTheDocument();
  });

  it('defaults to sorting by rank ascending and sorts descending on the first press', async () => {
    const user = userEvent.setup();
    const data = [
      createLeagueCharacter({ rank: 0, name: 'Comedian' }),
      createLeagueCharacter({ rank: 1, name: 'Batman', character_id: 'char-2' }),
    ];

    render(<LeagueMembersTable data={data} />);

    const rankHeader = screen.getByRole('columnheader', { name: 'Rank' });
    expect(rankHeader).toHaveAttribute('aria-sort', 'ascending');

    await user.click(rankHeader);

    expect(rankHeader).toHaveAttribute('aria-sort', 'descending');
  });

  it('sorts a different column ascending on its first press', async () => {
    const user = userEvent.setup();
    const data = [
      createLeagueCharacter({ rank: 0, name: 'Comedian' }),
      createLeagueCharacter({ rank: 1, name: 'Batman', character_id: 'char-2' }),
    ];

    render(<LeagueMembersTable data={data} />);

    const nameHeader = screen.getByRole('columnheader', { name: 'Name' });
    await user.click(nameHeader);

    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(screen.getByRole('columnheader', { name: 'Rank' })).toHaveAttribute('aria-sort', 'none');
  });
});
