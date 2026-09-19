import type en from '@/features/privacy/locales/en';

const de: typeof en = {
  privacy: {
    pageTitle: 'Datenschutzerklärung - DCUOBot',
    pageDescription:
      'Erfahre, welche Daten DCUOBot verarbeitet, warum wir sie verarbeiten und welche Rechte du gemäß der DSGVO hast.',
    heading: 'Datenschutzerklärung',
    subheading: 'Letzte Aktualisierung: 19. September 2026',

    introduction: {
      title: 'Einleitung',
      body: '„DCUOBot“ („wir“, „uns“, „unser“) betreibt diese Website sowie den DCUOBot Discord-Bot, die Charakter-, Liga- und Serverstatistiken für DC Universe Online bereitstellen. Diese Datenschutzerklärung erläutert, welche Daten wir bei der Nutzung dieser Website verarbeiten, warum wir sie verarbeiten und welche Rechte dir gemäß der Datenschutz-Grundverordnung (DSGVO) zustehen.',
      scope:
        'Diese Erklärung gilt ausschließlich für diese Website. Sobald du den Bot zu einem Discord-Server einlädst, unterliegt dessen Betrieb zusätzlich der Datenschutzerklärung und den Nutzungsbedingungen von Discord.',
    },

    controller: {
      title: 'Verantwortlicher',
      body: 'Verantwortlicher für die in dieser Erklärung beschriebene Verarbeitung deiner Daten ist:',
      nameLabel: 'Name:',
      name: 'DCUOBot',
      contactLabel: 'E-Mail:',
      email: 'contact@mtilabs.dev',
      discord:
        'Du kannst uns auch über unseren offiziellen Discord-Server erreichen, der in der Fußzeile dieser Website verlinkt ist.',
    },

    dataWeCollect: {
      title: 'Welche Daten wir verarbeiten',
      intro:
        'Wir beschränken die von uns verarbeiteten Daten auf das für den Betrieb dieser Website und ihrer Funktionen notwendige Maß.',

      serverLogs: {
        title: 'Automatisch erfasste Informationen',
        body: 'Beim Besuch dieser Website erfasst unsere Hosting-Infrastruktur automatisch technische Informationen zu jeder Anfrage:',
        items: {
          ipAddress: 'Deine IP-Adresse',
          browser: 'Browsertyp und -version sowie Betriebssystem',
          referrer: 'Die verweisende Seite sowie Datum und Uhrzeit der Anfrage',
          requestedPage: 'Die angeforderte Seite bzw. Ressource',
        },
        purpose:
          'Diese Informationen sind erforderlich, um die Website bereitzustellen, sie sicher und stabil zu betreiben sowie Missbrauch zu erkennen und zu verhindern. Wir verknüpfen diese Daten nicht mit anderen Quellen, um dich persönlich zu identifizieren.',
        legalBasis:
          'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und funktionsfähigen Website).',
      },

      searchQueries: {
        title: 'Such- und Abfragefunktionen',
        body: 'Diese Website ermöglicht es dir, Charaktere, Ligen, Ranglisten und den Serverstatus von DC Universe Online abzufragen. Die von dir eingegebenen Suchbegriffe (z. B. ein Charakter- oder Liganame) sowie der ausgewählte Spielserver werden an unsere API gesendet, um die passenden, öffentlichen Spieldaten abzurufen. Diese Anfragen werden wie oben beschrieben protokolliert und keinem Konto zugeordnet, da diese Website keine Registrierung oder Anmeldung erfordert.',
        legalBasis:
          'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Erfüllung der von dir angeforderten Leistung) sowie Art. 6 Abs. 1 lit. f DSGVO.',
      },

      localStorage: {
        title: 'Lokal gespeicherte Einstellungen',
        body: 'Diese Website speichert eine kleine Menge an Daten direkt in deinem Browser, um deine Einstellungen zwischen Besuchen zu merken:',
        items: {
          theme:
            'Dein gewähltes Farbschema (hell, dunkel oder System), gespeichert unter dem Schlüssel „dcuobot-ui-theme“',
          language: 'Deine gewählte Sprache der Benutzeroberfläche',
        },
        purpose:
          'Diese Daten verbleiben auf deinem Gerät, werden niemals an uns übertragen und dienen ausschließlich der einfacheren Nutzung der Website. Da dies für diesen Zweck unbedingt erforderlich ist, ist kein Cookie-Banner notwendig; du kannst diese Daten jederzeit über deine Browsereinstellungen löschen.',
      },

      botInvite: {
        title: 'Einladen des Discord-Bots',
        body: 'Der Button „Bot einladen“ leitet dich zur Autorisierungsseite von Discord weiter, damit du – oder die Person, die den Ziel-Server verwaltet – der DCUOBot-Anwendung die benötigten Berechtigungen erteilen kann. Wir erhalten durch diese Weiterleitung keine personenbezogenen Daten – die Autorisierung selbst wird vollständig von Discord durchgeführt.',
      },

      botUsage: {
        title: 'Nutzung des Discord-Bots',
        body: 'Sobald der Bot einem Server hinzugefügt wurde, sendet Discord uns bei Verwendung seiner Slash-Befehle (z. B. /character, /league, /statistics) die Befehlseingabe sowie die zur Ausführung und Beantwortung notwendigen technischen Kennungen, wie deine Discord-Benutzer-ID sowie die Server- und Kanal-ID. Wir nutzen diese Daten ausschließlich zur Verarbeitung des Befehls und zur Rückgabe eines Ergebnisses. Wenn du einen Server verwaltest, kannst du den Bot jederzeit entfernen, wodurch jede weitere Verarbeitung endet.',
        legalBasis: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO.',
      },
    },

    cookies: {
      title: 'Cookies',
      body: 'Wir verwenden keine Tracking-, Werbe- oder Analyse-Cookies. Die einzige clientseitige Speicherung, die wir nutzen, ist die oben beschriebene, unbedingt erforderliche funktionale Speicherung. Ein Cookie-Banner wird nicht angezeigt, da wir keine nicht essenziellen Cookies setzen.',
    },

    thirdParties: {
      title: 'Empfänger und Dritte',
      intro:
        'Wir verkaufen deine Daten nicht und geben sie nicht an Werbetreibende weiter. Daten können verarbeitet werden durch:',
      items: {
        hosting:
          'Unsere Hosting- und Infrastrukturanbieter, die Server-Protokolldaten in unserem Auftrag ausschließlich zum Betrieb dieser Website verarbeiten.',
        discord:
          'Discord Inc. / Discord Netherlands B.V., wenn du den Link „Bot einladen“ nutzt oder mit dem Bot interagierst, wie oben beschrieben.',
      },
      outro:
        'Sofern ein Dienstleister Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet, arbeiten wir nur mit Anbietern zusammen, die angemessene Garantien bieten, wie beispielsweise die EU-Standardvertragsklauseln.',
    },

    retention: {
      title: 'Speicherdauer',
      items: {
        logs: 'Server-Protokolldaten werden nur für den kurzen, zu Sicherheits- und Fehleranalysezwecken erforderlichen Zeitraum gespeichert und anschließend gelöscht oder anonymisiert.',
        localStorage:
          'Lokal gespeicherte Einstellungen verbleiben auf deinem Gerät, bis du deinen Browserspeicher löschst.',
        bot: 'Daten im Zusammenhang mit Bot-Befehlen werden nur vorübergehend zur Erstellung einer Antwort verarbeitet und nicht dauerhaft gespeichert, außer soweit dies zur Missbrauchsprävention und Betriebssicherheit erforderlich ist.',
      },
    },

    security: {
      title: 'Datensicherheit',
      body: 'Wir setzen angemessene technische und organisatorische Maßnahmen ein, wie beispielsweise verschlüsselte Verbindungen über HTTPS/TLS, um die in dieser Erklärung beschriebenen Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu schützen. Keine Übertragungs- oder Speichermethode ist vollständig sicher, wir setzen uns jedoch nach besten Möglichkeiten für den Schutz deiner Daten ein.',
    },

    rights: {
      title: 'Deine Rechte gemäß der DSGVO',
      intro:
        'Wenn du dich im Europäischen Wirtschaftsraum oder einer anderen Rechtsordnung mit gleichwertigen Rechten befindest, hast du das Recht auf:',
      items: {
        access:
          'Auskunft über die von uns über dich gespeicherten personenbezogenen Daten (Art. 15 DSGVO)',
        rectification: 'Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
        erasure: 'Löschung deiner Daten, das „Recht auf Vergessenwerden“ (Art. 17 DSGVO)',
        restriction: 'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
        portability:
          'Erhalt deiner Daten in einem übertragbaren, maschinenlesbaren Format (Art. 20 DSGVO)',
        objection:
          'Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Art. 21 DSGVO)',
        complaint:
          'Beschwerde bei einer Aufsichtsbehörde in deinem Wohnsitzstaat, deinem Beschäftigungsstaat oder dem Ort des mutmaßlichen Verstoßes',
      },
      outro: 'Um eines dieser Rechte auszuüben, kontaktiere uns unter contact@mtilabs.dev.',
    },

    childrenPrivacy: {
      title: 'Datenschutz für Kinder',
      body: 'Diese Website richtet sich nicht an Kinder unter 16 Jahren, und wir erfassen nicht wissentlich personenbezogene Daten von Kindern. Solltest du der Ansicht sein, dass ein Kind uns personenbezogene Daten übermittelt hat, kontaktiere uns bitte, damit wir diese entfernen können.',
    },

    changes: {
      title: 'Änderungen dieser Erklärung',
      body: 'Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, beispielsweise um Änderungen dieser Website oder der geltenden Rechtslage abzubilden. Das Datum am Anfang dieser Seite zeigt an, wann sie zuletzt überarbeitet wurde. Wir empfehlen dir, diese Seite regelmäßig zu überprüfen.',
    },

    contact: {
      title: 'Kontakt',
      body: 'Fragen zu dieser Datenschutzerklärung oder zum Umgang mit deinen Daten?',
      emailLabel: 'E-Mail:',
      email: 'contact@mtilabs.dev',
      discord: 'Du kannst uns auch über unseren Discord-Server erreichen.',
    },
  },
};

export default de;
