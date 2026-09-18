import type { RankingSearch } from '@/lib/ranking-search-route';
import type { CharacterSort } from '@/lib/character-sort';
import { useTranslation } from 'react-i18next';
import RankingForm from '@/components/RankingForm';

type Props = {
  search: RankingSearch;
};

export default function CharactersRankingForm({ search }: Props) {
  const { t } = useTranslation('characters');

  return (
    <RankingForm<CharacterSort>
      search={search}
      serverOptions={[
        { id: 0, label: t('character.ranking.servers.all') },
        { id: 2, label: t('character.ranking.servers.usPcPs') },
        { id: 4, label: t('character.ranking.servers.euPcPs') },
        { id: 10, label: t('character.ranking.servers.usSwitch') },
        { id: 11, label: t('character.ranking.servers.euSwitch') },
        { id: 5001, label: t('character.ranking.servers.xbox') },
      ]}
      sortOptions={[
        { id: 'skill_points', label: t('character.ranking.sort.skillPoints') },
        { id: 'combat_rating', label: t('character.ranking.sort.combatRating') },
        { id: 'pvp_combat_rating', label: t('character.ranking.sort.pvpCombatRating') },
        { id: 'max_health', label: t('character.ranking.sort.health') },
        { id: 'max_power', label: t('character.ranking.sort.power') },
        { id: 'toughness', label: t('character.ranking.sort.toughness') },
        { id: 'might', label: t('character.ranking.sort.might') },
        { id: 'precision', label: t('character.ranking.sort.precision') },
        { id: 'defense', label: t('character.ranking.sort.defense') },
        { id: 'dominance', label: t('character.ranking.sort.dominance') },
        { id: 'restoration', label: t('character.ranking.sort.restoration') },
        { id: 'vitalization', label: t('character.ranking.sort.vitalization') },
      ]}
      serverAriaLabel={t('character.ranking.servers.ariaLabel')}
      serverPlaceholder={t('character.ranking.servers.placeholder')}
      sortAriaLabel={t('character.ranking.sort.ariaLabel')}
      sortPlaceholder={t('character.ranking.sort.placeholder')}
      refreshAriaLabel={t('character.ranking.refreshAriaLabel')}
    />
  );
}
