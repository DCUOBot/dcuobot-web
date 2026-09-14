import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EmbedBotHeader from './EmbedBotHeader';

describe('EmbedBotHeader', () => {
  it('renders the DCUOBot logo and name', () => {
    render(<EmbedBotHeader />);

    expect(screen.getByRole('img', { name: 'DCUOBot Logo' })).toBeInTheDocument();
    expect(screen.getByText('DCUOBot')).toBeInTheDocument();
  });
});
