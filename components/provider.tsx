'use client';

import SearchDialog from '@/components/search';
import {
  i18nUI,
  localePreferenceCookie,
  type Locale,
} from '@/lib/i18n';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export function Provider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const provider = i18nUI.provider(locale);

  return (
    <RootProvider
      search={{ SearchDialog }}
      i18n={{
        ...provider,
        onLocaleChange(nextLocale) {
          document.cookie = `${localePreferenceCookie}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
          window.localStorage.setItem(localePreferenceCookie, nextLocale);

          const pathWithoutLocale =
            pathname.replace(/^\/(?:en|zh_tw)(?=\/|$)/, '') || '/';
          const nextPath =
            pathWithoutLocale === '/'
              ? `/${nextLocale}`
              : `/${nextLocale}${pathWithoutLocale}`;

          router.push(nextPath);
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
