import { charactersRankingRoute } from '@/features/characters/characters.routes';
import CharactersRankingForm from '@/features/characters/components/CharactersRankingForm';
import { useTranslation } from 'react-i18next';
import { useSuspenseQuery } from '@tanstack/react-query';
import { characterQueries } from '@/features/characters/queries';
import CharacterSummary from '@/features/characters/components/CharacterSummary';
import RankingPage from '@/components/RankingPage';
import { useDocumentTitle, useMetaDescription } from '@/lib/meta.ts';

export default function CharactersRanking() {
  const search = charactersRankingRoute.useSearch();
  const { t } = useTranslation('characters');
  const { data: characters } = useSuspenseQuery(
    characterQueries.getCharactersRanking(search.worldId, search.sort),
  );

  useDocumentTitle(t('character.ranking.pageTitle'));
  useMetaDescription(t('character.ranking.pageDescription'));

  return (
    <RankingPage
      heading={t('character.ranking.heading')}
      subheading={t('character.ranking.subheading')}
      form={<CharactersRankingForm search={search} />}
      items={characters}
      renderItem={(character, index) => (
        <CharacterSummary
          key={index}
          character={character}
          index={index}
          sort={search.sort}
        />
      )}
    />
  );
}
