import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Languages } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    nativeName: 'English',
  },
  {
    code: 'de',
    nativeName: 'Deutsch',
  },
] as const;

export default function LanguageSelect() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  return (
    <Select
      value={currentLang}
      onChange={(value) => {
        if (value !== null) {
          void i18n.changeLanguage(value.toString());
        }
      }}
      aria-label={t('footer.languageAriaLabel')}
    >
      <SelectTrigger className="gap-1.5 border-0 bg-transparent text-muted-foreground hover:text-foreground">
        <Languages className="size-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <SelectItem
              key={lang.code}
              id={lang.code}
            >
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
