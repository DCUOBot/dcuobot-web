import { useEffect, useRef, useState } from 'react';

export function useChunkedList<T>(items: T[], chunkSize: number) {
  const [visibleCount, setVisibleCount] = useState(chunkSize);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => Math.min(count + chunkSize, items.length));
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [items.length, chunkSize]);

  return {
    visibleItems: items.slice(0, visibleCount),
    hasMore: visibleCount < items.length,
    loadMoreRef,
  };
}
