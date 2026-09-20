import { leagueDetailsRoute } from '@/features/leagues/leagues.routes';
import { useSuspenseQuery } from '@tanstack/react-query';
import { leagueQueries } from '@/features/leagues/queries';
import { formatWorldId } from '@/lib/world-id-format';
import LeagueInfo from '@/features/leagues/components/LeagueInfo';
import LeagueStats from '@/features/leagues/components/LeagueStats';
import LeagueMembers from '@/features/leagues/components/LeagueMembers';
import ProtectedImage from '@/components/ProtectedImage';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta';
import { ENTITY_PORTRAIT_SIZE } from '@/lib/image-sizes';

export default function LeagueDetails() {
  const { t } = useTranslation('leagues');
  const { query, worldId } = leagueDetailsRoute.useSearch();
  const { data: league } = useSuspenseQuery(leagueQueries.getLeague(query!, worldId!));

  useDocumentTitle(t('league.details.pageTitle', { name: league.name }));
  useMetaDescription(t('league.details.pageDescription', { name: league.name }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {league.name}
      </h1>
      <p className="text-xl text-muted-foreground">
        {formatWorldId(league.world_id)}&nbsp;{league.alignment}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 mt-6 gap-4">
        <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start">
          <div className="flex flex-col">
            <ProtectedImage
              src="/assets/images/genders/mixed.jpeg"
              alt={t('league.details.imageAlt')}
              {...ENTITY_PORTRAIT_SIZE}
              className="select-none drag-none rounded-4xl"
            />
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <LeagueInfo league={league} />
          </div>
          <div>
            <LeagueStats league={league} />
          </div>
          <div className="lg:col-span-2">
            <LeagueMembers league={league} />
          </div>
        </div>
      </div>
    </div>
  );
}
