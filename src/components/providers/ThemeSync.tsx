'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export function ThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme) {
      setCookie('theme', theme, {
        domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });
    }
  }, [theme]);

  return null;
}
