import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RootErrorFallback from './RootErrorFallback';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('RootErrorFallback', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders the error message', () => {
    render(<RootErrorFallback />);

    expect(screen.getByText('common.unexpectedError.title')).toBeInTheDocument();
    expect(screen.getByText('common.unexpectedError.body')).toBeInTheDocument();
  });

  it('links back to the home page with a full page navigation', () => {
    render(<RootErrorFallback />);

    expect(screen.getByRole('link', { name: 'common.unexpectedError.home' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('reloads the page when the reload button is clicked', async () => {
    const reload = vi.fn();
    vi.stubGlobal('location', { ...window.location, reload });
    const user = userEvent.setup();

    render(<RootErrorFallback />);
    await user.click(screen.getByRole('button', { name: 'common.unexpectedError.reload' }));

    expect(reload).toHaveBeenCalledOnce();
  });
});
