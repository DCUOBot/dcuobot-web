import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StatList from './StatList';

describe('StatList', () => {
  it('renders a label and value for every item', () => {
    render(
      <StatList
        items={[
          { key: 'a', label: 'Server', value: <strong>EUPC/PS</strong> },
          { key: 'b', label: 'Members', value: <strong>77</strong> },
        ]}
      />,
    );

    expect(screen.getByText('Server')).toBeInTheDocument();
    expect(screen.getByText('EUPC/PS')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
  });

  it('renders arbitrary value content, not just strings', () => {
    render(
      <StatList
        items={[
          {
            key: 'a',
            label: 'League',
            value: <span data-testid="custom-value">custom</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
  });
});
