import { cn } from '@/lib/utils';

type EmbedFadeOverlayProps = {
  className?: string;
};

export default function EmbedFadeOverlay({ className }: EmbedFadeOverlayProps) {
  return (
    <div
      className={cn(
        'absolute -bottom-1 -left-1 w-[calc(100%+5px)] rounded-b h-24 bg-gradient-to-b from-transparent to-white dark:to-zinc-950',
        className,
      )}
    ></div>
  );
}
