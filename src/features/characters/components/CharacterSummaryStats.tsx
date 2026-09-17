import type { Character } from '@/features/characters/models/character';
import { useTranslation } from 'react-i18next';

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
      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' + (sort !== 'skill_points' ? 'text-muted-foreground' : '')
          }
        >
          {character.skill_points.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'skill_points' ? 'text-muted-foreground' : ''}>
            {t('character.ranking.sort.skillPoints')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' + (sort !== 'combat_rating' ? 'text-muted-foreground' : '')
          }
        >
          {character.combat_rating.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'combat_rating' ? 'text-muted-foreground' : ''}>
            {t('character.ranking.sort.combatRating')}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
        <span
          className={
            'text-xl font-semibold ' + (sort !== 'pvp_combat_rating' ? 'text-muted-foreground' : '')
          }
        >
          {character.pvp_combat_rating.toLocaleString(i18n.language)}
        </span>
        <div className="order-first lg:order-last">
          <span className={sort !== 'pvp_combat_rating' ? 'text-muted-foreground' : ''}>
            {t('character.ranking.sort.pvpCombatRating')}
          </span>
        </div>
      </div>

      {displayFourthSortParam() ? (
        <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
          <span className="text-xl font-semibold">
            {fourthStat().toLocaleString(i18n.language)}
          </span>
          <div className="order-first lg:order-last">
            <span>{fourthStatLabel()}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
