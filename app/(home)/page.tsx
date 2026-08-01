import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'ChunkRevive',
  description: '為 Paper 與 Folia 伺服器提供可控、可追蹤的區塊重生工作流程。',
};

export default function HomePage() {
  redirect('/zh_tw/chunkrevive/getting-started');
}
