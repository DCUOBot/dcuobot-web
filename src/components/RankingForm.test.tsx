import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RankingForm from './RankingForm';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

const serverOptions = [
  { id: 0 as const, label: 'All Servers' },
  { id: 4 as const, label: 'EUPC/PS' },
  { id: 5001 as const, label: 'Xbox' },
];

const sortOptions = [
  { id: 'skillPoints', label: 'Skill Points' },
  { id: 'combatRating', label: 'Combat Rating' },
];

describe('RankingForm', () => {
  afterEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the server and sort selects using the current search values', () => {
    render(
      <RankingForm
        search={{ worldId: 4, sort: 'combatRating' }}
        serverOptions={serverOptions}
        sortOptions={sortOptions}
        serverAriaLabel="Server"
        serverPlaceholder="Select a server"
        sortAriaLabel="Sort criteria"
        sortPlaceholder="Select a sort criteria"
        refreshAriaLabel="Refresh ranking"
      />,
    );

    expect(screen.getByRole('button', { name: /Server$/ })).toHaveTextContent('EUPC/PS');
    expect(screen.getByRole('button', { name: /Sort criteria$/ })).toHaveTextContent(
      'Combat Rating',
    );
  });

  it('submits the current search values when the refresh button is clicked without changes', async () => {
    const user = userEvent.setup();
    render(
      <RankingForm
        search={{ worldId: 0, sort: 'skillPoints' }}
        serverOptions={serverOptions}
        sortOptions={sortOptions}
        serverAriaLabel="Server"
        serverPlaceholder="Select a server"
        sortAriaLabel="Sort criteria"
        sortPlaceholder="Select a sort criteria"
        refreshAriaLabel="Refresh ranking"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Refresh ranking' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '.',
      search: { worldId: 0, sort: 'skillPoints' },
    });
  });

  it('navigates with the newly selected server and sort criteria', async () => {
    const user = userEvent.setup();
    render(
      <RankingForm
        search={{ worldId: 0, sort: 'skillPoints' }}
        serverOptions={serverOptions}
        sortOptions={sortOptions}
        serverAriaLabel="Server"
        serverPlaceholder="Select a server"
        sortAriaLabel="Sort criteria"
        sortPlaceholder="Select a sort criteria"
        refreshAriaLabel="Refresh ranking"
      />,
    );

    await user.click(screen.getByRole('button', { name: /Server$/ }));
    await user.click(await screen.findByRole('option', { name: 'Xbox' }));

    await user.click(screen.getByRole('button', { name: /Sort criteria$/ }));
    await user.click(await screen.findByRole('option', { name: 'Combat Rating' }));

    await user.click(screen.getByRole('button', { name: 'Refresh ranking' }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '.',
      search: { worldId: 5001, sort: 'combatRating' },
    });
  });
});
