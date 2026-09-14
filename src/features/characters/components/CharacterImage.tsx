import type { Character } from '@/features/characters/models/character';
import { useTranslation } from 'react-i18next';
import ProtectedImage from '@/components/ProtectedImage';

type Props = {
  character: Character;
};

export default function CharacterImage({ character }: Props) {
  const { t } = useTranslation('characters');

  return (
    <ProtectedImage
      src={character.image.url}
      alt={t('character.details.imageAlt')}
      width={246}
      height={394}
      className="select-none drag-none rounded-4xl"
    />
  );
}
