import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';
import { characterQueries } from '@/features/characters/queries';
import { requireEntitySearch, validateEntitySearch } from '@/lib/entity-search-route';
import { validateRankingSearch } from '@/lib/ranking-search-route';

export const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/characters',
  loader: () =>
    loadFeatureLocale('characters', {
      en: () => import('@/features/characters/locales/en'),
      de: () => import('@/features/characters/locales/de'),
    }),
});

export const characterDetailsRoute = createRoute({
  getParentRoute: () => charactersRoute,
  path: '/',
  validateSearch: validateEntitySearch,
  beforeLoad: requireEntitySearch,
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context: { queryClient }, deps: { search } }) =>
    queryClient.query(characterQueries.getCharacter(search.query!, search.worldId!)),
  errorComponent: lazyRouteComponent(() => import('@/features/characters/CharacterDetailsError')),
  component: lazyRouteComponent(() => import('@/features/characters/CharacterDetails')),
});

export const charactersRankingRoute = createRoute({
  getParentRoute: () => charactersRoute,
  path: '/ranking',
  validateSearch: (search: Record<string, unknown>) =>
    validateRankingSearch(search, 'skill_points'),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context: { queryClient }, deps: { search } }) =>
    queryClient.query(characterQueries.getCharactersRanking(search.worldId, search.sort)),
  errorComponent: lazyRouteComponent(() => import('@/components/ErrorFallback')),
  component: lazyRouteComponent(() => import('@/features/characters/CharactersRanking')),
});

export const charactersRoutes = charactersRoute.addChildren([
  characterDetailsRoute,
  charactersRankingRoute,
]);
