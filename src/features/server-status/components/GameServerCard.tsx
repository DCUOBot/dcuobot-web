import type { GameServer } from '@/features/server-status/models/game-server.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { useTranslation } from 'react-i18next';

type Props = {
  gameServer: GameServer;
};

export default function GameServerCard({ gameServer }: Props) {
  const { t } = useTranslation('serverStatus');

  const renderStatus = () => {
    switch (gameServer.status) {
      case 'ONLINE':
        return <strong className="text-emerald-500">{t('serverStatus.online')}</strong>;
      case 'OFFLINE':
        return <strong className="text-rose-500">{t('serverStatus.offline')}</strong>;
      case 'LOCKED':
        return <strong className="text-amber-500">{t('serverStatus.locked')}</strong>;
    }
  };

  const getPopulation = () => {
    const population = gameServer.population.toLowerCase();

    switch (population) {
      case 'high':
      case 'medium':
      case 'low':
        return t(`serverStatus.${population}`);
    }

    return gameServer.population;
  };

  const getServerName = () => {
    switch (gameServer.server_name) {
      case 'US':
        return 'USPC/PS';
      case 'EU':
        return 'EUPC/PS';
      case 'US Xbox':
        return 'Xbox';
    }

    return gameServer.server_name;
  };

  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col justify-center items-center">
          <span className="text-sm">{t('serverStatus.server')}</span>
          <strong>{getServerName()}</strong>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="text-sm">{t('serverStatus.status')}</span>
          {renderStatus()}
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="text-sm">{t('serverStatus.population')}</span>
          <strong>{getPopulation()}</strong>
        </div>
      </CardContent>
    </Card>
  );
}
