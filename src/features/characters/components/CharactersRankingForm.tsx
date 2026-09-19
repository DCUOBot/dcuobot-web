import type { RankingSearch } from '@/lib/ranking-search-route';
import type { CharacterSort } from '@/lib/character-sort';
import { useTranslation } from 'react-i18next';
import EntityRankingForm from '@/components/EntityRankingForm';

type Props = {
  search: RankingSearch;
};

export default function CharactersRankingForm({ search }: Props) {
  const { t } = useTranslation('characters');

  return (
    <EntityRankingForm<CharacterSort>
      search={search}
      namespace="characters"
      keyPrefix="character.ranking"
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
    />
  );
}
