import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';

export const commandsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/commands',
  loader: () =>
    loadFeatureLocale('commands', {
      en: () => import('@/features/commands/locales/en'),
      de: () => import('@/features/commands/locales/de'),
    }),
  component: lazyRouteComponent(() => import('@/features/commands/Commands')),
});

export const commandsRoutes = commandsRoute;
