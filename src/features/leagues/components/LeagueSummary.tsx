import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import ProtectedImage from '@/components/ProtectedImage';
import RankMedalHeading from '@/components/RankMedalHeading';
import LeagueSummaryStats from '@/features/leagues/components/LeagueSummaryStats';
import { ChevronRight } from 'lucide-react';

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
      <Card>
        <CardContent className="flex flex-col lg:flex-row gap-4">
          <div className="flex justify-center">
            <ProtectedImage
              src="/assets/images/genders/mixed.jpeg"
              alt={t('league.details.imageAlt')}
              width={117}
              height={188}
              className="select-none drag-none rounded-4xl"
            />
          </div>

          <div className="flex flex-col justify-between">
            <RankMedalHeading
              name={league.name}
              index={index}
              worldId={league.world_id}
              alignment={league.alignment}
            />

            <LeagueSummaryStats
              league={league}
              sort={sort}
            />
          </div>

          <div className="hidden lg:flex flex-col justify-center ms-auto">
            <span className="text-muted-foreground">
              <ChevronRight size={24} />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
