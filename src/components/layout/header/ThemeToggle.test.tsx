import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '@/components/ThemeProvider';
import '@/i18n';

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function renderThemeToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
    mockMatchMedia(false);
  });

  it('renders a button with an accessible label', () => {
    renderThemeToggle();

    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
  });

  it('opens a menu with light, dark and system options', async () => {
    const user = userEvent.setup();
    renderThemeToggle();

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(await screen.findByRole('menuitem', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'System' })).toBeInTheDocument();
  });

  it('sets the theme to dark when the Dark option is selected', async () => {
    const user = userEvent.setup();
    renderThemeToggle();

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Dark' }));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('dcuobot-ui-theme')).toBe('dark');
  });

  it('sets the theme to light when the Light option is selected', async () => {
    const user = userEvent.setup();
    renderThemeToggle();

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Light' }));

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('dcuobot-ui-theme')).toBe('light');
  });

  it('sets the theme to system when the System option is selected', async () => {
    const user = userEvent.setup();
    renderThemeToggle();

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
    await user.click(await screen.findByRole('menuitem', { name: 'System' }));

    expect(localStorage.getItem('dcuobot-ui-theme')).toBe('system');
  });
});
