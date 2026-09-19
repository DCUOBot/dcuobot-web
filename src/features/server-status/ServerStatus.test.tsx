import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ServerStatus from './ServerStatus';
import { createGameServer } from '@/features/server-status/fixtures/game-server.fixture';
import { getServerStatus } from '@/features/server-status/api';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@/features/server-status/api');

function renderServerStatus() {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="Loading...">
        <ServerStatus />
      </Suspense>
    </QueryClientProvider>,
  );
}

describe('ServerStatus', () => {
  afterEach(() => {
    vi.mocked(getServerStatus).mockReset();
  });

  it('renders the heading and subheading translation keys', async () => {
    vi.mocked(getServerStatus).mockResolvedValue([createGameServer()]);

    renderServerStatus();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'serverStatus.heading' }),
    ).toBeInTheDocument();
    expect(screen.getByText('serverStatus.subheading')).toBeInTheDocument();
  });

  it('renders a card for each game server returned by the API', async () => {
    const gameServers = [
      createGameServer({ server_name: 'US', status: 'ONLINE', population: 'High' }),
      createGameServer({ server_name: 'EU', status: 'OFFLINE', population: 'Low' }),
    ];
    vi.mocked(getServerStatus).mockResolvedValue(gameServers);

    renderServerStatus();

    await screen.findByText('USPC/PS');
    expect(screen.getByText('EUPC/PS')).toBeInTheDocument();
    expect(screen.getByText('serverStatus.online')).toBeInTheDocument();
    expect(screen.getByText('serverStatus.offline')).toBeInTheDocument();
    expect(screen.getByText('serverStatus.high')).toBeInTheDocument();
    expect(screen.getByText('serverStatus.low')).toBeInTheDocument();
  });

  it('renders no server cards when the API returns an empty list', async () => {
    vi.mocked(getServerStatus).mockResolvedValue([]);

    renderServerStatus();

    await screen.findByRole('heading', { level: 1, name: 'serverStatus.heading' });
    expect(screen.queryByText('serverStatus.server')).not.toBeInTheDocument();
  });
});
