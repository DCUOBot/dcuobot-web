import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import LeaguesRankingForm from './LeaguesRankingForm';
import leaguesEn from '@/features/leagues/locales/en';
import i18n from '@/i18n';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LeaguesRankingForm', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    mockNavigate.mockClear();
  });

  it('renders the server and sort selects using the current search values', () => {
    render(<LeaguesRankingForm search={{ worldId: 4, sort: 'averageCombatRating' }} />);

    expect(screen.getByRole('button', { name: /Server$/ })).toHaveTextContent('EUPC/PS');
    expect(screen.getByRole('button', { name: /Sort criteria$/ })).toHaveTextContent(
      'Avg. Combat Rating',
    );
  });

  it('submits the current search values when the refresh button is clicked without changes', async () => {
    const user = userEvent.setup();
    render(<LeaguesRankingForm search={{ worldId: 0, sort: 'averageSkillPoints' }} />);

    await user.click(screen.getByRole('button', { name: 'Refresh ranking' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '.',
      search: { worldId: 0, sort: 'averageSkillPoints' },
    });
  });

  it('navigates with the newly selected server and sort criteria', async () => {
    const user = userEvent.setup();
    render(<LeaguesRankingForm search={{ worldId: 0, sort: 'averageSkillPoints' }} />);

    await user.click(screen.getByRole('button', { name: /Server$/ }));
    await user.click(await screen.findByRole('option', { name: 'Xbox' }));

    await user.click(screen.getByRole('button', { name: /Sort criteria$/ }));
    await user.click(await screen.findByRole('option', { name: 'Member Count' }));

    await user.click(screen.getByRole('button', { name: 'Refresh ranking' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '.',
      search: { worldId: 5001, sort: 'memberCount' },
    });
  });
});
