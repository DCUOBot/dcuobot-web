import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import NotFound from './NotFound';
import i18n from '@/i18n';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderNotFound(initialPath = '/missing') {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <NotFound />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/missing',
      component: routeMarker('/missing'),
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

describe('NotFound', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
    document.title = '';
  });

  it('renders the not-found heading and message', async () => {
    renderNotFound();

    expect(await screen.findByTestId('route-marker')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist or may have been moved.'),
    ).toBeInTheDocument();
  });

  it('sets the document title', async () => {
    renderNotFound();
    await screen.findByTestId('route-marker');

    expect(document.title).toBe('Page not found - DCUOBot');
  });

  it('navigates home when the go home link is clicked', async () => {
    const user = userEvent.setup();
    renderNotFound();
    await screen.findByTestId('route-marker');

    const homeLink = screen.getByRole('link', { name: 'Go home' });
    expect(homeLink).toHaveAttribute('href', '/');

    await user.click(homeLink);

    await expectRoute('/');
  });
});
