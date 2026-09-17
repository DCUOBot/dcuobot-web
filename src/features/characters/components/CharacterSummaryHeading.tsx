import type { Character } from '@/features/characters/models/character';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  MedalFirstPlaceIcon,
  MedalSecondPlaceIcon,
  MedalThirdPlaceIcon,
} from '@hugeicons/core-free-icons';
import { formatWorldId } from '@/lib/world-id-format';

type Props = {
  character: Character;
  index: number;
};

export default function CharacterSummaryHeading({ character, index }: Props) {
  const renderMedal = () => {
    switch (index) {
      case 0:
        return (
          <span className="text-yellow-500">
            <HugeiconsIcon icon={MedalFirstPlaceIcon} />
          </span>
        );
      case 1:
        return (
          <span className="text-gray-400 dark:text-gray-300">
            <HugeiconsIcon icon={MedalSecondPlaceIcon} />
          </span>
        );
      case 2:
        return (
          <span className="text-amber-600">
            <HugeiconsIcon icon={MedalThirdPlaceIcon} />
          </span>
        );
    }

    return null;
  };

  return (
    <div>
      <p className="scroll-m-20 text-3xl font-semibold tracking-tight flex items-center justify-center lg:justify-start gap-1">
        {renderMedal()}
        <span>{character.name}</span>
      </p>
      <p className="text-muted-foreground text-center lg:text-start">
        #{index + 1}&nbsp;{formatWorldId(character.world_id)}&nbsp;{character.alignment}
      </p>
    </div>
  );
}
