import { rootRoute } from '@/app/root-route.tsx';
import { createRouter } from '@tanstack/react-router';
import { commandsRoutes } from '@/features/commands/commands.routes';
import { homeRoutes } from '@/features/home/home.routes';
import { serverStatusRoutes } from '@/features/server-status/server-status.routes';
import { charactersRoutes } from '@/features/characters/characters.routes';
import { leaguesRoutes } from '@/features/leagues/leagues.routes';
import { privacyRoutes } from '@/features/privacy/privacy.routes';

const routeTree = rootRoute.addChildren([
  homeRoutes,
  charactersRoutes,
  leaguesRoutes,
  serverStatusRoutes,
  commandsRoutes,
  privacyRoutes,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
