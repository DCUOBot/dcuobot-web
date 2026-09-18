import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';
import { leagueQueries } from '@/features/leagues/queries';
import { requireEntitySearch, validateEntitySearch } from '@/lib/entity-search-route';
import { validateRankingSearch } from '@/lib/ranking-search-route';

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
  validateSearch: validateEntitySearch,
  beforeLoad: requireEntitySearch,
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context: { queryClient }, deps: { search } }) =>
    queryClient.query(leagueQueries.getLeague(search.query!, search.worldId!)),
  errorComponent: lazyRouteComponent(() => import('@/features/leagues/LeagueDetailsError')),
  component: lazyRouteComponent(() => import('@/features/leagues/LeagueDetails')),
});

export const leaguesRankingRoute = createRoute({
  getParentRoute: () => leaguesRoute,
  path: '/ranking',
  validateSearch: (search: Record<string, unknown>) =>
    validateRankingSearch(search, 'averageSkillPoints'),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context: { queryClient }, deps: { search } }) =>
    queryClient.query(leagueQueries.getLeaguesRanking(search.worldId, search.sort)),
  errorComponent: lazyRouteComponent(() => import('@/components/ErrorFallback')),
  component: lazyRouteComponent(() => import('@/features/leagues/LeaguesRanking')),
});

export const leaguesRoutes = leaguesRoute.addChildren([leagueDetailsRoute, leaguesRankingRoute]);
