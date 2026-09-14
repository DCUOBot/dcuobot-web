import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import HeaderSearch from './HeaderSearch';
import '@/i18n';

const mockNavigate = vi.fn();
let mockPathname = '/';
let mockRouteSearch: { worldId?: number; query?: string } = {};

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useLocation: (options?: { select?: (location: { pathname: string }) => unknown }) => {
    const location = { pathname: mockPathname };
    return options?.select ? options.select(location) : location;
  },
  useSearch: () => mockRouteSearch,
}));

describe('HeaderSearch', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockPathname = '/';
    mockRouteSearch = {};
  });

  it('renders the search type, server and query controls with defaults', () => {
    render(<HeaderSearch />);

    expect(screen.getByRole('button', { name: /Type$/ })).toHaveTextContent('Character');
    expect(screen.getByRole('button', { name: /Server$/ })).toHaveTextContent('USPC/PS');
    expect(screen.getByPlaceholderText('Lookup character or league...')).toHaveValue('');
  });

  it('navigates to /characters with the trimmed query and default server on submit', async () => {
    const user = userEvent.setup();
    render(<HeaderSearch />);

    await user.type(
      screen.getByPlaceholderText('Lookup character or league...'),
      '  SomeCharacter  ',
    );
    await user.keyboard('{Enter}');

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/characters',
      search: { worldId: 2, query: 'SomeCharacter' },
    });
  });

  it('navigates to /leagues when the search type is set to league', async () => {
    const user = userEvent.setup();
    render(<HeaderSearch />);

    await user.click(screen.getByRole('button', { name: /Type$/ }));
    await user.click(await screen.findByRole('option', { name: 'League' }));

    await user.type(screen.getByPlaceholderText('Lookup character or league...'), 'SomeLeague');
    await user.keyboard('{Enter}');

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/leagues',
      search: { worldId: 2, query: 'SomeLeague' },
    });
  });

  it('uses the selected server as the worldId on submit', async () => {
    const user = userEvent.setup();
    render(<HeaderSearch />);

    await user.click(screen.getByRole('button', { name: /Server$/ }));
    await user.click(await screen.findByRole('option', { name: 'Xbox' }));

    await user.type(screen.getByPlaceholderText('Lookup character or league...'), 'query');
    await user.keyboard('{Enter}');

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/characters',
      search: { worldId: 5001, query: 'query' },
    });
  });

  it('does not navigate when the query is empty', async () => {
    const user = userEvent.setup();
    render(<HeaderSearch />);

    await user.click(screen.getByPlaceholderText('Lookup character or league...'));
    await user.keyboard('{Enter}');

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('populates the form from the current route search when viewing a character page', () => {
    mockPathname = '/characters';
    mockRouteSearch = { worldId: 4, query: 'SomeCharacter' };

    render(<HeaderSearch />);

    expect(screen.getByRole('button', { name: /Type$/ })).toHaveTextContent('Character');
    expect(screen.getByRole('button', { name: /Server$/ })).toHaveTextContent('EUPC/PS');
    expect(screen.getByPlaceholderText('Lookup character or league...')).toHaveValue(
      'SomeCharacter',
    );
  });

  it('populates the form from the current route search when viewing a league page', () => {
    mockPathname = '/leagues';
    mockRouteSearch = { worldId: 11, query: 'SomeLeague' };

    render(<HeaderSearch />);

    expect(screen.getByRole('button', { name: /Type$/ })).toHaveTextContent('League');
    expect(screen.getByRole('button', { name: /Server$/ })).toHaveTextContent('EU Switch');
    expect(screen.getByPlaceholderText('Lookup character or league...')).toHaveValue('SomeLeague');
  });

  it('keeps the default form values when the route search is missing a query or worldId', () => {
    mockPathname = '/characters';
    mockRouteSearch = { worldId: 4 };

    render(<HeaderSearch />);

    expect(screen.getByRole('button', { name: /Type$/ })).toHaveTextContent('Character');
    expect(screen.getByRole('button', { name: /Server$/ })).toHaveTextContent('USPC/PS');
    expect(screen.getByPlaceholderText('Lookup character or league...')).toHaveValue('');
  });
});
