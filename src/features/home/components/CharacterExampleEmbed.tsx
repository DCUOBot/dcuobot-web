import obsidianChill from '@/assets/images/embed-examples/obsidianchill.png';
import EmbedBotHeader from '@/features/home/components/EmbedBotHeader';
import EmbedFadeOverlay from '@/features/home/components/EmbedFadeOverlay';
import ProtectedImage from '@/features/home/components/ProtectedImage';

const basicStats = [
  { icon: '📈', label: 'Skill Points', value: '825' },
  { icon: '🗡️', label: 'PVE CR', value: '446' },
  { icon: '⚔️', label: 'PVP CR', value: '101' },
  { icon: '♂️', label: 'Gender', value: 'Male' },
  { icon: '👥', label: 'League', value: '---' },
  { icon: '🧬', label: 'Power', value: 'Fire' },
  { icon: '🦹', label: 'Alignment', value: 'Hero' },
  { icon: '🎭', label: 'Personality', value: 'Serious' },
  { icon: '🏃‍♂️', label: 'Movement', value: 'Super-Speed' },
];

const artifacts = [
  {
    label: 'Artifact One',
    icon: '/assets/images/artifacts/quislet.png',
    alt: 'Quislet',
    width: 57,
    height: 55,
    name: 'Quislet',
  },
  {
    label: 'Artifact Two',
    icon: '/assets/images/artifacts/transformation_card.png',
    alt: 'Transformation Card',
    width: 69,
    height: 75,
    name: 'The Transformation Card',
  },
  {
    label: 'Artifact Three',
    icon: '/assets/images/artifacts/ebons_untethered_shadow.png',
    alt: "Ebon's Untethered Shadow",
    width: 64,
    height: 64,
    name: "Ebon's Untethered Shadow",
  },
];

const emptyArtifactLabels = ['Artifact Four', 'Artifact Five'];

const allies = [
  { label: 'Combat Ally', value: 'Death Metal Batman' },
  { label: 'Support Ally One', value: 'Shazam' },
  { label: 'Support Ally Two', value: 'Batman Who Laughs' },
];

export default function CharacterExampleEmbed() {
  return (
    <div className="border border-zinc-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 border-l-4 border-l-purple-500/80 dark:border-l-purple-500/60 p-4 rounded flex relative font-gg">
      <div className="flex flex-col gap-3">
        <EmbedBotHeader />
        <div className="flex items-center">
          <span>👤</span>
          <span className="font-semibold text-zinc-600 dark:text-zinc-100">ObsidianChill</span>
        </div>
        <div>
          <span className="text-sm text-zinc-600 dark:text-zinc-100">Server: USPC/PS</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {basicStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1">
                <span>{stat.icon}</span>
                <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                  {stat.label}
                </span>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-100">{stat.value}</span>
            </div>
          ))}
          {artifacts.map((artifact) => (
            <div
              key={artifact.label}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1">
                <span>🏺</span>
                <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                  {artifact.label}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ProtectedImage
                  src={artifact.icon}
                  alt={artifact.alt}
                  width={artifact.width}
                  height={artifact.height}
                  className="size-5 select-none drag-none"
                />
                <span className="text-sm text-zinc-600 dark:text-zinc-100">{artifact.name}</span>
              </div>
            </div>
          ))}
          {emptyArtifactLabels.map((label) => (
            <div
              key={label}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1">
                <span>🏺</span>
                <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                  {label}
                </span>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-100">No Artifact</span>
            </div>
          ))}
          <div className="col-span-1 hidden sm:block"></div>
          {allies.map((ally) => (
            <div
              key={ally.label}
              className="hidden flex-col sm:flex"
            >
              <div className="flex items-center gap-1">
                <span>🦸️</span>
                <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
                  {ally.label}
                </span>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-100">{ally.value}</span>
            </div>
          ))}
        </div>
      </div>
      <ProtectedImage
        src={obsidianChill}
        alt="ObsidianChill thumbnail"
        width={50}
        height={80}
        className="drag-none select-none rounded"
      />
      <EmbedFadeOverlay className="lg:hidden" />
    </div>
  );
}
