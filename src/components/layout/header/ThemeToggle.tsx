import { useTheme } from '@/components/ThemeProvider';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenuTrigger>
      <TooltipTrigger>
        <Button
          variant="outline"
          size="icon"
          aria-label={t('header.themeToggle.ariaLabel')}
        >
          <Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
        <Tooltip>{t('header.themeToggle.tooltip')}</Tooltip>
      </TooltipTrigger>
      <DropdownMenu placement="bottom end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {t('header.themeToggle.light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {t('header.themeToggle.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {t('header.themeToggle.system')}
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuTrigger>
  );
}
