type Props = {
  value: string;
  label: string;
  active: boolean;
};

export default function RankingStat({ value, label, active }: Props) {
  const mutedClass = active ? '' : 'text-muted-foreground';

  return (
    <div className="flex justify-between items-center lg:flex-col lg:justify-start lg:items-start">
      <span className={`text-xl font-semibold ${mutedClass}`}>{value}</span>
      <div className="order-first lg:order-last">
        <span className={mutedClass}>{label}</span>
      </div>
    </div>
  );
}
