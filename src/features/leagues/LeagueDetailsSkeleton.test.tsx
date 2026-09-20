import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LeagueDetailsSkeleton from './LeagueDetailsSkeleton';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('LeagueDetailsSkeleton', () => {
  it('renders a busy status region with placeholder blocks', () => {
    const { container } = render(<LeagueDetailsSkeleton />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(1);
  });
});
