import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ProtectedImage from '@/components/ProtectedImage';
import RankMedalHeading from '@/components/RankMedalHeading';
import { ChevronRight } from 'lucide-react';

type Props = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  index: number;
  worldId: string;
  alignment: string;
  children: ReactNode;
};

export default function EntitySummaryCard({
  imageSrc,
  imageAlt,
  name,
  index,
  worldId,
  alignment,
  children,
}: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col lg:flex-row gap-4">
        <div className="flex justify-center">
          <ProtectedImage
            src={imageSrc}
            alt={imageAlt}
            width={117}
            height={188}
            className="select-none drag-none rounded-4xl"
          />
        </div>

        <div className="flex flex-col justify-between">
          <RankMedalHeading
            name={name}
            index={index}
            worldId={worldId}
            alignment={alignment}
          />

          {children}
        </div>

        <div className="hidden lg:flex flex-col justify-center ms-auto">
          <span className="text-muted-foreground">
            <ChevronRight size={24} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
