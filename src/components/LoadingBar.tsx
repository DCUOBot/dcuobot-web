import { useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

function nextProgress(current: number): number {
  if (current < 20) {
    return current + 10;
  }

  if (current < 50) {
    return current + 4;
  }

  if (current < 80) {
    return current + 2;
  }

  if (current < 99) {
    return current + 0.5;
  }

  return current;
}

export default function LoadingBar() {
  const isLoading = useRouterState({ select: (state) => state.isLoading });
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(0);

      intervalRef.current = setInterval(() => {
        setProgress((current) => nextProgress(current));
      }, 200);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setProgress(100);

    const timeout = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-100 h-0.5 w-full overflow-hidden bg-transparent">
      <div
        className="h-full bg-brand transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
