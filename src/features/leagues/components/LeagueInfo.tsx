import type { League } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import StatList from '@/components/StatList';
import { formatWorldId } from '@/lib/world-id-format';

type Props = {
  league: League;
};

export default function LeagueInfo({ league }: Props) {
  const { t, i18n } = useTranslation('leagues');

  return (
    <StatList
      items={[
        { key: 'name', label: t('league.details.name'), value: <strong>{league.name}</strong> },
        {
          key: 'server',
          label: t('league.details.server'),
          value: <strong>{formatWorldId(league.world_id)}</strong>,
        },
        {
          key: 'members',
          label: t('league.details.members'),
          value: <strong>{league.member_count.toLocaleString(i18n.language)}</strong>,
        },
      ]}
    />
  );
}
