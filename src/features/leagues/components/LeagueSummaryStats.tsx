import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import RankingStat from '@/components/RankingStat';

type Props = {
  league: League;
  sort: string;
};

export default function LeagueSummaryStats({ league, sort }: Props) {
  const { t, i18n } = useTranslation('leagues');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-4 lg:mt-0">
      <RankingStat
        value={league.average_skill_points.toLocaleString(i18n.language)}
        label={t('league.ranking.sort.averageSkillPoints')}
        active={sort === 'averageSkillPoints'}
      />
      <RankingStat
        value={league.average_combat_rating.toLocaleString(i18n.language)}
        label={t('league.ranking.sort.averageCombatRating')}
        active={sort === 'averageCombatRating'}
      />
      <RankingStat
        value={league.average_pvp_combat_rating.toLocaleString(i18n.language)}
        label={t('league.ranking.sort.averagePvpCombatRating')}
        active={sort === 'averagePvpCombatRating'}
      />
      <RankingStat
        value={league.member_count.toLocaleString(i18n.language)}
        label={t('league.ranking.sort.memberCount')}
        active={sort === 'memberCount'}
      />
    </div>
  );
}
