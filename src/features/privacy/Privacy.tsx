import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta';
import { config } from '@/lib/config';

const linkClassName = 'text-primary underline underline-offset-4 hover:no-underline';

type Translate = (key: string) => string;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-2 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

function BulletList({ t, base, items }: { t: Translate; base: string; items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1">
      {items.map((item) => (
        <li key={item}>{t(`${base}.${item}`)}</li>
      ))}
    </ul>
  );
}

function MailtoLine({
  t,
  labelKey,
  emailKey,
}: {
  t: Translate;
  labelKey: string;
  emailKey: string;
}) {
  const email = t(emailKey);
  return (
    <>
      <strong>{t(labelKey)}</strong>{' '}
      <a
        href={`mailto:${email}`}
        className={linkClassName}
      >
        {email}
      </a>
    </>
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
            <MailtoLine
              t={t}
              labelKey="privacy.controller.contactLabel"
              emailKey="privacy.controller.email"
            />
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
            <BulletList
              t={t}
              base="privacy.dataWeCollect.serverLogs.items"
              items={['ipAddress', 'browser', 'referrer', 'requestedPage']}
            />
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
            <BulletList
              t={t}
              base="privacy.dataWeCollect.localStorage.items"
              items={['theme', 'language']}
            />
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
          <BulletList
            t={t}
            base="privacy.thirdParties.items"
            items={['hosting', 'discord']}
          />
          <p>{t('privacy.thirdParties.outro')}</p>
        </Section>

        <Section title={t('privacy.retention.title')}>
          <BulletList
            t={t}
            base="privacy.retention.items"
            items={['logs', 'localStorage', 'bot']}
          />
        </Section>

        <Section title={t('privacy.security.title')}>
          <p>{t('privacy.security.body')}</p>
        </Section>

        <Section title={t('privacy.rights.title')}>
          <p>{t('privacy.rights.intro')}</p>
          <BulletList
            t={t}
            base="privacy.rights.items"
            items={[
              'access',
              'rectification',
              'erasure',
              'restriction',
              'portability',
              'objection',
              'complaint',
            ]}
          />
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
            <MailtoLine
              t={t}
              labelKey="privacy.contact.emailLabel"
              emailKey="privacy.contact.email"
            />
          </p>
          <p>
            {t('privacy.contact.discord')} (
            <a
              href={config.discordInviteUrl}
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
