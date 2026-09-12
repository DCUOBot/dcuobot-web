import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/layout/header/Header.tsx';
import Footer from '@/components/layout/footer/Footer';

export const rootRoute = createRootRoute({
  component: () => (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
});
