import DetailsError from '@/components/DetailsError';

type Props = {
  error: unknown;
};

export default function LeagueDetailsError({ error }: Props) {
  return (
    <DetailsError
      error={error}
      namespace="leagues"
      notFoundKey="league.details.notFound"
    />
  );
}
