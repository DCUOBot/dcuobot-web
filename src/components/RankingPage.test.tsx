import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RankingPage from './RankingPage';

let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

describe('RankingPage', () => {
  beforeEach(() => {
    observerCallback = null;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the heading, subheading and form', () => {
    render(
      <RankingPage
        heading="Leagues Ranking"
        subheading="Top leagues ranking based on league stats."
        form={<div data-testid="form">form</div>}
        items={['a']}
        renderItem={(item) => <span key={item}>{item}</span>}
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Leagues Ranking' })).toBeInTheDocument();
    expect(screen.getByText('Top leagues ranking based on league stats.')).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('renders only the first chunk of items until the sentinel intersects', () => {
    const items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);

    render(
      <RankingPage
        heading="Heading"
        subheading="Subheading"
        form={null}
        items={items}
        renderItem={(item) => <span key={item}>{item}</span>}
      />,
    );

    expect(screen.getByText('Item 10')).toBeInTheDocument();
    expect(screen.queryByText('Item 11')).not.toBeInTheDocument();

    expect(observerCallback).not.toBeNull();
    act(() => {
      observerCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByText('Item 11')).toBeInTheDocument();
    expect(screen.getByText('Item 15')).toBeInTheDocument();
  });

  it('does not render a load-more sentinel once every item is visible', () => {
    render(
      <RankingPage
        heading="Heading"
        subheading="Subheading"
        form={null}
        items={['only one']}
        renderItem={(item) => <span key={item}>{item}</span>}
      />,
    );

    expect(screen.getByText('only one')).toBeInTheDocument();
    expect(observerCallback).toBeNull();
  });
});
