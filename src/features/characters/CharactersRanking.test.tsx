import { act, render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import CharactersRanking from './CharactersRanking';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';
import i18n from '@/i18n';
import { getCharactersRanking } from '@/features/characters/api';

vi.mock('@/features/characters/api');

vi.mock('@/features/characters/characters.routes', () => ({
  charactersRankingRoute: {
    useSearch: () => ({ worldId: 0, sort: 'skill_points' }),
  },
}));

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderCharactersRanking() {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Suspense fallback="Loading...">
          <CharactersRanking />
        </Suspense>
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
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

describe('CharactersRanking', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  beforeEach(() => {
    observerCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    vi.mocked(getCharactersRanking).mockReset();
    vi.unstubAllGlobals();
  });

  it('fetches the ranking using the search params and renders the heading and form', async () => {
    const characters = [createCharacter({ name: 'Comedian' })];
    vi.mocked(getCharactersRanking).mockResolvedValue(characters);

    renderCharactersRanking();

    expect(await screen.findByText('Comedian')).toBeInTheDocument();
    expect(getCharactersRanking).toHaveBeenCalledWith(0, 'skill_points');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Characters Ranking' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh ranking' })).toBeInTheDocument();
  });

  it('ranks the visible characters starting from one', async () => {
    const characters = [
      createCharacter({ name: 'First' }),
      createCharacter({ name: 'Second' }),
      createCharacter({ name: 'Third' }),
    ];
    vi.mocked(getCharactersRanking).mockResolvedValue(characters);

    renderCharactersRanking();

    await screen.findByText('First');
    expect(document.body.textContent).toContain('#1');
    expect(document.body.textContent).toContain('#2');
    expect(document.body.textContent).toContain('#3');
  });

  it('renders only the first chunk of characters until the sentinel intersects', async () => {
    const characters = Array.from({ length: 15 }, (_, i) =>
      createCharacter({ name: `Character ${i + 1}`, character_id: `char-${i + 1}` }),
    );
    vi.mocked(getCharactersRanking).mockResolvedValue(characters);

    renderCharactersRanking();

    await screen.findByText('Character 1');
    expect(screen.getByText('Character 10')).toBeInTheDocument();
    expect(screen.queryByText('Character 11')).not.toBeInTheDocument();

    expect(observerCallback).not.toBeNull();
    act(() => {
      observerCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(await screen.findByText('Character 11')).toBeInTheDocument();
    expect(screen.getByText('Character 15')).toBeInTheDocument();
  });

  it('does not render a load-more sentinel once every character is visible', async () => {
    const characters = [createCharacter({ name: 'Comedian' })];
    vi.mocked(getCharactersRanking).mockResolvedValue(characters);

    renderCharactersRanking();

    await screen.findByText('Comedian');
    expect(observerCallback).toBeNull();
  });
});
