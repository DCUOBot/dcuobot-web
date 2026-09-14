import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { formatWorldId } from '@/lib/world-id-format';

type Props = {
  league: League;
};

export default function LeagueInfo({ league }: Props) {
  const { t, i18n } = useTranslation('leagues');

  return (
    <Card>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>{t('league.details.name')}</span>
            <strong>{league.name}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('league.details.server')}</span>
            <strong>{formatWorldId(league.world_id)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('league.details.members')}</span>
            <strong>{league.member_count.toLocaleString(i18n.language)}</strong>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
