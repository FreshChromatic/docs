import { LandingPage } from '@/components/landing-page';

export function ChunkReviveLanding({ basePath = '' }: { basePath?: string }) {
  return (
    <LandingPage
      eyebrow="FreshChromatic"
      title="ChunkRevive"
      description="Minecraft 世界區塊重生與管理，為 Paper 與 Folia 伺服器提供可控、可追蹤的工作流程。"
      primary={{ label: '開始閱讀', href: `${basePath}/chunkrevive` }}
      secondary={{ label: '快速工作流程', href: `${basePath}/chunkrevive/guides` }}
      features={[
        {
          title: '精準重生',
          description: '處理單一區塊、已標記批次、結構群組或生態域範圍。',
        },
        {
          title: '安全控制',
          description: '批次確認、世界存取範圍、結構保護與記憶體安全限制。',
        },
        {
          title: '維運可見性',
          description: '透過狀態、佇列、調校建議與資料庫持久化掌握操作進度。',
        },
      ]}
    />
  );
}
