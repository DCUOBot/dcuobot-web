import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GameServerCard from './GameServerCard';
import { createGameServer } from '@/features/server-status/fixtures/game-server.fixture';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('GameServerCard', () => {
  it.each([
    ['US', 'USPC/PS'],
    ['EU', 'EUPC/PS'],
    ['US Xbox', 'Xbox'],
    ['Switch', 'Switch'],
  ])('maps the %s server name to %s', (server_name, expected) => {
    render(<GameServerCard gameServer={createGameServer({ server_name })} />);

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it.each([
    ['ONLINE', 'serverStatus.online'],
    ['OFFLINE', 'serverStatus.offline'],
    ['LOCKED', 'serverStatus.locked'],
  ] as const)('renders the %s status using its translation key', (status, expectedKey) => {
    render(<GameServerCard gameServer={createGameServer({ status })} />);

    expect(screen.getByText(expectedKey)).toBeInTheDocument();
  });

  it.each([
    ['High', 'serverStatus.high'],
    ['Medium', 'serverStatus.medium'],
    ['Low', 'serverStatus.low'],
    ['MEDIUM', 'serverStatus.medium'],
  ])('translates the %s population using its translation key', (population, expectedKey) => {
    render(<GameServerCard gameServer={createGameServer({ population })} />);

    expect(screen.getByText(expectedKey)).toBeInTheDocument();
  });

  it('falls back to the raw population value when it is not a known level', () => {
    render(<GameServerCard gameServer={createGameServer({ population: 'Unknown' })} />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders the translation keys for the server, status and population labels', () => {
    render(<GameServerCard gameServer={createGameServer()} />);

    expect(screen.getByText('serverStatus.server')).toBeInTheDocument();
    expect(screen.getByText('serverStatus.status')).toBeInTheDocument();
    expect(screen.getByText('serverStatus.population')).toBeInTheDocument();
  });
});
