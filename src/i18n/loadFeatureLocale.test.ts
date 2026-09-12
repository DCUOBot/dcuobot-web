import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadFeatureLocale } from './loadFeatureLocale';

const { mockI18n } = vi.hoisted(() => ({
  mockI18n: {
    language: 'en',
    options: { fallbackLng: 'en' as string | undefined },
    addResourceBundle: vi.fn(),
  },
}));

vi.mock('@/i18n', () => ({ default: mockI18n }));

describe('loadFeatureLocale', () => {
  beforeEach(() => {
    mockI18n.language = 'en';
    mockI18n.options.fallbackLng = 'en';
    mockI18n.addResourceBundle.mockClear();
  });

  it('loads and registers the loader matching the current language', async () => {
    const en = { hello: 'world' };
    const enLoader = vi.fn().mockResolvedValue({ default: en });
    const deLoader = vi.fn().mockResolvedValue({ default: { hello: 'welt' } });

    await loadFeatureLocale('feature', { en: enLoader, de: deLoader });

    expect(enLoader).toHaveBeenCalledTimes(1);
    expect(deLoader).not.toHaveBeenCalled();
    expect(mockI18n.addResourceBundle).toHaveBeenCalledWith('en', 'feature', en);
  });

  it('normalizes region-specific language codes to the base language', async () => {
    mockI18n.language = 'de-DE';
    const de = { hello: 'welt' };
    const loaders = { en: vi.fn(), de: vi.fn().mockResolvedValue({ default: de }) };

    await loadFeatureLocale('feature', loaders);

    expect(loaders.de).toHaveBeenCalledTimes(1);
    expect(loaders.en).not.toHaveBeenCalled();
    expect(mockI18n.addResourceBundle).toHaveBeenCalledWith('de', 'feature', de);
  });

  it('falls back to the fallback language when there is no loader for the current language', async () => {
    mockI18n.language = 'fr';
    mockI18n.options.fallbackLng = 'en';
    const en = { hello: 'world' };
    const loaders = { en: vi.fn().mockResolvedValue({ default: en }) };

    await loadFeatureLocale('feature', loaders);

    expect(loaders.en).toHaveBeenCalledTimes(1);
    expect(mockI18n.addResourceBundle).toHaveBeenCalledWith('en', 'feature', en);
  });

  it('uses "en" as the ultimate fallback when fallbackLng is unset', async () => {
    mockI18n.language = 'fr';
    mockI18n.options.fallbackLng = undefined;
    const en = { hello: 'world' };
    const loaders = { en: vi.fn().mockResolvedValue({ default: en }) };

    await loadFeatureLocale('feature', loaders);

    expect(mockI18n.addResourceBundle).toHaveBeenCalledWith('en', 'feature', en);
  });

  it('does nothing when neither the current language nor the fallback language has a loader', async () => {
    mockI18n.language = 'fr';
    mockI18n.options.fallbackLng = 'en';
    const loaders = { de: vi.fn() };

    await loadFeatureLocale('feature', loaders);

    expect(loaders.de).not.toHaveBeenCalled();
    expect(mockI18n.addResourceBundle).not.toHaveBeenCalled();
  });
});
