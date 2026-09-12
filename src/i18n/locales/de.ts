import type en from '@/i18n/locales/en';

const de: typeof en = {
  header: {
    appName: 'DCUOBot',
    logoAlt: 'DCUOBot Logo',
    addBot: 'DCUOBot hinzufügen',
    search: {
      type: {
        placeholder: 'Typ',
        ariaLabel: 'Typ',
        values: {
          character: 'Charakter',
          league: 'Liga',
        },
      },
      server: {
        placeholder: 'Server',
        ariaLabel: 'Server',
        values: {
          usPcPs: 'USPC/PS',
          euPcPs: 'EUPC/PS',
          usSwitch: 'US Switch',
          euSwitch: 'EU Switch',
          xbox: 'Xbox',
        },
      },
      query: {
        placeholder: 'Charakter oder Liga suchen...',
        ariaLabel: 'Suchanfrage',
      },
    },
    serverStatus: 'Serverstatus',
    rankings: {
      label: 'Ranglisten',
      characters: 'Charakter Rangliste',
      leagues: 'Liga Rangliste',
    },
    commands: 'Befehle',
    menu: {
      ariaLabel: 'Menü umschalten',
      label: 'Menü',
    },
  },
};

export default de;
