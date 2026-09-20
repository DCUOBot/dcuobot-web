import { config } from '@/lib/config';

export const buildInviteUrl = (): URL => {
  const url = new URL(config.botInvite.baseUrl);
  url.searchParams.set('client_id', config.botInvite.clientId);
  url.searchParams.set('permissions', config.botInvite.permissions);
  url.searchParams.set('scope', config.botInvite.scope);

  return url;
};
