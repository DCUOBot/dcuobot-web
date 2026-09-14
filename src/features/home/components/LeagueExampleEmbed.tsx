import EmbedBotHeader from '@/features/home/components/EmbedBotHeader';
import EmbedFadeOverlay from '@/features/home/components/EmbedFadeOverlay';
import ProtectedImage from '@/components/ProtectedImage';

export default function LeagueExampleEmbed() {
  return (
    <div className="border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 border-l-4 border-l-purple-500/80 dark:border-l-purple-500/60 p-4 rounded flex relative font-gg">
      <div className="flex flex-col gap-3">
        <EmbedBotHeader />
        <div className="flex items-center">
          <span>👥</span>
          <span className="font-semibold text-zinc-600 dark:text-zinc-100">Ethos</span>
        </div>
        <div>
          <span className="text-sm text-zinc-600 dark:text-zinc-100">
            Server: USPC/PS • Members: 77 • Alignment: Heroes
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span>📈</span>
              <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                Avg. Skill Points
              </span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">716.48</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span>🗡️</span>
              <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                Avg. Combat Rating
              </span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">451.39</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span>⚔️</span>
              <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                Avg. PvP Combat Rating
              </span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">54.96</span>
          </div>
          <div className="col-span-3"></div>
          <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100 col-span-3">
            League Members:
          </span>
          <div className="col-span-3 h-3"></div>
          <div className="flex flex-col col-span-3">
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">Ebk</span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">
              Rank: <strong>1 (Leader)</strong> • SP: <strong>748</strong> • CR:{' '}
              <strong>463</strong> • PvP CR: <strong>101</strong>
            </span>
          </div>
          <div className="flex flex-col col-span-3">
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                Mercenary
              </span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">
              Rank: <strong>2</strong> • SP: <strong>979</strong> • CR: <strong>488</strong> • PvP
              CR:
              <strong>20</strong>
            </span>
          </div>
          <div className="flex flex-col col-span-3">
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                Omnipotent
              </span>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">
              Rank: <strong>2</strong> • SP: <strong>976</strong> • CR: <strong>488</strong> • PvP
              CR:
              <strong>11</strong>
            </span>
          </div>
        </div>
      </div>
      <ProtectedImage
        src="/assets/images/genders/mixed.jpeg"
        alt="League thumbnail"
        width={250}
        height={400}
        className="w-12.5 h-20 drag-none select-none rounded aspect-50/80"
      />
      <EmbedFadeOverlay />
    </div>
  );
}
