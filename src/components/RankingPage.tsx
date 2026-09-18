import type { ReactNode } from 'react';
import { useChunkedList } from '@/lib/use-chunked-list';

const CHUNK_SIZE = 10;

type Props<T> = {
  heading: string;
  subheading: string;
  form: ReactNode;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export default function RankingPage<T>({ heading, subheading, form, items, renderItem }: Props<T>) {
  const { visibleItems, hasMore, loadMoreRef } = useChunkedList(items, CHUNK_SIZE);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">{heading}</h1>
      <p className="text-xl text-muted-foreground">{subheading}</p>

      <div className="block mt-6">{form}</div>

      <div className="flex flex-col gap-4 mt-6">
        {visibleItems.map(renderItem)}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="h-1"
          />
        )}
      </div>
    </div>
  );
}
