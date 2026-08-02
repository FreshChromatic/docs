import { LocaleRedirect } from '@/components/locale-redirect';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChunkRevive',
  description: 'Controlled, traceable chunk regeneration workflows for Paper and Folia servers.',
};

export default function HomePage() {
  return <LocaleRedirect />;
}
