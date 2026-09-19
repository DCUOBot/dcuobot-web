import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';
import { serverStatusQueries } from '@/features/server-status/queries.ts';
import GameServerCard from '@/features/server-status/components/GameServerCard.tsx';

export default function ServerStatus() {
  const { t } = useTranslation('serverStatus');
  const { data: gameServers } = useSuspenseQuery(serverStatusQueries.getServerStatus());

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {t('serverStatus.heading')}
      </h1>
      <p className="text-xl text-muted-foreground">{t('serverStatus.subheading')}</p>

      <div className="flex flex-col gap-4 mt-6">
        {gameServers.map((gameServer, index) => (
          <GameServerCard
            key={index}
            gameServer={gameServer}
          />
        ))}
      </div>
    </div>
  );
}
