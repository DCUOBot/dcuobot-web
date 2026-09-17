import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import type { Character } from '@/features/characters/models/character';
import ProtectedImage from '@/components/ProtectedImage';
import { useTranslation } from 'react-i18next';
import CharacterSummaryHeading from '@/features/characters/components/CharacterSummaryHeading';
import CharacterSummaryStats from '@/features/characters/components/CharacterSummaryStats';
import { ChevronRight } from 'lucide-react';

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
      <Card>
        <CardContent className="flex flex-col lg:flex-row gap-4">
          <div className="flex justify-center">
            <ProtectedImage
              src={character.image.url}
              alt={t('character.details.imageAlt')}
              width={117}
              height={188}
              className="select-none drag-none rounded-4xl"
            />
          </div>

          <div className="flex flex-col justify-between">
            <CharacterSummaryHeading
              character={character}
              index={index}
            />

            <CharacterSummaryStats
              character={character}
              sort={sort}
            />
          </div>

          <div className="hidden lg:flex flex-col justify-center ms-auto">
            <span className="text-muted-foreground">
              <ChevronRight size={24} />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
