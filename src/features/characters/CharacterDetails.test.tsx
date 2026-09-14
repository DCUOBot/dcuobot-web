import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import CharacterDetails from './CharacterDetails';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/character.fixture';
import i18n from '@/i18n';
import { getCharacter } from '@/features/characters/api';

vi.mock('@/features/characters/api');

vi.mock('@/features/characters/characters.routes', () => ({
  characterDetailsRoute: {
    useSearch: () => ({ query: 'Comedian', worldId: 2 }),
  },
}));

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderCharacterDetails() {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Suspense fallback="Loading...">
          <CharacterDetails />
        </Suspense>
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/leagues',
      component: routeMarker('/leagues'),
    }),
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('CharacterDetails', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    vi.mocked(getCharacter).mockReset();
  });

  it('fetches the character using the search params and renders every detail section', async () => {
    const character = createCharacter({ name: 'Comedian', world_id: '2', alignment: 'Villain' });
    vi.mocked(getCharacter).mockResolvedValue(character);

    renderCharacterDetails();

    expect(await screen.findByRole('heading', { level: 1, name: 'Comedian' })).toBeInTheDocument();
    expect(getCharacter).toHaveBeenCalledWith('Comedian', 2);
    expect(document.body.textContent).toContain('USPC/PS');
    expect(document.body.textContent).toContain('Villain');

    // one section per child component
    expect(screen.getByRole('img', { name: 'Character image' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: character.artifacts[0].name })).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Combat Ally')).toBeInTheDocument();
  });
});
