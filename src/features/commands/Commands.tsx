import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';

interface Command {
  label: string;
  descriptionI18n: string;
  arguments: CommandArg[];
}

interface CommandArg {
  label: string;
  descriptionI18n: string;
}

const COMMANDS: Command[] = [
  {
    label: '/character',
    descriptionI18n: 'commands.commands.character.description',
    arguments: [
      {
        label: 'server',
        descriptionI18n: 'commands.commands.character.args.server',
      },
      {
        label: 'name',
        descriptionI18n: 'commands.commands.character.args.name',
      },
    ],
  },
  {
    label: '/statistics',
    descriptionI18n: 'commands.commands.statistics.description',
    arguments: [
      {
        label: 'server',
        descriptionI18n: 'commands.commands.statistics.args.server',
      },
      {
        label: 'name',
        descriptionI18n: 'commands.commands.statistics.args.name',
      },
    ],
  },
  {
    label: '/league',
    descriptionI18n: 'commands.commands.league.description',
    arguments: [
      {
        label: 'server',
        descriptionI18n: 'commands.commands.league.args.server',
      },
      {
        label: 'name',
        descriptionI18n: 'commands.commands.league.args.name',
      },
    ],
  },
  {
    label: '/topcharacters',
    descriptionI18n: 'commands.commands.topcharacters.description',
    arguments: [
      {
        label: 'server',
        descriptionI18n: 'commands.commands.topcharacters.args.server',
      },
      {
        label: 'sortby',
        descriptionI18n: 'commands.commands.topcharacters.args.sortby',
      },
    ],
  },
  {
    label: '/topleagues',
    descriptionI18n: 'commands.commands.topleagues.description',
    arguments: [
      {
        label: 'server',
        descriptionI18n: 'commands.commands.topleagues.args.server',
      },
      {
        label: 'sortby',
        descriptionI18n: 'commands.commands.topleagues.args.sortby',
      },
    ],
  },
  {
    label: '/servers',
    descriptionI18n: 'commands.commands.servers.description',
    arguments: [],
  },
  {
    label: '/lfg',
    descriptionI18n: 'commands.commands.lfg.description',
    arguments: [
      {
        label: 'instance_name',
        descriptionI18n: 'commands.commands.lfg.args.instance_name',
      },
      {
        label: 'amount_of_tanks',
        descriptionI18n: 'commands.commands.lfg.args.amount_of_tanks',
      },
      {
        label: 'amount_of_healers',
        descriptionI18n: 'commands.commands.lfg.args.amount_of_healers',
      },
      {
        label: 'amount_of_controllers',
        descriptionI18n: 'commands.commands.lfg.args.amount_of_controllers',
      },
      {
        label: 'amount_of_dps',
        descriptionI18n: 'commands.commands.lfg.args.amount_of_dps',
      },
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
              <code>{t(command.descriptionI18n)}</code>
            </div>

            <strong>{t('commands.arguments')}</strong>
            <ul className="pl-2">
              {command.arguments.map((arg, index) => (
                <li
                  key={index}
                  className="flex gap-1"
                >
                  <strong>{arg.label}:</strong>
                  <code>{t(arg.descriptionI18n)}</code>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
