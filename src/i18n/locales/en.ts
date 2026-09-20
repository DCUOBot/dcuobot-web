const en = {
  common: {
    error: 'An error occurred, please try again later.',
    loading: 'Loading…',
    unexpectedError: {
      title: 'Something went wrong',
      body: 'An unexpected error occurred. Try reloading the page, or head back to the home page.',
      home: 'Go home',
      reload: 'Reload page',
    },
    notFound: {
      title: 'Page not found - DCUOBot',
      body: 'The page you are looking for does not exist or may have been moved.',
      home: 'Go home',
    },
  },
  header: {
    appName: 'DCUOBot',
    logoAlt: 'DCUOBot Logo',
    addBot: 'Add DCUOBot',
    search: {
      type: {
        placeholder: 'Select a type',
        ariaLabel: 'Type',
        values: {
          character: 'Character',
          league: 'League',
        },
      },
      server: {
        placeholder: 'Select a server',
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
        placeholder: 'Lookup character or league...',
        ariaLabel: 'Search query',
      },
      submitAriaLabel: 'Search',
    },
    serverStatus: 'Server Status',
    rankings: {
      label: 'Rankings',
      characters: 'Characters Ranking',
      leagues: 'Leagues Ranking',
    },
    commands: 'Commands',
    menu: {
      ariaLabel: 'Toggle menu',
      label: 'Menu',
    },
    themeToggle: {
      ariaLabel: 'Toggle theme',
      tooltip: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
  },
  footer: {
    copyright: 'DCUOBot {{currentYear}}. All rights reserved.',
    disclaimer1:
      'This app is not affiliated with, endorsed by, or connected to DC Universe Online.',
    disclaimer2: 'All trademarks are the property of their respective owners.',
    privacy: 'Privacy',
    discord: 'Discord',
    languageAriaLabel: 'Select language',
  },
};

export default en;
