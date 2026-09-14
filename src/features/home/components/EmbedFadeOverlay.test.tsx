import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EmbedFadeOverlay from './EmbedFadeOverlay';

describe('EmbedFadeOverlay', () => {
  it('renders the gradient overlay', () => {
    const { container } = render(<EmbedFadeOverlay />);

    const overlay = container.querySelector('.bg-gradient-to-b');
    expect(overlay).toBeInTheDocument();
  });

  it('merges extra classNames onto the overlay', () => {
    const { container } = render(<EmbedFadeOverlay className="lg:hidden" />);

    const overlay = container.querySelector('.bg-gradient-to-b');
    expect(overlay).toHaveClass('lg:hidden');
  });
});
