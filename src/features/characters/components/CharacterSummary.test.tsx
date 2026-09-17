import { render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import CharacterSummary from './CharacterSummary';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/fixtures/character.fixture';
import i18n from '@/i18n';
import type { Character } from '@/features/characters/models/character';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderCharacterSummary(character: Character, index: number, sort: string) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <CharacterSummary
          character={character}
          index={index}
          sort={sort}
        />
        <Outlet />
      </>
    ),
  });

  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: '/', component: routeMarker('/') }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/characters',
      component: routeMarker('/characters'),
    }),
  ]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  return render(<RouterProvider router={router} />);
}

describe('CharacterSummary', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the character image, heading and stats', async () => {
    const character = createCharacter({ name: 'Comedian' });

    renderCharacterSummary(character, 0, 'skill_points');
    await screen.findByTestId('route-marker');

    expect(screen.getByRole('img', { name: 'Character image' })).toHaveAttribute(
      'src',
      character.image.url,
    );
    expect(screen.getByText('Comedian')).toBeInTheDocument();
    expect(screen.getAllByText('Skill Points')).toHaveLength(1);
  });

  it('links to the character details page for that character and world', async () => {
    const character = createCharacter({ name: 'Comedian', world_id: '4' });

    renderCharacterSummary(character, 0, 'skill_points');
    await screen.findByTestId('route-marker');

    const link = screen.getByRole('link');
    const url = new URL(link.getAttribute('href')!, 'http://localhost');
    expect(url.pathname).toBe('/characters');
    expect(url.searchParams.get('query')).toBe('Comedian');
    expect(url.searchParams.get('worldId')).toBe('4');
  });

  it('passes the sort criteria through to the stats section', async () => {
    const character = createCharacter();

    renderCharacterSummary(character, 0, 'max_health');
    await screen.findByTestId('route-marker');

    expect(screen.getByText('Health')).toBeInTheDocument();
  });
});
