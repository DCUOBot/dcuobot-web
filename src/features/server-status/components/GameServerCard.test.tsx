import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import GameServerCard from './GameServerCard';
import serverStatusEn from '@/features/server-status/locales/en';
import { createGameServer } from '@/features/server-status/fixtures/game-server.fixture';
import i18n from '@/i18n';

describe('GameServerCard', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'serverStatus', serverStatusEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

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
    ['ONLINE', 'Online'],
    ['OFFLINE', 'Offline'],
    ['LOCKED', 'Locked'],
  ] as const)('renders the %s status as %s', (status, expected) => {
    render(<GameServerCard gameServer={createGameServer({ status })} />);

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it.each([
    ['High', 'High'],
    ['Medium', 'Medium'],
    ['Low', 'Low'],
    ['MEDIUM', 'Medium'],
  ])('translates the %s population to %s', (population, expected) => {
    render(<GameServerCard gameServer={createGameServer({ population })} />);

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('falls back to the raw population value when it is not a known level', () => {
    render(<GameServerCard gameServer={createGameServer({ population: 'Unknown' })} />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('renders the labels for server, status and population', () => {
    render(<GameServerCard gameServer={createGameServer()} />);

    expect(screen.getByText('Server')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
  });
});
