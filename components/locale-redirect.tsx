'use client';

import { isLocale, localePreferenceCookie, type Locale } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const defaultLocale: Locale = 'en';

export function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(localePreferenceCookie);
    const locale = savedLocale && isLocale(savedLocale) ? savedLocale : defaultLocale;

    router.replace(`/${locale}/chunkrevive/getting-started`);
  }, [router]);

  return null;
}
