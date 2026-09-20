const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://dcuo.bot/api/v1/census';

export const config = {
  apiBaseUrl,
  apiDocsUrl: `${new URL(apiBaseUrl).origin}/api/docs`,
  botInvite: {
    baseUrl: 'https://discord.com/api/oauth2/authorize',
    clientId: '675436844758073364',
    permissions: '2147747840',
    scope: 'bot applications.commands',
  },
} as const;
