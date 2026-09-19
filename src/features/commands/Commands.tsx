import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';

interface Command {
  key: string;
  label: string;
  args: string[];
}

const COMMANDS: Command[] = [
  { key: 'character', label: '/character', args: ['server', 'name'] },
  { key: 'statistics', label: '/statistics', args: ['server', 'name'] },
  { key: 'league', label: '/league', args: ['server', 'name'] },
  { key: 'topcharacters', label: '/topcharacters', args: ['server', 'sortby'] },
  { key: 'topleagues', label: '/topleagues', args: ['server', 'sortby'] },
  { key: 'servers', label: '/servers', args: [] },
  {
    key: 'lfg',
    label: '/lfg',
    args: [
      'instance_name',
      'amount_of_tanks',
      'amount_of_healers',
      'amount_of_controllers',
      'amount_of_dps',
    ],
  },
];

export default function Commands() {
  const { t } = useTranslation('commands');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col pt-6 lg:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        {t('commands.heading')}
      </h1>
      <p className="text-xl text-muted-foreground">{t('commands.subheading')}</p>

      <Tabs
        defaultSelectedKey={COMMANDS[0].label}
        orientation="vertical"
        className="mt-6"
      >
        <TabsList>
          {COMMANDS.map((command) => (
            <TabsTrigger
              key={command.label}
              id={command.label}
              className="cursor-pointer"
            >
              {command.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {COMMANDS.map((command) => (
          <TabsContent
            key={command.label}
            id={command.label}
          >
            <div className="flex gap-1">
              <strong>{t('commands.command')}</strong>
              <code>{command.label}</code>
            </div>

            <div className="flex gap-1 mb-2">
              <strong>{t('commands.description')}</strong>
              <code>{t(`commands.commands.${command.key}.description`)}</code>
            </div>

            <strong>{t('commands.arguments')}</strong>
            <ul className="pl-2">
              {command.args.map((arg) => (
                <li
                  key={arg}
                  className="flex gap-1"
                >
                  <strong>{arg}:</strong>
                  <code>{t(`commands.commands.${command.key}.args.${arg}`)}</code>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
