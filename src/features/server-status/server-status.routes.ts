import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from '@/app/root-route';
import { loadFeatureLocale } from '@/i18n/loadFeatureLocale';
import { serverStatusQueries } from '@/features/server-status/queries.ts';
import ServerStatusSkeleton from '@/features/server-status/ServerStatusSkeleton';

export const serverStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/server-status',
  loader: () =>
    loadFeatureLocale('serverStatus', {
      en: () => import('@/features/server-status/locales/en'),
      de: () => import('@/features/server-status/locales/de'),
    }),
});

export const serverStatusPageRoute = createRoute({
  getParentRoute: () => serverStatusRoute,
  path: '/',
  loader: ({ context: { queryClient } }) =>
    queryClient.query(serverStatusQueries.getServerStatus()),
  pendingComponent: ServerStatusSkeleton,
  pendingMs: 0,
  errorComponent: lazyRouteComponent(() => import('@/components/ErrorFallback.tsx')),
  component: lazyRouteComponent(() => import('@/features/server-status/ServerStatus')),
});

export const serverStatusRoutes = serverStatusRoute.addChildren([serverStatusPageRoute]);
