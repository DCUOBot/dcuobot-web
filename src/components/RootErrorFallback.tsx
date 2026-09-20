import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@/components/ui/button';

export default function RootErrorFallback() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {t('common.unexpectedError.title')}
      </h1>
      <p className="max-w-md text-muted-foreground">{t('common.unexpectedError.body')}</p>
      <div className="flex items-center gap-3">
        <a
          href="/"
          className={buttonVariants({ variant: 'outline' })}
        >
          {t('common.unexpectedError.home')}
        </a>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={buttonVariants({ variant: 'default' })}
        >
          {t('common.unexpectedError.reload')}
        </button>
      </div>
    </div>
  );
}
