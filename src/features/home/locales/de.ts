import type en from '@/features/home/locales/en';

const de: typeof en = {
  home: {
    pageTitle: 'DCUOBot - DC Universe Online Statistiken',
    pageDescription: 'Charakter- und Liga-Statistiken, Ranglisten und mehr für DC Universe Online.',
    heading: 'DCUOBot',
    subheading:
      'Rufe Charakter- und Liga-Statistiken auf deinem eigenen Discord-Server oder auf ' +
      'dieser Website ab.',
    addBot: 'DCUOBot hinzufügen',
    apiDocs: 'API Dokumentation',
    commands: 'Befehle',
    lfg: {
      heading: 'Suche nach Gruppe',
      text:
        'Beginne mit der Gruppensuche, indem du den Namen der Instanz und die Anzahl ' +
        'der Rollen eingibst, mit denen du die Instanz spielen möchtest.',
    },
    character: {
      heading: 'Charakter Informationen',
      text:
        'Suche nach einem Charakter anhand von Name und Server/Plattform, um ' +
        'Informationen wie Fertigkeitspunkte, Kampfwertung und PvP-Kampfwertung zu erhalten.',
    },
    league: {
      heading: 'Liga Informationen',
      text:
        'Suche nach einer Liga anhand von Name und Server/Plattform, um Informationen ' +
        'wie durchschnittliche Fertigkeitspunkte, durchschnittliche Kampfwertung, ' +
        'durchschnittliche PvP-Kampfwertung sowie eine Liste der Ligamitglieder zu erhalten.',
    },
    rankings: {
      heading: 'Ranglisten',
      text:
        'Rufe eine Rangliste der besten Charaktere/Ligen aller Server ab - oder gefiltert ' +
        'nach einem einzelnen Server bzw. einer Plattform - sortiert nach wählbaren Kriterien.',
    },
  },
};

export default de;
