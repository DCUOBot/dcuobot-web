const en = {
  commands: {
    heading: 'Commands',
    subheading: 'List of Discord bot commands and their usage.',
    command: 'Command:',
    description: 'Description:',
    arguments: 'Arguments:',
    commands: {
      character: {
        description:
          'Fetches basic information of a character such as skill points, combat rating, pvp ' +
          'combat rating and more.',
        args: {
          server: 'us, eu, switchus, switcheu, xbox',
          name: '<character name>',
        },
      },
      statistics: {
        description:
          'Fetches precise stats of a character such as health, power, might, precision and more.',
        args: {
          server: 'us, eu, switchus, switcheu, xbox',
          name: '<character name>',
        },
      },
      league: {
        description:
          'Fetches basic information of a league such as average skill points, a list of the ' +
          'first ten members and more.',
        args: {
          server: 'us, eu, switchus, switcheu, xbox',
          name: '<league name>',
        },
      },
      topcharacters: {
        description:
          'Fetches a ranking of characters filtered by servers and sorted by selectable criteria.',
        args: {
          server: 'all, us, eu, switchus, switcheu, xbox',
          sortby:
            'sp, cr, pvpcr, health, power, might, precision, dominance, defense, vitalization, ' +
            'restoration',
        },
      },
      topleagues: {
        description:
          'Fetches a ranking of leagues filtered by servers and sorted by selectable criteria.',
        args: {
          server: 'all, us, eu, switchus, switcheu, xbox',
          sortby: 'avgsp, avgcr, avgpvpcr, members',
        },
      },
      servers: {
        description:
          'Fetches a list of all DC Universe Online game servers with their status and population.',
      },
      lfg: {
        description: 'Creates a LFG embed where people can sign up with specific roles.',
        args: {
          instance_name: '<instance name>',
          amount_of_tanks: '<amount of tanks (number)>',
          amount_of_healers: '<amount of healers (number)>',
          amount_of_controllers: '<amount of controllers (number)>',
          amount_of_dps: '<amount of dps (number)>',
        },
      },
    },
  },
};

export default en;
