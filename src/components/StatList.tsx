import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type StatItem = {
  key: string;
  label: ReactNode;
  value: ReactNode;
};

type Props = {
  items: StatItem[];
};

export default function StatList({ items }: Props) {
  return (
    <Card>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex justify-between"
            >
              <span>{item.label}</span>
              {item.value}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
