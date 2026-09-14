import type { Character } from '@/features/characters/character';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from 'react-aria-components';
import ProtectedImage from '@/components/ProtectedImage';

type Props = {
  character: Character;
};

export default function CharacterArtifacts({ character }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      {character.artifacts.map((artifact) => (
        <TooltipTrigger key={artifact.id}>
          <Button className="outline-none cursor-default">
            <ProtectedImage
              src={artifact.image_url.replace('https://dcuo.bot', '')}
              alt={artifact.name}
              width={32}
              height={32}
              className="select-none drag-none"
            />
          </Button>
          <Tooltip>{artifact.name}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
