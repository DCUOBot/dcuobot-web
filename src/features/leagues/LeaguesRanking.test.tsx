import { act, render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import LeaguesRanking from './LeaguesRanking';
import leaguesEn from '@/features/leagues/locales/en';
import { createLeague } from '@/features/leagues/fixtures/league.fixture';
import i18n from '@/i18n';
import { getLeaguesRanking } from '@/features/leagues/api';

vi.mock('@/features/leagues/api');

vi.mock('@/features/leagues/leagues.routes', () => ({
  leaguesRankingRoute: {
    useSearch: () => ({ worldId: 0, sort: 'averageSkillPoints' }),
  },
}));

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderLeaguesRanking() {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Suspense fallback="Loading...">
          <LeaguesRanking />
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

describe('LeaguesRanking', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  beforeEach(() => {
    observerCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    vi.mocked(getLeaguesRanking).mockReset();
    vi.unstubAllGlobals();
  });

  it('fetches the ranking using the search params and renders the heading and form', async () => {
    const leagues = [createLeague({ name: 'Legion of Doom' })];
    vi.mocked(getLeaguesRanking).mockResolvedValue(leagues);

    renderLeaguesRanking();

    expect(await screen.findByText('Legion of Doom')).toBeInTheDocument();
    expect(getLeaguesRanking).toHaveBeenCalledWith(0, 'averageSkillPoints');
    expect(screen.getByRole('heading', { level: 1, name: 'Leagues Ranking' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh ranking' })).toBeInTheDocument();
  });

  it('ranks the visible leagues starting from one', async () => {
    const leagues = [
      createLeague({ name: 'First', guild_id: 'guild-first' }),
      createLeague({ name: 'Second', guild_id: 'guild-second' }),
      createLeague({ name: 'Third', guild_id: 'guild-third' }),
    ];
    vi.mocked(getLeaguesRanking).mockResolvedValue(leagues);

    renderLeaguesRanking();

    await screen.findByText('First');
    expect(document.body.textContent).toContain('#1');
    expect(document.body.textContent).toContain('#2');
    expect(document.body.textContent).toContain('#3');
  });

  it('renders only the first chunk of leagues until the sentinel intersects', async () => {
    const leagues = Array.from({ length: 15 }, (_, i) =>
      createLeague({ name: `League ${i + 1}`, guild_id: `guild-${i + 1}` }),
    );
    vi.mocked(getLeaguesRanking).mockResolvedValue(leagues);

    renderLeaguesRanking();

    await screen.findByText('League 1');
    expect(screen.getByText('League 10')).toBeInTheDocument();
    expect(screen.queryByText('League 11')).not.toBeInTheDocument();

    expect(observerCallback).not.toBeNull();
    act(() => {
      observerCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(await screen.findByText('League 11')).toBeInTheDocument();
    expect(screen.getByText('League 15')).toBeInTheDocument();
  });

  it('does not render a load-more sentinel once every league is visible', async () => {
    const leagues = [createLeague({ name: 'Legion of Doom' })];
    vi.mocked(getLeaguesRanking).mockResolvedValue(leagues);

    renderLeaguesRanking();

    await screen.findByText('Legion of Doom');
    expect(observerCallback).toBeNull();
  });
});
