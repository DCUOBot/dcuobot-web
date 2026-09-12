import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';

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
  component: lazyRouteComponent(() => import('@/features/leagues/LeagueDetails')),
});

export const leaguesRankingRoute = createRoute({
  getParentRoute: () => leaguesRoute,
  path: '/ranking',
  component: lazyRouteComponent(() => import('@/features/leagues/LeaguesRanking')),
});

export const leaguesRoutes = leaguesRoute.addChildren([leagueDetailsRoute, leaguesRankingRoute]);
