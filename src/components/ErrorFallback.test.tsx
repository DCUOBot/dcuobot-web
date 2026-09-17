import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import ErrorFallback from './ErrorFallback';
import '@/i18n';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('ErrorFallback', () => {
  afterEach(() => {
    mockNavigate.mockClear();
    vi.mocked(toast.error).mockClear();
  });

  it('shows a generic error toast and navigates back to the home page', () => {
    render(<ErrorFallback />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('An error occurred, please try again later.', {
      position: 'bottom-center',
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('does not show the toast more than once when re-rendered', () => {
    const { rerender } = render(<ErrorFallback />);
    rerender(<ErrorFallback />);

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('renders nothing', () => {
    const { container } = render(<ErrorFallback />);

    expect(container).toBeEmptyDOMElement();
  });
});
