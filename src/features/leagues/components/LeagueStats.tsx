import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  league: League;
};

export default function LeagueStats({ league }: Props) {
  const { t, i18n } = useTranslation('leagues');

  return (
    <Card>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>{t('league.details.avgSkillPoints')}</span>
            <strong>{league.average_skill_points.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('league.details.avgCombatRating')}</span>
            <strong>{league.average_combat_rating.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('league.details.avgPvPCombatRating')}</span>
            <strong>{league.average_pvp_combat_rating.toLocaleString(i18n.language)}</strong>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
