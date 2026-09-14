import type { Character } from '@/features/characters/character';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { formatWorldId } from '@/lib/world-id-format';
import { Link } from '@tanstack/react-router';

type Props = {
  character: Character;
};

export default function CharacterInfo({ character }: Props) {
  const { t, i18n } = useTranslation('characters');

  return (
    <Card>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>{t('character.details.name')}</span>
            <strong>{character.name}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.server')}</span>
            <strong>{formatWorldId(character.world_id)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.personality')}</span>
            <strong>{character.personality}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.powerSet')}</span>
            <strong>{character.power_type}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.movementMode')}</span>
            <strong>{character.movement_mode}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.skillPoints')}</span>
            <strong>{character.skill_points.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.combatRating')}</span>
            <strong>{character.combat_rating.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.pvpCombatRating')}</span>
            <strong>{character.pvp_combat_rating.toLocaleString(i18n.language)}</strong>
          </li>
          <li className="flex justify-between">
            <span>{t('character.details.league')}</span>
            {character.guild ? (
              <Link
                to="/leagues"
                search={{ query: character.guild.name, worldId: Number(character.world_id) }}
              >
                <strong className="underline">{character.guild.name}</strong>
              </Link>
            ) : (
              <span className="text-muted-foreground">&mdash;</span>
            )}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
