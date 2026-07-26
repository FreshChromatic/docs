import { Provider } from '@/components/provider';
import { baseOptions } from '@/lib/layout.shared';
import { siteMetadata } from '@/lib/metadata';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import '../../global.css';

export const metadata = siteMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider locale="zh_tw">
          <HomeLayout {...baseOptions('zh_tw')}>{children}</HomeLayout>
        </Provider>
      </body>
    </html>
  );
}
