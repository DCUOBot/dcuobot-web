import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () =>
    loadFeatureLocale('home', {
      en: () => import('@/features/home/locales/en'),
      de: () => import('@/features/home/locales/de'),
    }),
  component: lazyRouteComponent(() => import('@/features/home/Home')),
});

export const homeRoutes = homeRoute;
