import type { LeagueCharacter } from '@/features/leagues/models/league';
import { useTranslation } from 'react-i18next';
import {
  tableFeatures,
  rowSortingFeature,
  createSortedRowModel,
  sortFn_alphanumeric,
  sortFn_text,
  createColumnHelper,
  useTable,
  type Column,
  type SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowDown, ArrowUp, ArrowUpDown, Crown } from 'lucide-react';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, type ReactNode } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from 'cn';

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

type DataTableFeatures = typeof features;

const columnHelper = createColumnHelper<DataTableFeatures, LeagueCharacter>();

interface Props {
  data: LeagueCharacter[];
}

function SortableColumnHeader<TValue>({
  column,
  children,
}: {
  column: Column<DataTableFeatures, LeagueCharacter, TValue>;
  children: ReactNode;
}) {
  const sortDirection = column.getIsSorted();
  const Icon =
    sortDirection === 'asc' ? ArrowUp : sortDirection === 'desc' ? ArrowDown : ArrowUpDown;

  return (
    <div className={cn(buttonVariants({ variant: 'ghost' }), 'cursor-pointer')}>
      {children}
      <Icon className="ml-2 size-4" />
    </div>
  );
}

function LocaleNumberCell({ value, locale }: { value: number; locale: string }) {
  return <span>{value.toLocaleString(locale)}</span>;
}

type NumberColumnKey = 'skill_points' | 'combat_rating' | 'pvp_combat_rating';

function createNumberColumn(key: NumberColumnKey, label: string, locale: string) {
  return columnHelper.accessor(key, {
    header: ({ column }) => <SortableColumnHeader column={column}>{label}</SortableColumnHeader>,
    cell: ({ row }) => (
      <LocaleNumberCell
        value={Number(row.getValue(key))}
        locale={locale}
      />
    ),
  });
}

export default function LeagueMembersTable({ data }: Props) {
  const { t, i18n } = useTranslation('leagues');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'rank', desc: false }]);

  const columns = columnHelper.columns([
    columnHelper.accessor('rank', {
      header: ({ column }) => (
        <SortableColumnHeader column={column}>{t('league.details.rank')}</SortableColumnHeader>
      ),
      cell: ({ row }) => {
        const rank = Number(row.getValue('rank')) + 1;

        if (rank === 1) {
          return (
            <div className="flex gap-1 items-center">
              <span>{rank}</span>
              <TooltipTrigger>
                <Crown
                  size="12"
                  className="text-amber-500 dark:text-amber-300"
                  aria-label={t('league.details.leader')}
                />
                <Tooltip>{t('league.details.leader')}</Tooltip>
              </TooltipTrigger>
            </div>
          );
        }

        return <span>{rank}</span>;
      },
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <SortableColumnHeader column={column}>
          {t('league.details.characterName')}
        </SortableColumnHeader>
      ),
    }),
    createNumberColumn('skill_points', t('league.details.skillPoints'), i18n.language),
    createNumberColumn('combat_rating', t('league.details.combatRating'), i18n.language),
    createNumberColumn('pvp_combat_rating', t('league.details.pvpCombatRating'), i18n.language),
  ]);

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-hidden rounded-md">
      <Table
        aria-label={t('league.details.tableLabel')}
        sortDescriptor={
          sorting.length
            ? {
                column: sorting[0].id,
                direction: sorting[0].desc ? 'descending' : 'ascending',
              }
            : undefined
        }
        onSortChange={(sortDescriptor) => {
          table.setSorting([
            {
              id: '' + sortDescriptor.column,
              desc: sortDescriptor.direction === 'descending',
            },
          ]);
        }}
      >
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <TableHead
              key={header.id}
              id={header.id}
              isRowHeader={header.index === 0}
              allowsSorting={header.column.getCanSort()}
            >
              {header.isPlaceholder ? null : <table.FlexRender header={header} />}
            </TableHead>
          ))}
        </TableHeader>
        <TableBody renderEmptyState={() => t('league.details.noMembers')}>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              id={row.id}
            >
              {row.getAllCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="pl-6.5"
                >
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
