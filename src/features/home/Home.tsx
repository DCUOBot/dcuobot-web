import { useTranslation } from 'react-i18next';
import { Button, LinkButton } from '@/components/ui/button';
import { RouterLinkButton } from '@/components/ui/router-link-button';
import LfgExampleEmbed from '@/features/home/components/LfgExampleEmbed';
import CharacterExampleEmbed from '@/features/home/components/CharacterExampleEmbed';
import LeagueExampleEmbed from '@/features/home/components/LeagueExampleEmbed';
import TopCharactersExampleEmbed from '@/features/home/components/TopCharactersExampleEmbed';
import TopLeaguesExampleEmbed from '@/features/home/components/TopLeaguesExampleEmbed';
import { buildInviteUrl } from '@/lib/bot-invite.ts';
import { config } from '@/lib/config.ts';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta.ts';

export default function Home() {
  const { t } = useTranslation('home');

  useDocumentTitle(t('home.pageTitle'));
  useMetaDescription(t('home.pageDescription'));

  const openInviteBotUrl = () => window.open(buildInviteUrl(), '_blank');

  return (
    <div className="max-w-7xl mx-auto px-4 flex flex-col pt-20 sm:pt-48">
      <section className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {t('home.heading')}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">{t('home.subheading')}</p>

        <div className="space-x-2 space-y-2 mt-6">
          <Button
            size="lg"
            onClick={openInviteBotUrl}
          >
            {t('home.addBot')}
          </Button>
          <RouterLinkButton
            to="/commands"
            size="lg"
            variant="secondary"
          >
            {t('home.commands')}
          </RouterLinkButton>
          <LinkButton
            href={config.apiDocsUrl}
            target="_blank"
            size="lg"
            variant="secondary"
          >
            {t('home.apiDocs')}
          </LinkButton>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 mt-48 sm:mt-96 gap-8">
        <div className="w-full flex flex-col items-center justify-center pointer-events-none select-none">
          <LfgExampleEmbed />
        </div>
        <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left justify-center order-first sm:order-last">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            {t('home.lfg.heading')}
          </h2>
          <p className="text-sm text-muted-foreground">{t('home.lfg.text')}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 mt-20 sm:mt-48 gap-8">
        <div className="w-full flex flex-col items-center justify-center pointer-events-none select-none">
          <CharacterExampleEmbed />
        </div>
        <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left justify-center order-first">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            {t('home.character.heading')}
          </h2>
          <p className="text-sm text-muted-foreground">{t('home.character.text')}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 mt-20 sm:mt-48 gap-8">
        <div className="w-full flex flex-col items-center justify-center pointer-events-none select-none">
          <LeagueExampleEmbed />
        </div>
        <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left justify-center order-first sm:order-last">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            {t('home.league.heading')}
          </h2>
          <p className="text-sm text-muted-foreground">{t('home.league.text')}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 mt-20 sm:mt-48 gap-8">
        <div className="w-full flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <TopCharactersExampleEmbed />
            <TopLeaguesExampleEmbed />
          </div>
        </div>
        <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left justify-center order-first">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            {t('home.rankings.heading')}
          </h2>
          <p className="text-sm text-muted-foreground">{t('home.rankings.text')}</p>
        </div>
      </section>
    </div>
  );
}
