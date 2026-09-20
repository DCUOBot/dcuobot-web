import PendingPage from '@/components/PendingPage';
import { Skeleton } from '@/components/ui/skeleton';

export default function CharacterDetailsSkeleton() {
  return (
    <PendingPage>
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-6 w-48" />

      <div className="grid grid-cols-1 lg:grid-cols-4 mt-6 gap-4">
        <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[394px] w-[246px] rounded-4xl" />
            <Skeleton className="h-8 w-[246px] rounded-4xl" />
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-48 rounded-4xl" />
          <Skeleton className="h-48 rounded-4xl" />
          <Skeleton className="h-64 rounded-4xl lg:col-span-2" />
        </div>
      </div>
    </PendingPage>
  );
}
