import type { Metadata } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://freshchromatic.github.io/docs/'),
  title: {
    default: 'FreshChromatic 文件',
    template: '%s | FreshChromatic',
  },
  description: 'FreshChromatic 專案與 Minecraft 外掛文件。',
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: 'ChunkRevive | FreshChromatic',
    description: 'Minecraft 世界區塊重生與管理',
    type: 'website',
    url: 'https://freshchromatic.github.io/docs/',
    images: [
      {
        url: 'https://freshchromatic.github.io/docs/og.png',
        width: 1733,
        height: 910,
        alt: 'ChunkRevive — Minecraft 世界區塊重生與管理',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChunkRevive | FreshChromatic',
    description: 'Minecraft 世界區塊重生與管理',
    images: ['https://freshchromatic.github.io/docs/og.png'],
  },
};
