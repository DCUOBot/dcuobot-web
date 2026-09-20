import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function PendingPage({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-busy="true"
      className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20"
    >
      <span className="sr-only">{t('common.loading')}</span>
      {children}
    </div>
  );
}
