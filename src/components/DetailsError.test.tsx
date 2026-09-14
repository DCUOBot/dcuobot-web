import { render } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import DetailsError from './DetailsError';
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

describe('DetailsError', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'leagues', leaguesEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
    mockNavigate.mockClear();
    vi.mocked(toast.error).mockClear();
  });

  it('shows the not found toast and navigates back to the home page when the error is a 404', () => {
    const error = { isAxiosError: true, response: { status: 404 } };
    render(
      <DetailsError
        error={error}
        namespace="leagues"
        notFoundKey="league.details.notFound"
      />,
    );

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('League not found.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('shows a generic error toast for a non-404 error', () => {
    render(
      <DetailsError
        error={new Error('boom')}
        namespace="leagues"
        notFoundKey="league.details.notFound"
      />,
    );

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('An error occurred, please try again later.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('does not show the toast more than once when re-rendered', () => {
    const error = { isAxiosError: true, response: { status: 404 } };
    const { rerender } = render(
      <DetailsError
        error={error}
        namespace="leagues"
        notFoundKey="league.details.notFound"
      />,
    );
    rerender(
      <DetailsError
        error={error}
        namespace="leagues"
        notFoundKey="league.details.notFound"
      />,
    );

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('renders nothing', () => {
    const { container } = render(
      <DetailsError
        error={undefined}
        namespace="leagues"
        notFoundKey="league.details.notFound"
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
