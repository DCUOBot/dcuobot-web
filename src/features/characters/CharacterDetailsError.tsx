import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

type Props = {
  error: unknown;
};

export default function CharacterDetailsError({ error }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('characters');
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    const status = isAxiosError(error) ? error.response?.status : undefined;

    if (status === 404) {
      toast.error(t('character.details.notFound'), {
        position: 'bottom-center',
      });
    } else {
      toast.error(t('common:common.error'), {
        position: 'bottom-center',
      });
    }
    void navigate({ to: '/' });
  }, [navigate, t]);

  return null;
}
