import type { Character } from '@/features/characters/models/character';
import { useTranslation } from 'react-i18next';
import RankingStat from '@/components/RankingStat';

type Props = {
  character: Character;
  sort: string;
};

export default function CharacterSummaryStats({ character, sort }: Props) {
  const { t, i18n } = useTranslation('characters');

  const displayFourthSortParam = () => {
    return sort !== 'skill_points' && sort !== 'combat_rating' && sort !== 'pvp_combat_rating';
  };

  const fourthStat = () => {
    switch (sort) {
      case 'skill_points':
        return character.skill_points;
      case 'combat_rating':
        return character.combat_rating;
      case 'pvp_combat_rating':
        return character.pvp_combat_rating;
      case 'max_health':
        return character.stats.health;
      case 'max_power':
        return character.stats.power;
      case 'toughness':
        return character.stats.toughness;
      case 'might':
        return character.stats.might;
      case 'precision':
        return character.stats.precision;
      case 'defense':
        return character.stats.defense;
      case 'dominance':
        return character.stats.dominance;
      case 'restoration':
        return character.stats.restoration;
      case 'vitalization':
        return character.stats.vitalization;
    }

    return 0;
  };

  const fourthStatLabel = () => {
    switch (sort) {
      case 'skill_points':
        return t('character.ranking.sort.skillPoints');
      case 'combat_rating':
        return t('character.ranking.sort.combatRating');
      case 'pvp_combat_rating':
        return t('character.ranking.sort.pvpCombatRating');
      case 'max_health':
        return t('character.ranking.sort.health');
      case 'max_power':
        return t('character.ranking.sort.power');
      case 'toughness':
        return t('character.ranking.sort.toughness');
      case 'might':
        return t('character.ranking.sort.might');
      case 'precision':
        return t('character.ranking.sort.precision');
      case 'defense':
        return t('character.ranking.sort.defense');
      case 'dominance':
        return t('character.ranking.sort.dominance');
      case 'restoration':
        return t('character.ranking.sort.restoration');
      case 'vitalization':
        return t('character.ranking.sort.vitalization');
    }

    return '';
  };

  return (
    <div
      className={
        'grid grid-cols-1 gap-2 mt-4 lg:mt-0 ' +
        (displayFourthSortParam() ? 'lg:grid-cols-4' : 'lg:grid-cols-3')
      }
    >
      <RankingStat
        value={character.skill_points.toLocaleString(i18n.language)}
        label={t('character.ranking.sort.skillPoints')}
        active={sort === 'skill_points'}
      />
      <RankingStat
        value={character.combat_rating.toLocaleString(i18n.language)}
        label={t('character.ranking.sort.combatRating')}
        active={sort === 'combat_rating'}
      />
      <RankingStat
        value={character.pvp_combat_rating.toLocaleString(i18n.language)}
        label={t('character.ranking.sort.pvpCombatRating')}
        active={sort === 'pvp_combat_rating'}
      />

      {displayFourthSortParam() ? (
        <RankingStat
          value={fourthStat().toLocaleString(i18n.language)}
          label={fourthStatLabel()}
          active
        />
      ) : null}
    </div>
  );
}
