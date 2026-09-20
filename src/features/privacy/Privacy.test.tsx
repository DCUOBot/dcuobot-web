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

  it('renders every data-we-collect subsection heading and body', () => {
    render(<Privacy />);

    const subsectionKeys = ['serverLogs', 'searchQueries', 'localStorage', 'botInvite', 'botUsage'];

    for (const key of subsectionKeys) {
      expect(
        screen.getByRole('heading', { level: 3, name: `privacy.dataWeCollect.${key}.title` }),
      ).toBeInTheDocument();
      expect(screen.getByText(`privacy.dataWeCollect.${key}.body`)).toBeInTheDocument();
    }
  });

  it('renders every bullet list item across the policy', () => {
    render(<Privacy />);

    const listItemKeys = [
      'privacy.dataWeCollect.serverLogs.items.ipAddress',
      'privacy.dataWeCollect.serverLogs.items.browser',
      'privacy.dataWeCollect.serverLogs.items.referrer',
      'privacy.dataWeCollect.serverLogs.items.requestedPage',
      'privacy.dataWeCollect.localStorage.items.theme',
      'privacy.dataWeCollect.localStorage.items.language',
      'privacy.thirdParties.items.hosting',
      'privacy.thirdParties.items.discord',
      'privacy.retention.items.logs',
      'privacy.retention.items.localStorage',
      'privacy.retention.items.bot',
      'privacy.rights.items.access',
      'privacy.rights.items.rectification',
      'privacy.rights.items.erasure',
      'privacy.rights.items.restriction',
      'privacy.rights.items.portability',
      'privacy.rights.items.objection',
      'privacy.rights.items.complaint',
    ];

    for (const key of listItemKeys) {
      const item = screen.getByText(key);
      expect(item.tagName).toBe('LI');
    }
  });

  it('renders the remaining paragraph copy for every section', () => {
    render(<Privacy />);

    const paragraphKeys = [
      'privacy.introduction.body',
      'privacy.introduction.scope',
      'privacy.controller.body',
      'privacy.controller.discord',
      'privacy.dataWeCollect.intro',
      'privacy.dataWeCollect.serverLogs.purpose',
      'privacy.dataWeCollect.serverLogs.legalBasis',
      'privacy.dataWeCollect.searchQueries.legalBasis',
      'privacy.dataWeCollect.localStorage.purpose',
      'privacy.dataWeCollect.botUsage.legalBasis',
      'privacy.cookies.body',
      'privacy.thirdParties.intro',
      'privacy.thirdParties.outro',
      'privacy.rights.intro',
      'privacy.rights.outro',
      'privacy.security.body',
      'privacy.childrenPrivacy.body',
      'privacy.changes.body',
      'privacy.contact.body',
    ];

    for (const key of paragraphKeys) {
      expect(screen.getByText(key)).toBeInTheDocument();
    }

    expect(screen.getByText('privacy.controller.nameLabel')).toBeInTheDocument();
    expect(screen.getByText(/^privacy\.controller\.name$/, { exact: false })).toBeInTheDocument();
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
    expect(mailtoLinks.map((link) => link.textContent)).toEqual([
      'privacy.controller.email',
      'privacy.contact.email',
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
