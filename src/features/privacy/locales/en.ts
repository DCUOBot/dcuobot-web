const en = {
  privacy: {
    pageTitle: 'Privacy Policy - DCUOBot',
    pageDescription:
      'Learn what data DCUOBot collects, why we process it, and your rights under the GDPR.',
    heading: 'Privacy Policy',
    subheading: 'Last updated: September 19, 2026',

    introduction: {
      title: 'Introduction',
      body: '"DCUOBot" ("we", "us", "our") operates this website and the DCUOBot Discord bot, which provide character, league and server statistics for DC Universe Online. This Privacy Policy explains what data we process when you use this website, why we process it, and the rights you have under the EU General Data Protection Regulation (GDPR).',
      scope:
        'This policy covers this website only. Once you invite the bot to a Discord server, its operation is also governed by Discord’s own Privacy Policy and Terms of Service.',
    },

    controller: {
      title: 'Data Controller',
      body: 'The controller responsible for the processing of your data described in this policy is:',
      nameLabel: 'Name:',
      name: 'DCUOBot',
      contactLabel: 'Email:',
      email: 'contact@mtilabs.dev',
      discord:
        'You can also reach us through our official Discord server, linked in the footer of this website.',
    },

    dataWeCollect: {
      title: 'What Data We Collect',
      intro:
        'We keep the data we process to the minimum necessary to operate this website and its features.',

      serverLogs: {
        title: 'Information collected automatically',
        body: 'When you visit this website, our hosting infrastructure automatically records technical information for every request:',
        items: {
          ipAddress: 'Your IP address',
          browser: 'Browser type and version, and operating system',
          referrer: 'The referring page, and the date and time of the request',
          requestedPage: 'The page or resource you requested',
        },
        purpose:
          'This information is necessary to deliver the website, keep it secure and stable, and detect and prevent abuse. We do not combine it with any other source to identify you personally.',
        legalBasis:
          'Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a secure and functional website).',
      },

      searchQueries: {
        title: 'Search and lookup features',
        body: 'This website lets you look up DC Universe Online characters, leagues, rankings and server status. The search terms you enter (e.g. a character or league name) and the game server you select are sent to our API to retrieve the matching public game data. These requests are logged the same way as described above and are not linked to any account, since this website does not require registration or login.',
        legalBasis:
          'Legal basis: Art. 6(1)(b) GDPR (performing the service you request) and Art. 6(1)(f) GDPR.',
      },

      localStorage: {
        title: 'Locally stored preferences',
        body: 'This website stores a small amount of data directly in your browser to remember your choices between visits:',
        items: {
          theme:
            'Your selected color theme (light, dark or system), stored under the key "dcuobot-ui-theme"',
          language: 'Your selected interface language',
        },
        purpose:
          'This data stays on your device, is never transmitted to us, and is only used to make the website easier to use. Because it is strictly necessary for this purpose, no consent banner is required, and you can clear it at any time through your browser settings.',
      },

      botInvite: {
        title: 'Inviting the Discord bot',
        body: 'The "Invite Bot" button redirects you to Discord’s own authorization page so you, or whoever administers the target server, can grant the DCUOBot application the permissions it needs. We do not receive any personal data from this redirect — the authorization itself is handled entirely by Discord.',
      },

      botUsage: {
        title: 'Using the Discord bot',
        body: 'Once the bot has been added to a server, using its slash commands (e.g. /character, /league, /statistics) causes Discord to send us the command input and the technical identifiers needed to execute it and reply, such as your Discord user ID and the server and channel ID. We use this only to process the command and return a result. If you administer a server, you can remove the bot at any time, which stops any further processing.',
        legalBasis: 'Legal basis: Art. 6(1)(b) GDPR and Art. 6(1)(f) GDPR.',
      },
    },

    cookies: {
      title: 'Cookies',
      body: 'We do not use tracking, advertising or analytics cookies. The only client-side storage we use is the strictly necessary, functional storage described above. No cookie consent banner is shown because we do not set any non-essential cookies.',
    },

    thirdParties: {
      title: 'Recipients and Third Parties',
      intro: 'We do not sell your data or share it with advertisers. Data may be processed by:',
      items: {
        hosting:
          'Our hosting and infrastructure providers, who process server log data on our behalf strictly to operate this website.',
        discord:
          'Discord Inc. / Discord Netherlands B.V., when you use the "Invite Bot" link or interact with the bot, as described above.',
      },
      outro:
        'Where a service provider processes data outside the European Economic Area, we only work with providers that offer appropriate safeguards, such as the EU Standard Contractual Clauses.',
    },

    retention: {
      title: 'How Long We Keep Data',
      items: {
        logs: 'Server log data is retained only for the short period necessary for security and troubleshooting, after which it is deleted or anonymized.',
        localStorage:
          'Locally stored preferences remain on your device until you clear your browser storage.',
        bot: 'Data related to bot commands is processed transiently to generate a response and is not permanently stored beyond what is required for abuse prevention and service reliability.',
      },
    },

    security: {
      title: 'Data Security',
      body: 'We use reasonable technical and organizational measures, such as encrypted connections via HTTPS/TLS, to protect the data described in this policy against loss, misuse and unauthorized access. No method of transmission or storage is completely secure, but we work to protect your data to the best of our ability.',
    },

    rights: {
      title: 'Your Rights Under the GDPR',
      intro:
        'If you are located in the European Economic Area, or another jurisdiction with equivalent rights, you have the right to:',
      items: {
        access: 'Access the personal data we hold about you (Art. 15 GDPR)',
        rectification: 'Request correction of inaccurate data (Art. 16 GDPR)',
        erasure: 'Request erasure of your data, the "right to be forgotten" (Art. 17 GDPR)',
        restriction: 'Request restriction of processing (Art. 18 GDPR)',
        portability: 'Receive your data in a portable, machine-readable format (Art. 20 GDPR)',
        objection: 'Object to processing based on legitimate interest (Art. 21 GDPR)',
        complaint:
          'Lodge a complaint with a supervisory authority in your country of residence, workplace, or the place of the alleged infringement',
      },
      outro: 'To exercise any of these rights, contact us at contact@mtilabs.dev.',
    },

    childrenPrivacy: {
      title: 'Children’s Privacy',
      body: 'This website is not directed at children under 16, and we do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us so we can remove it.',
    },

    changes: {
      title: 'Changes to This Policy',
      body: 'We may update this Privacy Policy from time to time, for example to reflect changes to this website or applicable law. The date at the top of this page indicates when it was last revised. We encourage you to review this page periodically.',
    },

    contact: {
      title: 'Contact',
      body: 'Questions about this Privacy Policy or how we handle your data?',
      emailLabel: 'Email:',
      email: 'contact@mtilabs.dev',
      discord: 'You can also reach us via our Discord server.',
    },
  },
};

export default en;
