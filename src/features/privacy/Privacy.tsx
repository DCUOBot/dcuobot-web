import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta.ts';

const linkClassName = 'text-primary underline underline-offset-4 hover:no-underline';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-2 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

export default function Privacy() {
  const { t } = useTranslation('privacy');

  useDocumentTitle(t('privacy.pageTitle'));
  useMetaDescription(t('privacy.pageDescription'));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {t('privacy.heading')}
      </h1>
      <p className="text-xl text-muted-foreground">{t('privacy.subheading')}</p>

      <article className="max-w-3xl pb-20">
        <Section title={t('privacy.introduction.title')}>
          <p>{t('privacy.introduction.body')}</p>
          <p>{t('privacy.introduction.scope')}</p>
        </Section>

        <Section title={t('privacy.controller.title')}>
          <p>{t('privacy.controller.body')}</p>
          <p>
            <strong>{t('privacy.controller.nameLabel')}</strong> {t('privacy.controller.name')}
            <br />
            <strong>{t('privacy.controller.contactLabel')}</strong>{' '}
            <a
              href={`mailto:${t('privacy.controller.email')}`}
              className={linkClassName}
            >
              {t('privacy.controller.email')}
            </a>
          </p>
          <p>{t('privacy.controller.discord')}</p>
        </Section>

        <Section title={t('privacy.dataWeCollect.title')}>
          <p>{t('privacy.dataWeCollect.intro')}</p>

          <div>
            <h3 className="font-semibold text-foreground">
              {t('privacy.dataWeCollect.serverLogs.title')}
            </h3>
            <p>{t('privacy.dataWeCollect.serverLogs.body')}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t('privacy.dataWeCollect.serverLogs.items.ipAddress')}</li>
              <li>{t('privacy.dataWeCollect.serverLogs.items.browser')}</li>
              <li>{t('privacy.dataWeCollect.serverLogs.items.referrer')}</li>
              <li>{t('privacy.dataWeCollect.serverLogs.items.requestedPage')}</li>
            </ul>
            <p>{t('privacy.dataWeCollect.serverLogs.purpose')}</p>
            <p className="text-sm">{t('privacy.dataWeCollect.serverLogs.legalBasis')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {t('privacy.dataWeCollect.searchQueries.title')}
            </h3>
            <p>{t('privacy.dataWeCollect.searchQueries.body')}</p>
            <p className="text-sm">{t('privacy.dataWeCollect.searchQueries.legalBasis')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {t('privacy.dataWeCollect.localStorage.title')}
            </h3>
            <p>{t('privacy.dataWeCollect.localStorage.body')}</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t('privacy.dataWeCollect.localStorage.items.theme')}</li>
              <li>{t('privacy.dataWeCollect.localStorage.items.language')}</li>
            </ul>
            <p>{t('privacy.dataWeCollect.localStorage.purpose')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {t('privacy.dataWeCollect.botInvite.title')}
            </h3>
            <p>{t('privacy.dataWeCollect.botInvite.body')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {t('privacy.dataWeCollect.botUsage.title')}
            </h3>
            <p>{t('privacy.dataWeCollect.botUsage.body')}</p>
            <p className="text-sm">{t('privacy.dataWeCollect.botUsage.legalBasis')}</p>
          </div>
        </Section>

        <Section title={t('privacy.cookies.title')}>
          <p>{t('privacy.cookies.body')}</p>
        </Section>

        <Section title={t('privacy.thirdParties.title')}>
          <p>{t('privacy.thirdParties.intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t('privacy.thirdParties.items.hosting')}</li>
            <li>{t('privacy.thirdParties.items.discord')}</li>
          </ul>
          <p>{t('privacy.thirdParties.outro')}</p>
        </Section>

        <Section title={t('privacy.retention.title')}>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t('privacy.retention.items.logs')}</li>
            <li>{t('privacy.retention.items.localStorage')}</li>
            <li>{t('privacy.retention.items.bot')}</li>
          </ul>
        </Section>

        <Section title={t('privacy.security.title')}>
          <p>{t('privacy.security.body')}</p>
        </Section>

        <Section title={t('privacy.rights.title')}>
          <p>{t('privacy.rights.intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t('privacy.rights.items.access')}</li>
            <li>{t('privacy.rights.items.rectification')}</li>
            <li>{t('privacy.rights.items.erasure')}</li>
            <li>{t('privacy.rights.items.restriction')}</li>
            <li>{t('privacy.rights.items.portability')}</li>
            <li>{t('privacy.rights.items.objection')}</li>
            <li>{t('privacy.rights.items.complaint')}</li>
          </ul>
          <p>{t('privacy.rights.outro')}</p>
        </Section>

        <Section title={t('privacy.childrenPrivacy.title')}>
          <p>{t('privacy.childrenPrivacy.body')}</p>
        </Section>

        <Section title={t('privacy.changes.title')}>
          <p>{t('privacy.changes.body')}</p>
        </Section>

        <Section title={t('privacy.contact.title')}>
          <p>{t('privacy.contact.body')}</p>
          <p>
            <strong>{t('privacy.contact.emailLabel')}</strong>{' '}
            <a
              href={`mailto:${t('privacy.contact.email')}`}
              className={linkClassName}
            >
              {t('privacy.contact.email')}
            </a>
          </p>
          <p>
            {t('privacy.contact.discord')} (
            <a
              href="https://discord.gg/XbaFwtTgMa"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              discord.gg/XbaFwtTgMa
            </a>
            )
          </p>
        </Section>
      </article>
    </div>
  );
}
