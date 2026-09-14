import logo from '@/assets/branding/logo-32.webp';
import ProtectedImage from '@/features/home/components/ProtectedImage';

export default function EmbedBotHeader() {
  return (
    <div className="flex items-center gap-2">
      <ProtectedImage
        src={logo}
        alt="DCUOBot Logo"
        width={24}
        height={24}
        className="rounded-full select-none drag-none"
      />
      <span className="text-sm text-zinc-600 dark:text-zinc-100">DCUOBot</span>
    </div>
  );
}
