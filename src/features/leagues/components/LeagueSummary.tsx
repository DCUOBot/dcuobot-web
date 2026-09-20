import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import EntitySummaryCard from '@/components/EntitySummaryCard';
import LeagueSummaryStats from '@/features/leagues/components/LeagueSummaryStats';

type Props = {
  league: League;
  index: number;
  sort: string;
};

export default function LeagueSummary({ league, index, sort }: Props) {
  const { t } = useTranslation('leagues');

  return (
    <Link
      to="/leagues"
      search={{ query: league.name, worldId: Number(league.world_id) }}
      className="rounded-4xl"
    >
      <EntitySummaryCard
        imageSrc="/assets/images/genders/mixed.jpeg"
        imageAlt={t('league.details.imageAlt')}
        name={league.name}
        index={index}
        worldId={league.world_id}
        alignment={league.alignment}
      >
        <LeagueSummaryStats
          league={league}
          sort={sort}
        />
      </EntitySummaryCard>
    </Link>
  );
}
