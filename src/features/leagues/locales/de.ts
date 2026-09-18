import type en from '@/features/leagues/locales/en';

const de: typeof en = {
  league: {
    details: {
      imageAlt: 'Liga Bild',
      name: 'Name',
      server: 'Server',
      members: 'Mitglieder',
      avgSkillPoints: 'Durchschn. Fertigkeitspunkte',
      avgCombatRating: 'Durchschn. Kampfwertung',
      avgPvPCombatRating: 'Durchschn. PvP Kampfwertung',
      rank: 'Rang',
      characterName: 'Name',
      skillPoints: 'Fertigkeitspunkte',
      combatRating: 'Kampfwertung',
      pvpCombatRating: 'PvP Kampfwertung',
      tableLabel: 'Mitglieder',
      leader: 'Anführer',
      noMembers: 'Keine Mitglieder.',
      notFound: 'Liga nicht gefunden.',
    },
    ranking: {
      heading: 'Liga Rangliste',
      subheading: 'Rangliste der besten Ligen basierend auf ihren Werten.',
      servers: {
        all: 'Alle Server',
        usPcPs: 'USPC/PS',
        euPcPs: 'EUPC/PS',
        usSwitch: 'US Switch',
        euSwitch: 'EU Switch',
        xbox: 'Xbox',
        placeholder: 'Wähle einen Server',
        ariaLabel: 'Server',
      },
      sort: {
        memberCount: 'Mitgliederanzahl',
        averageSkillPoints: 'Durchschn. Fertigkeitspunkte',
        averageCombatRating: 'Durchschn. Kampfwertung',
        averagePvpCombatRating: 'Durchschn. PvP Kampfwertung',
        placeholder: 'Wähle ein Sortierkriterium',
        ariaLabel: 'Sortierkriterium',
      },
      refreshAriaLabel: 'Rangliste aktualisieren',
    },
  },
};

export default de;
