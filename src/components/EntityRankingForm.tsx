import type { RankingSearch } from '@/lib/ranking-search-route';
import type { Option } from '@/lib/ranking-options';
import { getRankingServerOptions } from '@/lib/ranking-options';
import { useTranslation } from 'react-i18next';
import RankingForm from '@/components/RankingForm';

type Props<TSort extends string> = {
  search: RankingSearch;
  namespace: string;
  keyPrefix: string;
  sortOptions: Option<TSort>[];
};

export default function EntityRankingForm<TSort extends string>({
  search,
  namespace,
  keyPrefix,
  sortOptions,
}: Props<TSort>) {
  const { t } = useTranslation(namespace);

  return (
    <RankingForm<TSort>
      search={search}
      serverOptions={getRankingServerOptions(t, `${keyPrefix}.servers`)}
      sortOptions={sortOptions}
      serverAriaLabel={t(`${keyPrefix}.servers.ariaLabel`)}
      serverPlaceholder={t(`${keyPrefix}.servers.placeholder`)}
      sortAriaLabel={t(`${keyPrefix}.sort.ariaLabel`)}
      sortPlaceholder={t(`${keyPrefix}.sort.placeholder`)}
      refreshAriaLabel={t(`${keyPrefix}.refreshAriaLabel`)}
    />
  );
}
