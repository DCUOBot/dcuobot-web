import logo from '@/assets/branding/logo-32.webp';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { RouterLinkButton } from '@/components/ui/router-link-button';
import HeaderSearch from '@/components/layout/header/HeaderSearch';
import { DropdownMenuItemLink } from '@/components/ui/dropdown-menu-item-link';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';

type NavLink = {
  i18n: string;
  url?: string;
  children?: NavLink[];
};

const navLinks: NavLink[] = [
  {
    i18n: 'header.rankings.label',
    children: [
      {
        i18n: 'header.rankings.characters',
        url: '/characters/ranking',
      },
      {
        i18n: 'header.rankings.leagues',
        url: '/leagues/ranking',
      },
    ],
  },
  {
    i18n: 'header.serverStatus',
    url: '/server-status',
  },
  {
    i18n: 'header.commands',
    url: '/commands',
  },
];

export default function Header() {
  const { t } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-3 lg:h-16 lg:flex-nowrap lg:py-0">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold"
        >
          <div className="relative">
            <img
              src={logo}
              alt={t('header.logoAlt')}
              width="32"
              height="32"
              draggable="false"
              className="rounded-full select-none drag-none"
            />
            <div className="absolute top-0 left-0 size-full z-1 bg-transparent"></div>
          </div>
          <span>{t('header.appName')}</span>
        </Link>

        <div className="order-4 w-full lg:order-2 lg:w-auto lg:flex-1">
          <HeaderSearch />
        </div>

        <nav className="order-3 hidden items-center text-sm lg:flex">
          {navLinks.map((link, index) =>
            link.url ? (
              <RouterLinkButton
                key={index}
                to={link.url}
                variant="ghost"
              >
                {t(link.i18n)}
              </RouterLinkButton>
            ) : (
              <DropdownMenuTrigger key={index}>
                <Button
                  variant="ghost"
                  className="gap-1"
                >
                  {t(link.i18n)}
                  <ChevronDown className="size-4 opacity-60" />
                </Button>
                <DropdownMenu placement="bottom start">
                  {link.children?.map((child, childIndex) => (
                    <DropdownMenuItemLink
                      key={childIndex}
                      to={child.url}
                      className="cursor-pointer"
                    >
                      {t(child.i18n)}
                    </DropdownMenuItemLink>
                  ))}
                </DropdownMenu>
              </DropdownMenuTrigger>
            ),
          )}
        </nav>

        <Button className="order-5 hidden lg:inline-flex">{t('header.addBot')}</Button>

        <Drawer
          swipeDirection="right"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <DrawerTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="order-2 ml-auto lg:hidden"
                aria-label={t('header.menu.ariaLabel')}
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('header.menu.label')}</DrawerTitle>
            </DrawerHeader>
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link, index) =>
                link.url ? (
                  <RouterLinkButton
                    key={index}
                    to={link.url}
                    variant="ghost"
                    className="justify-start"
                    onClick={closeMobileMenu}
                  >
                    {t(link.i18n)}
                  </RouterLinkButton>
                ) : (
                  <div key={index}>
                    <span className="px-3 py-2 text-sm font-medium text-muted-foreground">
                      {t(link.i18n)}
                    </span>
                    <div className="flex flex-col gap-1 pl-3">
                      {link.children?.map((child, childIndex) => (
                        <RouterLinkButton
                          key={childIndex}
                          to={child.url}
                          variant="ghost"
                          className="justify-start"
                          onClick={closeMobileMenu}
                        >
                          {t(child.i18n)}
                        </RouterLinkButton>
                      ))}
                    </div>
                  </div>
                ),
              )}

              <Button
                className="mt-4"
                onClick={closeMobileMenu}
              >
                {t('header.addBot')}
              </Button>
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
