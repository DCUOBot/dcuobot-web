import type { TFunction } from 'i18next';
import type { RankingWorldId } from '@/lib/ranking-world-id';

export type Option<T extends string | number> = {
  id: T;
  label: string;
};

export function getRankingServerOptions(t: TFunction, keyPrefix: string): Option<RankingWorldId>[] {
  return [
    { id: 0, label: t(`${keyPrefix}.all`) },
    { id: 2, label: t(`${keyPrefix}.usPcPs`) },
    { id: 4, label: t(`${keyPrefix}.euPcPs`) },
    { id: 10, label: t(`${keyPrefix}.usSwitch`) },
    { id: 11, label: t(`${keyPrefix}.euSwitch`) },
    { id: 5001, label: t(`${keyPrefix}.xbox`) },
  ];
}
