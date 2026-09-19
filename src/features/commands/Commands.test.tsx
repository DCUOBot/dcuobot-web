import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Commands from './Commands';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Commands', () => {
  it('renders the heading, subheading and a tab for every command', () => {
    render(<Commands />);

    expect(screen.getByRole('heading', { level: 1, name: 'commands.heading' })).toBeInTheDocument();
    expect(screen.getByText('commands.subheading')).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: '/character' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/statistics' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/league' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/topcharacters' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/topleagues' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/servers' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/lfg' })).toBeInTheDocument();
  });

  it('selects the first command by default and shows its description and argument keys', () => {
    render(<Commands />);

    expect(screen.getByRole('tab', { name: '/character' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText('/character')).toBeInTheDocument();
    expect(within(panel).getByText('commands.commands.character.description')).toBeInTheDocument();
    expect(within(panel).getByText('server:')).toBeInTheDocument();
    expect(within(panel).getByText('commands.commands.character.args.server')).toBeInTheDocument();
    expect(within(panel).getByText('name:')).toBeInTheDocument();
    expect(within(panel).getByText('commands.commands.character.args.name')).toBeInTheDocument();
  });

  it('switches to another command when its tab is clicked', async () => {
    const user = userEvent.setup();
    render(<Commands />);

    await user.click(screen.getByRole('tab', { name: '/servers' }));

    expect(screen.getByRole('tab', { name: '/servers' })).toHaveAttribute('aria-selected', 'true');

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText('/servers')).toBeInTheDocument();
    expect(within(panel).getByText('commands.commands.servers.description')).toBeInTheDocument();
    expect(within(panel).queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByText('/character', { selector: 'code' })).not.toBeInTheDocument();
  });

  it('lists every argument for a command with multiple arguments', async () => {
    const user = userEvent.setup();
    render(<Commands />);

    await user.click(screen.getByRole('tab', { name: '/lfg' }));

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getAllByRole('listitem')).toHaveLength(5);
    expect(within(panel).getByText('instance_name:')).toBeInTheDocument();
    expect(within(panel).getByText('commands.commands.lfg.args.instance_name')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_tanks:')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_healers:')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_controllers:')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_dps:')).toBeInTheDocument();
  });
});
