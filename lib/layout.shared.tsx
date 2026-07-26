import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'FreshChromatic',
      url: '/',
    },
    githubUrl: 'https://github.com/FreshChromatic/docs',
  };
}
