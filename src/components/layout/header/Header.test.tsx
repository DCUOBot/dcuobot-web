import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import Header from './Header';
import '@/i18n';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderHeader(initialPath = '/') {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Header />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/characters/ranking',
      component: routeMarker('/characters/ranking'),
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/leagues/ranking',
      component: routeMarker('/leagues/ranking'),
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/server-status',
      component: routeMarker('/server-status'),
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/commands',
      component: routeMarker('/commands'),
    }),
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });

  return render(<RouterProvider router={router} />);
}

async function expectRoute(path: string) {
  expect(await screen.findByTestId('route-marker')).toHaveTextContent(path);
}

describe('Header', () => {
  it('renders the logo, search bar and desktop nav links', async () => {
    renderHeader();

    expect(await screen.findByTestId('route-marker')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'DCUOBot Logo DCUOBot' })).toHaveAttribute('href', '/');
    expect(screen.getByPlaceholderText('Lookup character or league...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Server Status' })).toHaveAttribute(
      'href',
      '/server-status',
    );
    expect(screen.getByRole('link', { name: 'Commands' })).toHaveAttribute('href', '/commands');
    expect(screen.getByRole('button', { name: 'Add DCUOBot' })).toBeInTheDocument();
  });

  it('navigates to the characters ranking page from the rankings dropdown', async () => {
    const user = userEvent.setup();
    renderHeader();
    await screen.findByTestId('route-marker');

    await user.click(screen.getByRole('button', { name: 'Rankings' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Characters Ranking' }));

    await expectRoute('/characters/ranking');
  });

  it('navigates to the leagues ranking page from the rankings dropdown', async () => {
    const user = userEvent.setup();
    renderHeader();
    await screen.findByTestId('route-marker');

    await user.click(screen.getByRole('button', { name: 'Rankings' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Leagues Ranking' }));

    await expectRoute('/leagues/ranking');
  });

  it('opens the mobile menu and navigates to a top-level link', async () => {
    const user = userEvent.setup();
    renderHeader();
    await screen.findByTestId('route-marker');

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));
    const drawer = await screen.findByRole('dialog');

    expect(within(drawer).getByText('Menu')).toBeInTheDocument();

    await user.click(within(drawer).getByRole('link', { name: 'Server Status' }));

    await expectRoute('/server-status');
  });

  it('closes the mobile menu after navigating to a ranking sublink', async () => {
    const user = userEvent.setup();
    renderHeader();
    await screen.findByTestId('route-marker');

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));
    const drawer = await screen.findByRole('dialog');

    await user.click(within(drawer).getByRole('link', { name: 'Leagues Ranking' }));

    await expectRoute('/leagues/ranking');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
