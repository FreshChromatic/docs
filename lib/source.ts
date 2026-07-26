import { docs } from 'collections/server';
import { i18n } from '@/lib/i18n';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';

export const source = loader({
  baseUrl: '/',
  i18n,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
