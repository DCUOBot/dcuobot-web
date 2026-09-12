import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/components/ui/button';
import { RouterLinkButton } from '@/components/ui/router-link-button';
import LanguageSelect from '@/components/layout/footer/LanguageSelect';
import { SiDiscord } from '@icons-pack/react-simple-icons';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center lg:flex-row lg:justify-between gap-x-6 gap-y-3 px-6 py-3 text-muted-foreground text-sm">
        <div className="text-center lg:text-start">
          <p>&copy;&nbsp;{t('footer.copyright', { currentYear })}</p>
          <p className="text-xs mt-1">
            {t('footer.disclaimer1')}
            <br />
            {t('footer.disclaimer2')}
          </p>
        </div>

        <ul className="flex items-center">
          <li>
            <RouterLinkButton
              to="/privacy"
              variant="link"
              className="text-muted-foreground"
            >
              {t('footer.privacy')}
            </RouterLinkButton>
          </li>
          <li>
            <LinkButton
              href="https://discord.gg/XbaFwtTgMa"
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
              className="text-muted-foreground"
            >
              <SiDiscord size={16} />
              {t('footer.discord')}
            </LinkButton>
          </li>
          <li>
            <LanguageSelect />
          </li>
        </ul>
      </div>
    </footer>
  );
}
