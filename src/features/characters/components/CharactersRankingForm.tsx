import type { RankingSearch } from '@/lib/ranking-search-route';
import { Controller, useForm } from 'react-hook-form';
import type { RankingWorldId } from '@/lib/ranking-world-id';
import type { CharacterSort } from '@/lib/character-sort';
import { useTransition } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

type Props = {
  search: RankingSearch;
};

type RankingFilterValues = {
  worldId: RankingWorldId;
  sort: CharacterSort;
};

export default function CharactersRankingForm({ search }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('characters');
  const [_, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<RankingFilterValues>({
    defaultValues: {
      worldId: search.worldId as RankingWorldId,
      sort: search.sort as CharacterSort,
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
            aria-label={t('character.ranking.servers.ariaLabel')}
            placeholder={t('character.ranking.servers.placeholder')}
            className="shrink-0 max-w-48"
          >
            <SelectTrigger className="bg-transparent border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id={0}>{t('character.ranking.servers.all')}</SelectItem>
                <SelectItem id={2}>{t('character.ranking.servers.usPcPs')}</SelectItem>
                <SelectItem id={4}>{t('character.ranking.servers.euPcPs')}</SelectItem>
                <SelectItem id={10}>{t('character.ranking.servers.usSwitch')}</SelectItem>
                <SelectItem id={11}>{t('character.ranking.servers.euSwitch')}</SelectItem>
                <SelectItem id={5001}>{t('character.ranking.servers.xbox')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      ></Controller>

      <Controller
        control={control}
        name="sort"
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            aria-label={t('character.ranking.sort.ariaLabel')}
            placeholder={t('character.ranking.sort.placeholder')}
            className="shrink-0 max-w-48"
          >
            <SelectTrigger className="bg-transparent border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id="skill_points">{t('character.ranking.sort.skillPoints')}</SelectItem>
                <SelectItem id="combat_rating">
                  {t('character.ranking.sort.combatRating')}
                </SelectItem>
                <SelectItem id="pvp_combat_rating">
                  {t('character.ranking.sort.pvpCombatRating')}
                </SelectItem>
                <SelectItem id="max_health">{t('character.ranking.sort.health')}</SelectItem>
                <SelectItem id="max_power">{t('character.ranking.sort.power')}</SelectItem>
                <SelectItem id="toughness">{t('character.ranking.sort.toughness')}</SelectItem>
                <SelectItem id="might">{t('character.ranking.sort.might')}</SelectItem>
                <SelectItem id="precision">{t('character.ranking.sort.precision')}</SelectItem>
                <SelectItem id="defense">{t('character.ranking.sort.defense')}</SelectItem>
                <SelectItem id="dominance">{t('character.ranking.sort.dominance')}</SelectItem>
                <SelectItem id="restoration">{t('character.ranking.sort.restoration')}</SelectItem>
                <SelectItem id="vitalization">
                  {t('character.ranking.sort.vitalization')}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      ></Controller>

      <Button
        variant="ghost"
        size="icon"
        type="submit"
        aria-label={t('character.ranking.refreshAriaLabel')}
      >
        <RefreshCw size="4" />
      </Button>
    </form>
  );
}
