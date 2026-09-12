import i18n from '@/i18n';

type LocaleLoader = () => Promise<{ default: Record<string, unknown> }>;

export async function loadFeatureLocale(
  namespace: string,
  loaders: Record<string, LocaleLoader>,
): Promise<void> {
  const lang = i18n.language.split('-')[0];
  const fallback = (i18n.options.fallbackLng as string) ?? 'en';
  const loader = loaders[lang] ?? loaders[fallback];

  if (!loader) {
    return;
  }

  const { default: translations } = await loader();
  const targetLang = lang in loaders ? lang : fallback;
  i18n.addResourceBundle(targetLang, namespace, translations);
}
