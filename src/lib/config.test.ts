import { afterEach, describe, expect, it, vi } from 'vitest';

describe('config', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('defaults to the production census API when VITE_API_BASE_URL is unset', async () => {
    vi.resetModules();
    const { config } = await import('./config');

    expect(config.apiBaseUrl).toBe('https://dcuo.bot/api/v1/census');
    expect(config.apiDocsUrl).toBe('https://dcuo.bot/api/docs');
  });

  it('uses VITE_API_BASE_URL when set, and derives apiDocsUrl from its origin', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8080/api/v1/census');
    vi.resetModules();
    const { config } = await import('./config');

    expect(config.apiBaseUrl).toBe('http://localhost:8080/api/v1/census');
    expect(config.apiDocsUrl).toBe('http://localhost:8080/api/docs');
  });
});
