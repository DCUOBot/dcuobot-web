import { useTranslation } from 'react-i18next';
import { RouterLinkButton } from '@/components/ui/router-link-button';
import { useDocumentTitle } from '@/lib/meta';

export default function NotFound() {
  const { t } = useTranslation();

  useDocumentTitle(t('common.notFound.title'));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {t('common.notFound.title')}
      </h1>
      <p className="max-w-md text-xl text-muted-foreground">{t('common.notFound.body')}</p>
      <RouterLinkButton
        to="/"
        size="lg"
      >
        {t('common.notFound.home')}
      </RouterLinkButton>
    </div>
  );
}
