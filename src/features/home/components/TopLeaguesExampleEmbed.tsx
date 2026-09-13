import EmbedBotHeader from '@/features/home/components/EmbedBotHeader';
import EmbedFadeOverlay from '@/features/home/components/EmbedFadeOverlay';

const topLeagues = [
  { name: '1. Evil', avgSkillPoints: '915.21' },
  { name: '2. Sever', avgSkillPoints: '819' },
  { name: '3. Wind', avgSkillPoints: '805.67' },
  { name: '4. Versed', avgSkillPoints: '787.11' },
];

export default function TopLeaguesExampleEmbed() {
  return (
    <div className="border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 border-l-4 border-l-purple-500/80 dark:border-l-purple-500/60 p-4 rounded flex flex-col gap-3 relative font-gg">
      <EmbedBotHeader />
      <div className="flex items-center">
        <span>📊</span>
        <span className="font-semibold text-zinc-600 dark:text-zinc-100">Top Leagues</span>
      </div>
      <div>
        <span className="text-sm text-zinc-600 dark:text-zinc-100">
          Server: USPC/PS • Sort by: AVGSP
        </span>
      </div>
      {topLeagues.map((league) => (
        <div
          key={league.name}
          className="flex flex-col"
        >
          <div className="flex items-center gap-1">
            <span>👥</span>
            <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
              {league.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>📈</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">
              Avg. Skill Points: {league.avgSkillPoints}
            </span>
          </div>
        </div>
      ))}
      <EmbedFadeOverlay />
    </div>
  );
}
