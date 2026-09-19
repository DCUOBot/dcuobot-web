import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ServerStatus from './ServerStatus';
import serverStatusEn from '@/features/server-status/locales/en';
import { createGameServer } from '@/features/server-status/fixtures/game-server.fixture';
import i18n from '@/i18n';
import { getServerStatus } from '@/features/server-status/api';

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
  beforeAll(() => {
    i18n.addResourceBundle('en', 'serverStatus', serverStatusEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    vi.mocked(getServerStatus).mockReset();
  });

  it('renders the heading and subheading', async () => {
    vi.mocked(getServerStatus).mockResolvedValue([createGameServer()]);

    renderServerStatus();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Server Status' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Status of the DC Universe Online game servers.')).toBeInTheDocument();
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
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('renders no server cards when the API returns an empty list', async () => {
    vi.mocked(getServerStatus).mockResolvedValue([]);

    renderServerStatus();

    await screen.findByRole('heading', { level: 1, name: 'Server Status' });
    expect(screen.queryByText('Server')).not.toBeInTheDocument();
  });
});
