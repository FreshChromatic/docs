import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
