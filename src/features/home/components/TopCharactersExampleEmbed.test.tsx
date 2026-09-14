import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TopCharactersExampleEmbed from './TopCharactersExampleEmbed';

describe('TopCharactersExampleEmbed', () => {
  it('renders the title and filter summary', () => {
    render(<TopCharactersExampleEmbed />);

    expect(screen.getByText('Top Characters')).toBeInTheDocument();
    expect(screen.getByText('Server: USPC/PS • Sort by: SP')).toBeInTheDocument();
  });

  it('renders every ranked character with their skill points', () => {
    render(<TopCharactersExampleEmbed />);

    expect(screen.getByText('1. ABS')).toBeInTheDocument();
    expect(screen.getByText('2. BRITTENY')).toBeInTheDocument();
    expect(screen.getByText('3. Daddy')).toBeInTheDocument();
    expect(screen.getByText('4. Fury')).toBeInTheDocument();
    expect(screen.getAllByText('Skill Points: 1,000')).toHaveLength(4);
  });
});
