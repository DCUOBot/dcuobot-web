import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';

type CharacterSearch = {
  worldId?: number;
  query?: string;
};

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
  validateSearch: (search: Record<string, unknown>): CharacterSearch => ({
    worldId: search.worldId ? Number(search.worldId) : undefined,
    query: search.query ? (search.query as string) : undefined,
  }),
  component: lazyRouteComponent(() => import('@/features/characters/CharacterDetails')),
});

export const charactersRankingRoute = createRoute({
  getParentRoute: () => charactersRoute,
  path: '/ranking',
  component: lazyRouteComponent(() => import('@/features/characters/CharactersRanking')),
});

export const charactersRoutes = charactersRoute.addChildren([
  characterDetailsRoute,
  charactersRankingRoute,
]);
