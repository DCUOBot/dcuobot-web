import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import StatList from '@/components/StatList';

type Props = {
  league: League;
};

export default function LeagueStats({ league }: Props) {
  const { t, i18n } = useTranslation('leagues');

  return (
    <StatList
      items={[
        {
          key: 'avgSkillPoints',
          label: t('league.details.avgSkillPoints'),
          value: <strong>{league.average_skill_points.toLocaleString(i18n.language)}</strong>,
        },
        {
          key: 'avgCombatRating',
          label: t('league.details.avgCombatRating'),
          value: <strong>{league.average_combat_rating.toLocaleString(i18n.language)}</strong>,
        },
        {
          key: 'avgPvPCombatRating',
          label: t('league.details.avgPvPCombatRating'),
          value: <strong>{league.average_pvp_combat_rating.toLocaleString(i18n.language)}</strong>,
        },
      ]}
    />
  );
}
