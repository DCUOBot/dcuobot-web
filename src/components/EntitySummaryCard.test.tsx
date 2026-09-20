import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EntitySummaryCard from './EntitySummaryCard';

describe('EntitySummaryCard', () => {
  it('renders the image, rank heading and children stats', () => {
    render(
      <EntitySummaryCard
        imageSrc="/image.png"
        imageAlt="Comedian"
        name="Comedian"
        index={0}
        worldId="2"
        alignment="Villain"
      >
        <div data-testid="stats-slot">stats</div>
      </EntitySummaryCard>,
    );

    expect(screen.getByRole('img', { name: 'Comedian' })).toHaveAttribute('src', '/image.png');
    expect(screen.getByText('Comedian')).toBeInTheDocument();
    expect(document.body.textContent).toContain('USPC/PS');
    expect(document.body.textContent).toContain('Villain');
    expect(screen.getByTestId('stats-slot')).toBeInTheDocument();
  });
});
