import { queryOptions } from '@tanstack/react-query';
import { getServerStatus } from '@/features/server-status/api.ts';

export const serverStatusQueries = {
  getServerStatus: () =>
    queryOptions({
      queryKey: ['server-status'],
      queryFn: () => getServerStatus(),
      staleTime: 'static',
    }),
};
