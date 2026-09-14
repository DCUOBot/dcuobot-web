import type { League } from '@/features/leagues/models/league';
import { Card, CardContent } from '@/components/ui/card';
import LeagueMembersTable from '@/features/leagues/components/LeagueMembersTable';

type Props = {
  league: League;
};

export default function LeagueMembers({ league }: Props) {
  return (
    <Card className="py-2">
      <CardContent className="p-0">
        <LeagueMembersTable data={league.characters} />
      </CardContent>
    </Card>
  );
}
