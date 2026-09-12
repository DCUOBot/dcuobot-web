import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import LanguageSelect from './LanguageSelect';
import i18n from '@/i18n';

describe('LanguageSelect', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the current language as the selected value', () => {
    render(<LanguageSelect />);

    expect(screen.getByRole('button', { name: /Select language/ })).toHaveTextContent('English');
  });

  it('lists the supported languages when opened', async () => {
    const user = userEvent.setup();
    render(<LanguageSelect />);

    await user.click(screen.getByRole('button', { name: /Select language/ }));

    expect(await screen.findByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Deutsch' })).toBeInTheDocument();
  });

  it('changes the i18n language when a different language is selected', async () => {
    const user = userEvent.setup();
    render(<LanguageSelect />);

    await user.click(screen.getByRole('button', { name: /Select language/ }));
    await user.click(await screen.findByRole('option', { name: 'Deutsch' }));

    expect(i18n.language).toBe('de');
  });

  it('reflects a locale-suffixed language by its base code', async () => {
    await i18n.changeLanguage('en-US');

    render(<LanguageSelect />);

    expect(screen.getByRole('button', { name: /Select language/ })).toHaveTextContent('English');
  });
});
