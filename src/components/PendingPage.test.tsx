import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PendingPage from './PendingPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('PendingPage', () => {
  it('exposes a busy status region announcing the loading state', () => {
    render(
      <PendingPage>
        <div>content</div>
      </PendingPage>,
    );

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('common.loading')).toBeInTheDocument();
  });

  it('renders its children', () => {
    render(
      <PendingPage>
        <div>skeleton content</div>
      </PendingPage>,
    );

    expect(screen.getByText('skeleton content')).toBeInTheDocument();
  });
});
