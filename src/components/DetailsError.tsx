import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

type Props = {
  error: unknown;
  namespace: string;
  notFoundKey: string;
};

export default function DetailsError({ error, namespace, notFoundKey }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation(namespace);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    const status = isAxiosError(error) ? error.response?.status : undefined;

    if (status === 404) {
      toast.error(t(notFoundKey), {
        position: 'bottom-center',
      });
    } else {
      toast.error(t('common:common.error'), {
        position: 'bottom-center',
      });
    }
    void navigate({ to: '/' });
  }, [navigate, t, notFoundKey]);

  return null;
}
