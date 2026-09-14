import EmbedBotHeader from '@/features/home/components/EmbedBotHeader';
import ProtectedImage from '@/features/home/components/ProtectedImage';

const roles = [
  { icon: '/assets/images/roles/tank.png', alt: 'Tank', label: 'Tank (0/4)', value: '---' },
  { icon: '/assets/images/roles/heal.png', alt: 'Healer', label: 'Healer (0/1)', value: '---' },
  {
    icon: '/assets/images/roles/controller.png',
    alt: 'Controller',
    label: 'Controller (0/1)',
    value: '---',
  },
  {
    icon: '/assets/images/roles/damage.png',
    alt: 'DPS',
    label: 'DPS (1/2)',
    value: 'hypeeeeeeeeee#0',
  },
];

export default function LfgExampleEmbed() {
  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 border-l-4 dark:border-zinc-700 border-l-purple-500/80 dark:border-l-purple-500/60 p-4 rounded flex flex-col font-gg">
      <EmbedBotHeader />
      <div className="flex items-center">
        <span>🔍</span>
        <span className="font-semibold text-zinc-600 dark:text-zinc-100">
          LFG Source Wall (Elite Plus)
        </span>
      </div>
      <div>
        <span className="text-sm text-zinc-600 dark:text-zinc-100">Created by hypeeeeeeeeee#0</span>
      </div>
      {roles.map((role) => (
        <div
          key={role.alt}
          className="flex flex-col"
        >
          <div className="flex items-center gap-1">
            <ProtectedImage
              src={role.icon}
              alt={role.alt}
              width={32}
              height={32}
              className="size-5 select-none drag-none"
            />
            <span className="font-semibold text-sm text-zinc-600 dark:text-zinc-100">
              {role.label}
            </span>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-100">{role.value}</span>
        </div>
      ))}
    </div>
  );
}
