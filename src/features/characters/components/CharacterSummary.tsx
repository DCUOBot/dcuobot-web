import { Link } from '@tanstack/react-router';
import type { Character } from '@/features/characters/models/character';
import { useTranslation } from 'react-i18next';
import EntitySummaryCard from '@/components/EntitySummaryCard';
import CharacterSummaryStats from '@/features/characters/components/CharacterSummaryStats';

type Props = {
  character: Character;
  index: number;
  sort: string;
};

export default function CharacterSummary({ character, index, sort }: Props) {
  const { t } = useTranslation('characters');

  return (
    <Link
      to="/characters"
      search={{ query: character.name, worldId: Number(character.world_id) }}
      className="rounded-4xl"
    >
      <EntitySummaryCard
        imageSrc={character.image.url}
        imageAlt={t('character.details.imageAlt')}
        name={character.name}
        index={index}
        worldId={character.world_id}
        alignment={character.alignment}
      >
        <CharacterSummaryStats
          character={character}
          sort={sort}
        />
      </EntitySummaryCard>
    </Link>
  );
}
