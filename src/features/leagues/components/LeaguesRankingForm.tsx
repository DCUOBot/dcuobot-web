import type { RankingSearch } from '@/lib/ranking-search-route';
import type { LeagueSort } from '@/lib/league-sort';
import { useTranslation } from 'react-i18next';
import EntityRankingForm from '@/components/EntityRankingForm';

type Props = {
  search: RankingSearch;
};

export default function LeaguesRankingForm({ search }: Props) {
  const { t } = useTranslation('leagues');

  return (
    <EntityRankingForm<LeagueSort>
      search={search}
      namespace="leagues"
      keyPrefix="league.ranking"
      sortOptions={[
        { id: 'averageSkillPoints', label: t('league.ranking.sort.averageSkillPoints') },
        { id: 'averageCombatRating', label: t('league.ranking.sort.averageCombatRating') },
        {
          id: 'averagePvpCombatRating',
          label: t('league.ranking.sort.averagePvpCombatRating'),
        },
        { id: 'memberCount', label: t('league.ranking.sort.memberCount') },
      ]}
    />
  );
}
