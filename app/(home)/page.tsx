import type { Metadata } from 'next';
import { ChunkReviveLanding } from '@/components/chunkrevive-landing';

export const metadata: Metadata = {
  title: 'ChunkRevive',
  description: '為 Paper 與 Folia 伺服器提供可控、可追蹤的區塊重生工作流程。',
};

export default function HomePage() {
  return <ChunkReviveLanding basePath="/zh_tw" />;
}
