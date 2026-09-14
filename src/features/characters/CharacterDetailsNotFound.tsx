import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function CharacterDetailsNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation('characters');
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    toast.error(t('character.details.notFound'), {
      position: 'bottom-center',
    });
    void navigate({ to: '/' });
  }, [navigate, t]);

  return null;
}
