import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Privacy from './Privacy';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Privacy', () => {
  it('renders the heading and subheading translation keys', () => {
    render(<Privacy />);

    expect(screen.getByRole('heading', { level: 1, name: 'privacy.heading' })).toBeInTheDocument();
    expect(screen.getByText('privacy.subheading')).toBeInTheDocument();
  });

  it('renders every policy section heading', () => {
    render(<Privacy />);

    const sectionTitles = [
      'privacy.introduction.title',
      'privacy.controller.title',
      'privacy.dataWeCollect.title',
      'privacy.cookies.title',
      'privacy.thirdParties.title',
      'privacy.retention.title',
      'privacy.security.title',
      'privacy.rights.title',
      'privacy.childrenPrivacy.title',
      'privacy.changes.title',
      'privacy.contact.title',
    ];

    for (const title of sectionTitles) {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
    }
  });

  it('links the controller and contact email addresses as mailto links', () => {
    render(<Privacy />);

    const mailtoLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('mailto:'));

    expect(mailtoLinks.map((link) => link.getAttribute('href'))).toEqual([
      'mailto:privacy.controller.email',
      'mailto:privacy.contact.email',
    ]);
  });

  it('links to the Discord server', () => {
    render(<Privacy />);

    expect(screen.getByRole('link', { name: 'discord.gg/XbaFwtTgMa' })).toHaveAttribute(
      'href',
      'https://discord.gg/XbaFwtTgMa',
    );
  });
});
