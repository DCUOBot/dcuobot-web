import EmbedBotHeader from '@/features/home/components/EmbedBotHeader';
import EmbedFadeOverlay from '@/features/home/components/EmbedFadeOverlay';

const topCharacters = [
  { name: '1. ABS', skillPoints: '1,000' },
  { name: '2. BRITTENY', skillPoints: '1,000' },
  { name: '3. Daddy', skillPoints: '1,000' },
  { name: '4. Fury', skillPoints: '1,000' },
];

export default function TopCharactersExampleEmbed() {
  return (
    <div className="border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 border-l-4 border-l-purple-500/80 dark:border-l-purple-500/60 p-4 rounded flex flex-col gap-3 relative font-gg">
      <EmbedBotHeader />
      <div className="flex items-center">
        <span>📊</span>
        <span className="font-semibold text-zinc-600 dark:text-zinc-100">Top Characters</span>
      </div>
      <div>
        <span className="text-sm text-zinc-600 dark:text-zinc-100">
          Server: USPC/PS • Sort by: SP
        </span>
      </div>
      {topCharacters.map((character) => (
        <div
          key={character.name}
          className="flex flex-col"
        >
          <div className="flex items-center gap-1">
            <span>👤</span>
            <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
              {character.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>📈</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-100">
              Skill Points: {character.skillPoints}
            </span>
          </div>
        </div>
      ))}
      <EmbedFadeOverlay />
    </div>
  );
}
