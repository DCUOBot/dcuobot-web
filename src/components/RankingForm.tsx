import type { RankingSearch } from '@/lib/ranking-search-route';
import type { RankingWorldId } from '@/lib/ranking-world-id';
import { useNavigate } from '@tanstack/react-router';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

type Option<T extends string | number> = {
  id: T;
  label: string;
};

type Props<TSort extends string> = {
  search: RankingSearch;
  serverOptions: Option<RankingWorldId>[];
  sortOptions: Option<TSort>[];
  serverAriaLabel: string;
  serverPlaceholder: string;
  sortAriaLabel: string;
  sortPlaceholder: string;
  refreshAriaLabel: string;
};

type RankingFilterValues = {
  worldId: RankingWorldId;
  sort: string;
};

export default function RankingForm<TSort extends string>({
  search,
  serverOptions,
  sortOptions,
  serverAriaLabel,
  serverPlaceholder,
  sortAriaLabel,
  sortPlaceholder,
  refreshAriaLabel,
}: Props<TSort>) {
  const navigate = useNavigate();
  const [_, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<RankingFilterValues>({
    defaultValues: {
      worldId: search.worldId as RankingWorldId,
      sort: search.sort,
    },
  });

  const onSubmit = (values: RankingFilterValues) => {
    startTransition(() => {
      void navigate({ to: '.', search: values });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center rounded-full border bg-muted/40 w-fit"
    >
      <Controller
        control={control}
        name="worldId"
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={(v) => field.onChange(Number(v))}
            aria-label={serverAriaLabel}
            placeholder={serverPlaceholder}
            className="shrink-0 max-w-48"
          >
            <SelectTrigger className="bg-transparent border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {serverOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    id={option.id}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="sort"
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            aria-label={sortAriaLabel}
            placeholder={sortPlaceholder}
            className="shrink-0 max-w-48"
          >
            <SelectTrigger className="bg-transparent border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    id={option.id}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Button
        variant="ghost"
        size="icon"
        type="submit"
        aria-label={refreshAriaLabel}
      >
        <RefreshCw size="4" />
      </Button>
    </form>
  );
}
