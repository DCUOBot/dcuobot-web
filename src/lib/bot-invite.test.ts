import { describe, expect, it } from 'vitest';
import { buildInviteUrl } from './bot-invite';
import { config } from '@/lib/config';

describe('buildInviteUrl', () => {
  it('builds a Discord OAuth2 authorize URL with the bot invite parameters', () => {
    const url = buildInviteUrl();

    expect(url.origin + url.pathname).toBe(config.botInvite.baseUrl);
    expect(url.searchParams.get('client_id')).toBe(config.botInvite.clientId);
    expect(url.searchParams.get('permissions')).toBe(config.botInvite.permissions);
    expect(url.searchParams.get('scope')).toBe(config.botInvite.scope);
  });
});
