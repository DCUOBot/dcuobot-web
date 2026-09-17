import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function ErrorFallback() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    toast.error(t('common.error'), {
      position: 'bottom-center',
    });
    void navigate({ to: '/' });
  }, [navigate, t]);

  return null;
}
