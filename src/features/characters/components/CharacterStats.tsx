import type { Character } from '@/features/characters/character';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  character: Character;
};

export default function CharacterStats({ character }: Props) {
  const { t, i18n } = useTranslation('characters');

  return (
    <Card>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>{t('character.details.health')}</span>
            <strong>{character.stats.health.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.power')}</span>
            <strong>{character.stats.power.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.might')}</span>
            <strong>{character.stats.might.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.precision')}</span>
            <strong>{character.stats.precision.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.restoration')}</span>
            <strong>{character.stats.restoration.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.vitalization')}</span>
            <strong>{character.stats.vitalization.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.dominance')}</span>
            <strong>{character.stats.dominance.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.defense')}</span>
            <strong>{character.stats.defense.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.toughness')}</span>
            <strong>{character.stats.toughness.toLocaleString(i18n.language)}</strong>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
