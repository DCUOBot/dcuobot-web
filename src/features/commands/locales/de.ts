import type en from '@/features/commands/locales/en';

const de: typeof en = {
  commands: {
    heading: 'Befehle',
    subheading: 'Liste der Befehle des Discord-Bots und deren Verwendung.',
    command: 'Befehl:',
    description: 'Beschreibung:',
    arguments: 'Argumente:',
    commands: {
      character: {
        description:
          'Ruft grundlegende Informationen zu einem Charakter ab, wie z.B. Fertigkeitspunkte, ' +
          'Kampfwertung, PvP-Kampfwertung und mehr.',
        args: {
          server: 'us, eu, switchus, switcheu, xbox',
          name: '<Charaktername>',
        },
      },
      statistics: {
        description:
          'Ruft präzise Werte eines Charakters ab, wie z.B. Gesundheit, Kraft, Macht, ' +
          'Präzision und mehr.',
        args: {
          server: 'us, eu, switchus, switcheu, xbox',
          name: '<Charaktername>',
        },
      },
      league: {
        description:
          'Ruft grundlegende Informationen zu einer Liga ab, wie z.B. die durchschnittlichen ' +
          'Fertigkeitspunkte, eine Liste der ersten zehn Mitglieder und mehr.',
        args: {
          server: 'us, eu, switchus, switcheu, xbox',
          name: '<Liganame>',
        },
      },
      topcharacters: {
        description:
          'Ruft eine Rangliste von Charakteren ab, gefiltert nach Servern und sortiert nach ' +
          'wählbaren Kriterien.',
        args: {
          server: 'all, us, eu, switchus, switcheu, xbox',
          sortby:
            'sp, cr, pvpcr, health, power, might, precision, dominance, defense, vitalization, ' +
            'restoration',
        },
      },
      topleagues: {
        description:
          'Ruft eine Rangliste von Ligen ab, gefiltert nach Servern und sortiert nach ' +
          'wählbaren Kriterien.',
        args: {
          server: 'all, us, eu, switchus, switcheu, xbox',
          sortby: 'avgsp, avgcr, avgpvpcr, members',
        },
      },
      servers: {
        description:
          'Ruft eine Liste aller DC Universe Online-Spielserver samt deren Status und ' +
          'Spielerzahl ab.',
      },
      lfg: {
        description:
          'Erstellt ein LFG-Embed, bei dem sich Personen mit bestimmten Rollen ' +
          'eintragen können.',
        args: {
          instance_name: '<Instanzname>',
          amount_of_tanks: '<Anzahl an Tanks (Zahl)>',
          amount_of_healers: '<Anzahl an Heilern (Zahl)>',
          amount_of_controllers: '<Anzahl an Controllern (Zahl)>',
          amount_of_dps: '<Anzahl an DPS (Zahl)>',
        },
      },
    },
  },
};

export default de;
