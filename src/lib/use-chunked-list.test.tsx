import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useChunkedList } from './use-chunked-list';

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

function Harness({ items, chunkSize }: { items: number[]; chunkSize: number }) {
  const { visibleItems, hasMore, loadMoreRef } = useChunkedList(items, chunkSize);

  return (
    <div>
      <span data-testid="visible-items">{visibleItems.join(',')}</span>
      {hasMore && (
        <div
          data-testid="sentinel"
          ref={loadMoreRef}
        />
      )}
    </div>
  );
}

describe('useChunkedList', () => {
  beforeEach(() => {
    observerCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('exposes only the first chunk of items and renders a sentinel when more remain', () => {
    const items = Array.from({ length: 15 }, (_, i) => i);

    render(
      <Harness
        items={items}
        chunkSize={10}
      />,
    );

    expect(screen.getByTestId('visible-items')).toHaveTextContent(items.slice(0, 10).join(','));
    expect(screen.getByTestId('sentinel')).toBeInTheDocument();
  });

  it('reveals the next chunk once the sentinel intersects', () => {
    const items = Array.from({ length: 15 }, (_, i) => i);

    render(
      <Harness
        items={items}
        chunkSize={10}
      />,
    );

    expect(observerCallback).not.toBeNull();
    act(() => {
      observerCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByTestId('visible-items')).toHaveTextContent(items.join(','));
    expect(screen.queryByTestId('sentinel')).not.toBeInTheDocument();
  });

  it('does not render a sentinel when everything already fits in one chunk', () => {
    render(
      <Harness
        items={[0, 1, 2]}
        chunkSize={10}
      />,
    );

    expect(screen.getByTestId('visible-items')).toHaveTextContent('0,1,2');
    expect(screen.queryByTestId('sentinel')).not.toBeInTheDocument();
  });

  it('never reveals more items than exist when intersecting past the total', () => {
    const items = Array.from({ length: 12 }, (_, i) => i);

    render(
      <Harness
        items={items}
        chunkSize={10}
      />,
    );

    act(() => {
      observerCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByTestId('visible-items')).toHaveTextContent(items.join(','));
    expect(screen.queryByTestId('sentinel')).not.toBeInTheDocument();
  });
});
