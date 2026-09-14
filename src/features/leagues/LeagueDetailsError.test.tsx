import { render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import LeagueDetailsError from './LeagueDetailsError';
import leaguesEn from '@/features/leagues/locales/en';
import i18n from '@/i18n';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('LeagueDetailsError', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    mockNavigate.mockClear();
    vi.mocked(toast.error).mockClear();
  });

  it('shows a not found toast and navigates back to the home page when the error is a 404', () => {
    const error = { isAxiosError: true, response: { status: 404 } };
    render(<LeagueDetailsError error={error} />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('League not found.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('shows a generic error toast and navigates back to the home page for a non-404 axios error', () => {
    const error = { isAxiosError: true, response: { status: 500 } };
    render(<LeagueDetailsError error={error} />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('An error occurred, please try again later.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('shows a generic error toast for a non-axios error', () => {
    render(<LeagueDetailsError error={new Error('boom')} />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('An error occurred, please try again later.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('shows a generic error toast when the error is undefined', () => {
    render(<LeagueDetailsError error={undefined} />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('An error occurred, please try again later.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('renders nothing', () => {
    const { container } = render(<LeagueDetailsError error={undefined} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('does not show the toast more than once when re-rendered', () => {
    const error = { isAxiosError: true, response: { status: 404 } };
    const { rerender } = render(<LeagueDetailsError error={error} />);
    rerender(<LeagueDetailsError error={error} />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
