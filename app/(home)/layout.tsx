import { Provider } from '@/components/provider';
import { siteMetadata } from '@/lib/metadata';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import '../global.css';

export const metadata = siteMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider locale="en">
          <HomeLayout {...baseOptions('en')}>{children}</HomeLayout>
        </Provider>
      </body>
    </html>
  );
}
