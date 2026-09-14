import DetailsError from '@/components/DetailsError';

type Props = {
  error: unknown;
};

export default function CharacterDetailsError({ error }: Props) {
  return (
    <DetailsError
      error={error}
      namespace="characters"
      notFoundKey="character.details.notFound"
    />
  );
}
