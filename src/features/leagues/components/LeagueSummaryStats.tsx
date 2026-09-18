import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';

type Props = {
  league: League;
  sort: string;
};

export default function LeagueSummaryStats({ league, sort }: Props) {
  const { t, i18n } = useTranslation('leagues');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-4 lg:mt-0">
      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' +
            (sort !== 'averageSkillPoints' ? 'text-muted-foreground' : '')
          }
        >
          {league.average_skill_points.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'averageSkillPoints' ? 'text-muted-foreground' : ''}>
            {t('league.ranking.sort.averageSkillPoints')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' +
            (sort !== 'averageCombatRating' ? 'text-muted-foreground' : '')
          }
        >
          {league.average_combat_rating.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'averageCombatRating' ? 'text-muted-foreground' : ''}>
            {t('league.ranking.sort.averageCombatRating')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' +
            (sort !== 'averagePvpCombatRating' ? 'text-muted-foreground' : '')
          }
        >
          {league.average_pvp_combat_rating.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'averagePvpCombatRating' ? 'text-muted-foreground' : ''}>
            {t('league.ranking.sort.averagePvpCombatRating')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' + (sort !== 'memberCount' ? 'text-muted-foreground' : '')
          }
        >
          {league.member_count.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'memberCount' ? 'text-muted-foreground' : ''}>
            {t('league.ranking.sort.memberCount')}
          </span>
        </div>
      </div>
    </div>
  );
}
