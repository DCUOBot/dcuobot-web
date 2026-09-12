import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/layout/header/Header.tsx';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});
