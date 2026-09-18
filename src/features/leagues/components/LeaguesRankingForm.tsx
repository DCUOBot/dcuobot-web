import type { RankingSearch } from '@/lib/ranking-search-route';
import type { LeagueSort } from '@/lib/league-sort';
import { useTranslation } from 'react-i18next';
import RankingForm from '@/components/RankingForm';

type Props = {
  search: RankingSearch;
};

export default function LeaguesRankingForm({ search }: Props) {
  const { t } = useTranslation('leagues');

  return (
    <RankingForm<LeagueSort>
      search={search}
      serverOptions={[
        { id: 0, label: t('league.ranking.servers.all') },
        { id: 2, label: t('league.ranking.servers.usPcPs') },
        { id: 4, label: t('league.ranking.servers.euPcPs') },
        { id: 10, label: t('league.ranking.servers.usSwitch') },
        { id: 11, label: t('league.ranking.servers.euSwitch') },
        { id: 5001, label: t('league.ranking.servers.xbox') },
      ]}
      sortOptions={[
        { id: 'averageSkillPoints', label: t('league.ranking.sort.averageSkillPoints') },
        { id: 'averageCombatRating', label: t('league.ranking.sort.averageCombatRating') },
        {
          id: 'averagePvpCombatRating',
          label: t('league.ranking.sort.averagePvpCombatRating'),
        },
        { id: 'memberCount', label: t('league.ranking.sort.memberCount') },
      ]}
      serverAriaLabel={t('league.ranking.servers.ariaLabel')}
      serverPlaceholder={t('league.ranking.servers.placeholder')}
      sortAriaLabel={t('league.ranking.sort.ariaLabel')}
      sortPlaceholder={t('league.ranking.sort.placeholder')}
      refreshAriaLabel={t('league.ranking.refreshAriaLabel')}
    />
  );
}
