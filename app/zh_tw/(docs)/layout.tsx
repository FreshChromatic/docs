import { Provider } from '@/components/provider';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { siteMetadata } from '@/lib/metadata';
import '../../global.css';

export const metadata = siteMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider locale="zh_tw">
          <DocsLayout
            tree={source.getPageTree('zh_tw')}
            tabs={{}}
            tabMode="auto"
            {...baseOptions()}
          >
            {children}
          </DocsLayout>
        </Provider>
      </body>
    </html>
  );
}
