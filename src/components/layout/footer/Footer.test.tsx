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
import Footer from './Footer';
import i18n from '@/i18n';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderFooter(initialPath = '/') {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Footer />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/privacy',
      component: routeMarker('/privacy'),
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

describe('Footer', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the copyright notice and disclaimers', async () => {
    renderFooter();

    expect(await screen.findByTestId('route-marker')).toBeInTheDocument();
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© DCUOBot ${currentYear}. All rights reserved.`)).toBeInTheDocument();
    expect(document.body.textContent).toContain(
      'This app is not affiliated with, endorsed by, or connected to DC Universe Online.',
    );
    expect(document.body.textContent).toContain(
      'All trademarks are the property of their respective owners.',
    );
  });

  it('renders a privacy link pointing to the privacy route', async () => {
    renderFooter();
    await screen.findByTestId('route-marker');

    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy');
  });

  it('navigates to the privacy page when the privacy link is clicked', async () => {
    const user = userEvent.setup();
    renderFooter();
    await screen.findByTestId('route-marker');

    await user.click(screen.getByRole('link', { name: 'Privacy' }));

    await expectRoute('/privacy');
  });

  it('renders a discord link that opens in a new tab', async () => {
    renderFooter();
    await screen.findByTestId('route-marker');

    const discordLink = screen.getByRole('link', { name: /Discord/ });
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/XbaFwtTgMa');
    expect(discordLink).toHaveAttribute('target', '_blank');
    expect(discordLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the language select', async () => {
    renderFooter();
    await screen.findByTestId('route-marker');

    expect(screen.getByRole('button', { name: /Select language/ })).toBeInTheDocument();
  });
});
