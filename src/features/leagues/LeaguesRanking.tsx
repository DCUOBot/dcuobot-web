import { leaguesRankingRoute } from '@/features/leagues/leagues.routes';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';
import { leagueQueries } from '@/features/leagues/queries';
import LeaguesRankingForm from '@/features/leagues/components/LeaguesRankingForm';
import LeagueSummary from '@/features/leagues/components/LeagueSummary';
import RankingPage from '@/components/RankingPage';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta.ts';

export default function LeaguesRanking() {
  const search = leaguesRankingRoute.useSearch();
  const { t } = useTranslation('leagues');
  const { data: leagues } = useSuspenseQuery(
    leagueQueries.getLeaguesRanking(search.worldId, search.sort),
  );

  useDocumentTitle(t('league.ranking.pageTitle'));
  useMetaDescription(t('league.ranking.pageDescription'));

  return (
    <RankingPage
      heading={t('league.ranking.heading')}
      subheading={t('league.ranking.subheading')}
      form={<LeaguesRankingForm search={search} />}
      items={leagues}
      renderItem={(league, index) => (
        <LeagueSummary
          key={index}
          league={league}
          index={index}
          sort={search.sort}
        />
      )}
    />
  );
}
