import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';

export const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  loader: () =>
    loadFeatureLocale('privacy', {
      en: () => import('@/features/privacy/locales/en'),
      de: () => import('@/features/privacy/locales/de'),
    }),
  component: lazyRouteComponent(() => import('@/features/privacy/Privacy')),
});

export const privacyRoutes = privacyRoute;
