import type { Character } from '@/features/characters/models/character';
import StatList from '@/components/StatList';
import { useTranslation } from 'react-i18next';
import { formatWorldId } from '@/lib/world-id-format';
import { Link } from '@tanstack/react-router';

type Props = {
  character: Character;
};

export default function CharacterInfo({ character }: Props) {
  const { t, i18n } = useTranslation('characters');

  return (
    <StatList
      items={[
        {
          key: 'name',
          label: t('character.details.name'),
          value: <strong>{character.name}</strong>,
        },
        {
          key: 'server',
          label: t('character.details.server'),
          value: <strong>{formatWorldId(character.world_id)}</strong>,
        },
        {
          key: 'personality',
          label: t('character.details.personality'),
          value: <strong>{character.personality}</strong>,
        },
        {
          key: 'powerSet',
          label: t('character.details.powerSet'),
          value: <strong>{character.power_type}</strong>,
        },
        {
          key: 'movementMode',
          label: t('character.details.movementMode'),
          value: <strong>{character.movement_mode}</strong>,
        },
        {
          key: 'skillPoints',
          label: t('character.details.skillPoints'),
          value: <strong>{character.skill_points.toLocaleString(i18n.language)}</strong>,
        },
        {
          key: 'combatRating',
          label: t('character.details.combatRating'),
          value: <strong>{character.combat_rating.toLocaleString(i18n.language)}</strong>,
        },
        {
          key: 'pvpCombatRating',
          label: t('character.details.pvpCombatRating'),
          value: <strong>{character.pvp_combat_rating.toLocaleString(i18n.language)}</strong>,
        },
        {
          key: 'league',
          label: t('character.details.league'),
          value: character.guild ? (
            <Link
              to="/leagues"
              search={{ query: character.guild.name, worldId: Number(character.world_id) }}
            >
              <strong className="underline">{character.guild.name}</strong>
            </Link>
          ) : (
            <span className="text-muted-foreground">&mdash;</span>
          ),
        },
      ]}
    />
  );
}
