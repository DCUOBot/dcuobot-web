import type { Character } from '@/features/characters/models/character';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  character: Character;
};

export default function CharacterAllies({ character }: Props) {
  const { t } = useTranslation('characters');

  const combatAlly = character.allies.find((ally) => ally.combat)?.name ?? '—';
  const supportAllies = character.allies.filter((ally) => !ally.combat);
  const supportAlly1 = supportAllies[0]?.name ?? '—';
  const supportAlly2 = supportAllies[1]?.name ?? '—';

  return (
    <Card>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>{t('character.details.combatAlly')}</span>
            <strong>{combatAlly}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.supportAlly')}&nbsp;1</span>
            <strong>{supportAlly1}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.supportAlly')}&nbsp;2</span>
            <strong>{supportAlly2}</strong>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
