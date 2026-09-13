import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/layout/header/Header.tsx';
import Footer from '@/components/layout/footer/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider
      defaultTheme="system"
      storageKey="dcuobot-ui-theme"
    >
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  ),
});
