import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import Commands from './Commands';
import commandsEn from '@/features/commands/locales/en';
import i18n from '@/i18n';

describe('Commands', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'commands', commandsEn);
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the heading, subheading and a tab for every command', () => {
    render(<Commands />);

    expect(screen.getByRole('heading', { level: 1, name: 'Commands' })).toBeInTheDocument();
    expect(screen.getByText('List of Discord bot commands and their usage.')).toBeInTheDocument();

    expect(screen.getByRole('tab', { name: '/character' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/statistics' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/league' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/topcharacters' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/topleagues' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/servers' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '/lfg' })).toBeInTheDocument();
  });

  it('selects the first command by default and shows its description and arguments', () => {
    render(<Commands />);

    expect(screen.getByRole('tab', { name: '/character' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText('/character')).toBeInTheDocument();
    expect(
      within(panel).getByText(
        'Fetches basic information of a character such as skill points, combat rating, pvp combat rating and more.',
      ),
    ).toBeInTheDocument();
    expect(within(panel).getByText('server:')).toBeInTheDocument();
    expect(within(panel).getByText('us, eu, switchus, switcheu, xbox')).toBeInTheDocument();
    expect(within(panel).getByText('name:')).toBeInTheDocument();
    expect(within(panel).getByText('<character name>')).toBeInTheDocument();
  });

  it('switches to another command when its tab is clicked', async () => {
    const user = userEvent.setup();
    render(<Commands />);

    await user.click(screen.getByRole('tab', { name: '/servers' }));

    expect(screen.getByRole('tab', { name: '/servers' })).toHaveAttribute('aria-selected', 'true');

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText('/servers')).toBeInTheDocument();
    expect(
      within(panel).getByText(
        'Fetches a list of all DC Universe Online game servers with their status and population.',
      ),
    ).toBeInTheDocument();
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
    expect(within(panel).getByText('<instance name>')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_tanks:')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_healers:')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_controllers:')).toBeInTheDocument();
    expect(within(panel).getByText('amount_of_dps:')).toBeInTheDocument();
  });
});
