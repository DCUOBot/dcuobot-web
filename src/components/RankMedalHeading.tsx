import { HugeiconsIcon } from '@hugeicons/react';
import {
  MedalFirstPlaceIcon,
  MedalSecondPlaceIcon,
  MedalThirdPlaceIcon,
} from '@hugeicons/core-free-icons';
import { formatWorldId } from '@/lib/world-id-format';

type Props = {
  name: string;
  index: number;
  worldId: string;
  alignment: string;
};

export default function RankMedalHeading({ name, index, worldId, alignment }: Props) {
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
        <span>{name}</span>
      </p>
      <p className="text-muted-foreground text-center lg:text-start">
        #{index + 1}&nbsp;{formatWorldId(worldId)}&nbsp;{alignment}
      </p>
    </div>
  );
}
