import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import LeagueDetails from './LeagueDetails';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';
import { getLeague } from '@/features/leagues/api';

vi.mock('@/features/leagues/api');

vi.mock('@/features/leagues/leagues.routes', () => ({
  leagueDetailsRoute: {
    useSearch: () => ({ query: 'Legion of Doom', worldId: 2 }),
  },
}));

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderLeagueDetails() {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Suspense fallback="Loading...">
          <LeagueDetails />
        </Suspense>
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('LeagueDetails', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    vi.mocked(getLeague).mockReset();
  });

  it('fetches the league using the search params and renders every detail section', async () => {
    const league = createLeague({ name: 'Legion of Doom', world_id: '2', alignment: 'Villain' });
    vi.mocked(getLeague).mockResolvedValue(league);

    renderLeagueDetails();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Legion of Doom' }),
    ).toBeInTheDocument();
    expect(getLeague).toHaveBeenCalledWith('Legion of Doom', 2);
    expect(document.body.textContent).toContain('USPC/PS');
    expect(document.body.textContent).toContain('Villain');

    // one section per child component
    expect(screen.getByRole('img', { name: 'League image' })).toBeInTheDocument();
    expect(screen.getByText('Server')).toBeInTheDocument();
    expect(screen.getByText('Average Skill Points')).toBeInTheDocument();
    expect(screen.getByText(league.characters[0].name)).toBeInTheDocument();
  });
});
