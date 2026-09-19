import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LoadingBar from './LoadingBar';

let mockIsLoading = false;

vi.mock('@tanstack/react-router', () => ({
  useRouterState: (options?: { select?: (state: { isLoading: boolean }) => unknown }) => {
    const state = { isLoading: mockIsLoading };
    return options?.select ? options.select(state) : state;
  },
}));

function getBar(container: HTMLElement) {
  return container.querySelector('.bg-brand');
}

describe('LoadingBar', () => {
  beforeEach(() => {
    mockIsLoading = false;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when not loading', () => {
    const { container } = render(<LoadingBar />);

    expect(getBar(container)).not.toBeInTheDocument();
  });

  it('becomes visible with progress reset to 0% when loading starts', () => {
    mockIsLoading = true;
    const { container } = render(<LoadingBar />);

    expect(getBar(container)).toHaveStyle({ width: '0%' });
  });

  it('increases progress over time while loading', () => {
    mockIsLoading = true;
    const { container } = render(<LoadingBar />);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(getBar(container)).toHaveStyle({ width: '10%' });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(getBar(container)).toHaveStyle({ width: '20%' });

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(getBar(container)).toHaveStyle({ width: '24%' });
  });

  it('stops increasing progress once it reaches 99%', () => {
    mockIsLoading = true;
    const { container } = render(<LoadingBar />);

    act(() => {
      vi.advanceTimersByTime(200 * 100);
    });

    expect(getBar(container)).toHaveStyle({ width: '99%' });
  });

  it('jumps to 100% and hides shortly after loading finishes', () => {
    mockIsLoading = true;
    const { container, rerender } = render(<LoadingBar />);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    mockIsLoading = false;
    rerender(<LoadingBar />);

    expect(getBar(container)).toHaveStyle({ width: '100%' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(getBar(container)).not.toBeInTheDocument();
  });

  it('restarts progress from 0% if loading starts again', () => {
    mockIsLoading = true;
    const { container, rerender } = render(<LoadingBar />);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(getBar(container)).toHaveStyle({ width: '10%' });

    mockIsLoading = false;
    rerender(<LoadingBar />);
    expect(getBar(container)).toHaveStyle({ width: '100%' });

    mockIsLoading = true;
    rerender(<LoadingBar />);

    expect(getBar(container)).toHaveStyle({ width: '0%' });
  });

  it('clears pending timers when unmounted while loading', () => {
    mockIsLoading = true;
    const { unmount } = render(<LoadingBar />);

    expect(() => unmount()).not.toThrow();
  });

  it('clears pending timers when unmounted while hiding', () => {
    mockIsLoading = true;
    const { unmount, rerender } = render(<LoadingBar />);

    mockIsLoading = false;
    rerender(<LoadingBar />);

    expect(() => unmount()).not.toThrow();
  });
});
