import { createRootRouteWithContext, lazyRouteComponent, Outlet } from '@tanstack/react-router';
import Header from '@/components/layout/header/Header.tsx';
import Footer from '@/components/layout/footer/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import LoadingBar from '@/components/LoadingBar.tsx';

type RouterContext = {
  queryClient: QueryClient;
};

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: lazyRouteComponent(() => import('@/components/NotFound')),
  component: () => (
    <ThemeProvider
      defaultTheme="system"
      storageKey="dcuobot-ui-theme"
    >
      <div className="flex min-h-dvh flex-col">
        <LoadingBar />
        <Header />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  ),
});
