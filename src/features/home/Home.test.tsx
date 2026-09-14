import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import Home from './Home';
import homeEn from './locales/en';
import i18n from '@/i18n';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderHome(initialPath = '/') {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Home />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
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

describe('Home', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'home', homeEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the heading, subheading and call-to-action buttons', async () => {
    renderHome();

    expect(await screen.findByTestId('route-marker')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'DCUOBot' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Lookup character and league stats in your own Discord server or on this website.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add DCUOBot' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Commands' })).toHaveAttribute('href', '/commands');
  });

  it('navigates to the commands page when the commands link is clicked', async () => {
    const user = userEvent.setup();
    renderHome();
    await screen.findByTestId('route-marker');

    await user.click(screen.getByRole('link', { name: 'Commands' }));

    await expectRoute('/commands');
  });

  it('renders the LFG, character, league and rankings feature sections', async () => {
    renderHome();
    await screen.findByTestId('route-marker');

    expect(
      screen.getByRole('heading', { level: 2, name: 'Looking for Group' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Character Information' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'League Information' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Rankings' })).toBeInTheDocument();
  });

  it('renders the example embeds for each feature section', async () => {
    renderHome();
    await screen.findByTestId('route-marker');

    expect(screen.getByText('LFG Source Wall (Elite Plus)')).toBeInTheDocument();
    expect(screen.getByText('ObsidianChill')).toBeInTheDocument();
    expect(screen.getByText('Ethos')).toBeInTheDocument();
    expect(screen.getByText('Top Characters')).toBeInTheDocument();
    expect(screen.getByText('Top Leagues')).toBeInTheDocument();
  });
});
