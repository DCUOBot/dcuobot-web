import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RankingStat from './RankingStat';

describe('RankingStat', () => {
  it('renders the value and label', () => {
    render(
      <RankingStat
        value="825"
        label="Skill Points"
        active
      />,
    );

    expect(screen.getByText('825')).toBeInTheDocument();
    expect(screen.getByText('Skill Points')).toBeInTheDocument();
  });

  it('does not mute the value or label when active', () => {
    render(
      <RankingStat
        value="825"
        label="Skill Points"
        active
      />,
    );

    expect(screen.getByText('825')).not.toHaveClass('text-muted-foreground');
    expect(screen.getByText('Skill Points')).not.toHaveClass('text-muted-foreground');
  });

  it('mutes the value and label when inactive', () => {
    render(
      <RankingStat
        value="825"
        label="Skill Points"
        active={false}
      />,
    );

    expect(screen.getByText('825')).toHaveClass('text-muted-foreground');
    expect(screen.getByText('Skill Points')).toHaveClass('text-muted-foreground');
  });
});
