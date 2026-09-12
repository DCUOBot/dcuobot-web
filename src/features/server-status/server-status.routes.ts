import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';

export const serverStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/server-status',
  loader: () =>
    loadFeatureLocale('serverStatus', {
      en: () => import('@/features/server-status/locales/en'),
      de: () => import('@/features/server-status/locales/de'),
    }),
  component: lazyRouteComponent(() => import('@/features/server-status/ServerStatus')),
});

export const serverStatusRoutes = serverStatusRoute;
