import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

type Props = {
  error: unknown;
};

export default function LeagueDetailsError({ error }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('leagues');
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    const status = isAxiosError(error) ? error.response?.status : undefined;

    if (status === 404) {
      toast.error(t('league.details.notFound'), {
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
