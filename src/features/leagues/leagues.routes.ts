import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';
import { leagueQueries } from '@/features/leagues/queries';

type LeagueSearch = {
  worldId?: number;
  query?: string;
};

export const leaguesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leagues',
  loader: () =>
    loadFeatureLocale('leagues', {
      en: () => import('@/features/leagues/locales/en'),
      de: () => import('@/features/leagues/locales/de'),
    }),
});

export const leagueDetailsRoute = createRoute({
  getParentRoute: () => leaguesRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>): LeagueSearch => ({
    worldId: search.worldId ? Number(search.worldId) : undefined,
    query: search.query ? (search.query as string) : undefined,
  }),
  beforeLoad: ({ search }) => {
    if (!search.query || !search.worldId) {
      throw redirect({ to: '/' });
    }
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context: { queryClient }, deps: { search } }) =>
    queryClient.query(leagueQueries.getLeague(search.query!, search.worldId!)),
  errorComponent: lazyRouteComponent(() => import('@/features/leagues/LeagueDetailsError')),
  component: lazyRouteComponent(() => import('@/features/leagues/LeagueDetails')),
});

export const leaguesRankingRoute = createRoute({
  getParentRoute: () => leaguesRoute,
  path: '/ranking',
  component: lazyRouteComponent(() => import('@/features/leagues/LeaguesRanking')),
});

export const leaguesRoutes = leaguesRoute.addChildren([leagueDetailsRoute, leaguesRankingRoute]);
