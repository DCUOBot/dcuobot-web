import { characterDetailsRoute } from '@/features/characters/characters.routes';
import { useSuspenseQuery } from '@tanstack/react-query';
import { characterQueries } from '@/features/characters/queries';
import { formatWorldId } from '@/lib/world-id-format';
import CharacterImage from '@/features/characters/components/CharacterImage';
import CharacterArtifacts from '@/features/characters/components/CharacterArtifacts';
import CharacterInfo from '@/features/characters/components/CharacterInfo';
import CharacterStats from '@/features/characters/components/CharacterStats';
import CharacterAllies from '@/features/characters/components/CharacterAllies';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta';
import { useTranslation } from 'react-i18next';

export default function CharacterDetails() {
  const { t } = useTranslation('characters');
  const { query, worldId } = characterDetailsRoute.useSearch();
  const { data: character } = useSuspenseQuery(characterQueries.getCharacter(query!, worldId!));

  useDocumentTitle(t('character.details.pageTitle', { name: character.name }));
  useMetaDescription(t('character.details.pageDescription', { name: character.name }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {character.name}
      </h1>
      <p className="text-xl text-muted-foreground">
        {formatWorldId(character.world_id)}&nbsp;{character.alignment}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 mt-6 gap-4">
        <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start">
          <div className="flex flex-col gap-4">
            <CharacterImage character={character} />
            <CharacterArtifacts character={character} />
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <CharacterInfo character={character} />
          </div>
          <div>
            <CharacterStats character={character} />
          </div>
          <div className="lg:col-span-2">
            <CharacterAllies character={character} />
          </div>
        </div>
      </div>
    </div>
  );
}
