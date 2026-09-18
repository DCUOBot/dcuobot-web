import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import LeagueSummary from './LeagueSummary';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';
import type { League } from '@/features/leagues/models/league';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderLeagueSummary(league: League, index: number, sort: string) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <LeagueSummary
          league={league}
          index={index}
          sort={sort}
        />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/leagues',
      component: routeMarker('/leagues'),
    }),
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  return render(<RouterProvider router={router} />);
}

describe('LeagueSummary', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the league image, heading and stats', async () => {
    const league = createLeague({ name: 'Legion of Doom' });

    renderLeagueSummary(league, 0, 'averageSkillPoints');
    await screen.findByTestId('route-marker');

    expect(screen.getByRole('img', { name: 'League image' })).toHaveAttribute(
      'src',
      '/assets/images/genders/mixed.jpeg',
    );
    expect(screen.getByText('Legion of Doom')).toBeInTheDocument();
    expect(screen.getAllByText('Avg. Skill Points')).toHaveLength(1);
  });

  it('links to the leagues search page for that league and world', async () => {
    const league = createLeague({ name: 'Legion of Doom', world_id: '4' });

    renderLeagueSummary(league, 0, 'averageSkillPoints');
    await screen.findByTestId('route-marker');

    const link = screen.getByRole('link');
    const url = new URL(link.getAttribute('href')!, 'http://localhost');
    expect(url.pathname).toBe('/leagues');
    expect(url.searchParams.get('query')).toBe('Legion of Doom');
    expect(url.searchParams.get('worldId')).toBe('4');
  });

  it('passes the sort criteria through to the stats section', async () => {
    const league = createLeague();

    renderLeagueSummary(league, 0, 'memberCount');
    await screen.findByTestId('route-marker');

    expect(screen.getByText('Member Count')).toBeInTheDocument();
  });
});
