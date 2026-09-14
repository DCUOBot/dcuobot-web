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
import CharacterInfo from './CharacterInfo';
import charactersEn from '@/features/characters/locales/en';
import { createCharacter } from '@/features/characters/character.fixture';
import i18n from '@/i18n';
import type { Character } from '@/features/characters/character';

function routeMarker(path: string) {
  return () => <div data-testid="route-marker">{path}</div>;
}

function renderCharacterInfo(character: Character) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <CharacterInfo character={character} />
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

  return render(<RouterProvider router={router} />);
}

describe('CharacterInfo', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'characters', charactersEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the character name, server and power details', async () => {
    const character = createCharacter({
      world_id: '4',
      power_type: 'Ice',
      movement_mode: 'Acrobatics',
    });

    renderCharacterInfo(character);
    await screen.findByTestId('route-marker');

    expect(screen.getByText('Comedian')).toBeInTheDocument();
    expect(screen.getByText('EUPC/PS')).toBeInTheDocument();
    expect(screen.getByText('Ice')).toBeInTheDocument();
    expect(screen.getByText('Acrobatics')).toBeInTheDocument();
  });

  it('formats skill points and combat ratings using the active locale', async () => {
    const character = createCharacter({
      skill_points: 12345,
      combat_rating: 446,
      pvp_combat_rating: 101,
    });

    renderCharacterInfo(character);
    await screen.findByTestId('route-marker');

    expect(screen.getByText('12,345')).toBeInTheDocument();
    expect(screen.getByText('446')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('links the league name to the league lookup when the character has a guild', async () => {
    const character = createCharacter({
      guild: { id: 'g1', name: 'Legion of Doom' },
      world_id: '2',
    });

    renderCharacterInfo(character);
    await screen.findByTestId('route-marker');

    const link = screen.getByRole('link', { name: 'Legion of Doom' });
    const url = new URL(link.getAttribute('href')!, 'http://localhost');
    expect(url.pathname).toBe('/leagues');
    expect(url.searchParams.get('query')).toBe('Legion of Doom');
    expect(url.searchParams.get('worldId')).toBe('2');
    expect(link.getAttribute('href')).not.toContain('%22');
  });

  it('shows a placeholder instead of a link when the character has no guild', async () => {
    const character = createCharacter({ guild: null });

    renderCharacterInfo(character);
    await screen.findByTestId('route-marker');

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
