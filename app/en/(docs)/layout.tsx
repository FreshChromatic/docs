import { Provider } from '@/components/provider';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { siteMetadata } from '@/lib/metadata';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import '../../global.css';

export const metadata = siteMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider locale="en">
          <DocsLayout
            tree={source.getPageTree('en')}
            tabs={{}}
            tabMode="auto"
            {...baseOptions('en')}
          >
            {children}
          </DocsLayout>
        </Provider>
      </body>
    </html>
  );
}
