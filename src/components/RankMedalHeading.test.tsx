import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RankMedalHeading from './RankMedalHeading';

describe('RankMedalHeading', () => {
  it('renders the name and rank', () => {
    render(
      <RankMedalHeading
        name="Comedian"
        index={3}
        worldId="2"
        alignment="Villain"
      />,
    );

    expect(screen.getByText('Comedian')).toBeInTheDocument();
    expect(screen.getByText('#4', { exact: false })).toBeInTheDocument();
  });

  it('renders the formatted world id and alignment', () => {
    render(
      <RankMedalHeading
        name="Comedian"
        index={0}
        worldId="4"
        alignment="Hero"
      />,
    );

    expect(document.body.textContent).toContain('EUPC/PS');
    expect(document.body.textContent).toContain('Hero');
  });

  it.each([
    [0, 'text-yellow-500'],
    [1, 'text-gray-400'],
    [2, 'text-amber-600'],
  ])('renders the rank %i medal', (index, colorClass) => {
    const { container } = render(
      <RankMedalHeading
        name="Comedian"
        index={index}
        worldId="2"
        alignment="Villain"
      />,
    );

    expect(container.querySelector(`.${colorClass} svg`)).toBeInTheDocument();
  });

  it('does not render a medal for ranks after the top three', () => {
    const { container } = render(
      <RankMedalHeading
        name="Comedian"
        index={3}
        worldId="2"
        alignment="Villain"
      />,
    );

    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
