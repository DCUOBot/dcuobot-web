import type { Character } from '@/features/characters/models/character';
import { useTranslation } from 'react-i18next';
import StatList from '@/components/StatList';

type Props = {
  character: Character;
};

export default function CharacterStats({ character }: Props) {
  const { t, i18n } = useTranslation('characters');

  const stat = (key: keyof Character['stats'], labelKey: string) => ({
    key,
    label: t(labelKey),
    value: <strong>{character.stats[key].toLocaleString(i18n.language)}</strong>,
  });

  return (
    <StatList
      items={[
        stat('health', 'character.details.health'),
        stat('power', 'character.details.power'),
        stat('might', 'character.details.might'),
        stat('precision', 'character.details.precision'),
        stat('restoration', 'character.details.restoration'),
        stat('vitalization', 'character.details.vitalization'),
        stat('dominance', 'character.details.dominance'),
        stat('defense', 'character.details.defense'),
        stat('toughness', 'character.details.toughness'),
      ]}
    />
  );
}
