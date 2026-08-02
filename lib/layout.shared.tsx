import type { Locale } from '@/lib/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(locale: Locale = 'en'): BaseLayoutProps {
  return {
    nav: {
      title: 'FreshChromatic',
      url: `/${locale}`,
    },
    githubUrl: 'https://github.com/FreshChromatic/docs',
  };
}
