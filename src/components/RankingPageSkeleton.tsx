import PendingPage from '@/components/PendingPage';
import { Skeleton } from '@/components/ui/skeleton';

const ITEM_COUNT = 5;

export default function RankingPageSkeleton() {
  return (
    <PendingPage>
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-6 w-48" />

      <Skeleton className="h-10 w-64 rounded-full mt-6" />

      <div className="flex flex-col gap-4 mt-6">
        {Array.from({ length: ITEM_COUNT }, (_, index) => (
          <Skeleton
            key={index}
            className="h-32 rounded-4xl"
          />
        ))}
      </div>
    </PendingPage>
  );
}
