import { charactersRankingRoute } from '@/features/characters/characters.routes';
import CharactersRankingForm from '@/features/characters/components/CharactersRankingForm';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';
import { characterQueries } from '@/features/characters/queries';
import CharacterSummary from '@/features/characters/components/CharacterSummary';
import { useEffect, useRef, useState } from 'react';

const CHUNK_SIZE = 10;

export default function CharactersRanking() {
  const search = charactersRankingRoute.useSearch();
  const { t } = useTranslation('characters');
  const { data: characters } = useSuspenseQuery(
    characterQueries.getCharactersRanking(search.worldId, search.sort),
  );

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => Math.min(count + CHUNK_SIZE, characters.length));
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [characters.length]);

  const visibleCharacters = characters.slice(0, visibleCount);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {t('character.ranking.heading')}
      </h1>
      <p className="text-xl text-muted-foreground">{t('character.ranking.subheading')}</p>

      <div className="block mt-6">
        <CharactersRankingForm search={search} />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {visibleCharacters.map((character, index) => (
          <CharacterSummary
            key={index}
            character={character}
            index={index}
            sort={search.sort}
          />
        ))}
        {visibleCount < characters.length && (
          <div
            ref={loadMoreRef}
            className="h-1"
          />
        )}
      </div>
    </div>
  );
}
