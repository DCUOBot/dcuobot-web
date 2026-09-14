import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProtectedImage from '@/components/ProtectedImage';

describe('ProtectedImage', () => {
  it('renders the image with the given attributes and lazy loading', () => {
    render(
      <ProtectedImage
        src="/assets/images/example.png"
        alt="Example"
        width={32}
        height={32}
        className="rounded-full"
      />,
    );

    const image = screen.getByRole('img', { name: 'Example' });
    expect(image).toHaveAttribute('src', '/assets/images/example.png');
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
    expect(image).toHaveAttribute('draggable', 'false');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveClass('rounded-full');
  });

  it('renders a transparent overlay to prevent right-click saving', () => {
    const { container } = render(
      <ProtectedImage
        src="/assets/images/example.png"
        alt="Example"
        width={32}
        height={32}
      />,
    );

    const overlay = container.querySelector('.absolute.top-0.left-0.size-full');
    expect(overlay).toBeInTheDocument();
  });
});
