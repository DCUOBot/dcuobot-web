import PendingPage from '@/components/PendingPage';
import { Skeleton } from '@/components/ui/skeleton';

const CARD_COUNT = 3;

export default function ServerStatusSkeleton() {
  return (
    <PendingPage>
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-6 w-96 max-w-full" />

      <div className="flex flex-col gap-4 mt-6">
        {Array.from({ length: CARD_COUNT }, (_, index) => (
          <Skeleton
            key={index}
            className="h-24 rounded-4xl"
          />
        ))}
      </div>
    </PendingPage>
  );
}
