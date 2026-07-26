# ChunkRevive 文檔重構設計與製作方案

> 狀態：待確認
>
> 本文件只定義新版文檔的資訊架構、內容規格與製作流程，暫不改寫正式 ChunkRevive 文檔。
>
> 產品正式名稱以 `paper-plugin.yml` 的 **ChunkRevive** 為準；「ChunkRegen」暫視為需求中的別稱，不直接用於頁面標題或路由。

## 1. 重構目標

新版文檔需要讓第一次接觸 ChunkRevive 的伺服器管理員，能在不閱讀完整命令表或設定表的情況下，安全完成第一次區塊重生；也要讓有經驗的管理員能快速查到命令、設定、相容性和故障處理資訊。

本次重構的成功結果是：

1. 新使用者能沿著「了解風險 → 安裝 → 驗證 → 備份 → 小範圍測試」完成首次操作。
2. 日常操作按「想完成的工作」整理，不要求讀者先理解外掛內部模組。
3. `regen`、`reset`、`delete`、`prune` 的差異與資料風險清楚可見。
4. 命令、設定、權限與相容性資料完整，且能追溯到程式碼中的真實行為。
5. 首頁、側邊欄、頁內導覽和跨頁連結形成一致的閱讀路徑。
6. 文檔能隨程式碼演進維護，而不是靠人工記憶補寫。

## 2. 現況盤點

### 2.1 現有優點

- 已有繁體中文內容，並使用 Fumadocs 的 `Cards`、提示框、程式碼區塊及 `meta.json` 導覽。
- 已涵蓋安裝、常見工作流、命令、部分設定、相容性、整合與開發者資訊。
- 已多次提醒備份、二次確認與 Residence 保護，安全意識正確。
- 文檔網站已有搜尋、目錄、靜態輸出和 i18n 基礎。

### 2.2 主要問題

| 問題 | 目前表現 | 對讀者的影響 |
| --- | --- | --- |
| 首頁缺少明確定位 | 安裝、概念、操作與參考資訊靠近排列 | 不容易快速判斷外掛用途、適用情境與第一步 |
| 教學與參考混在一起 | `usage/workflows` 同時解釋觀念、列步驟、補命令語法 | 初學者資訊過載，熟練者又難以快速查找 |
| 高風險操作曝光不足 | `reset`、`delete`、`prune` 與一般重生共同出現在命令集合中 | 使用者可能把不同資料破壞程度的操作視為同一類 |
| 設定頁不完整 | 目前只展示部分 `PluginConfig` 欄位 | 無法作為可信賴的設定參考 |
| 功能覆蓋不足 | 刪除工作恢復、結構偵測/保護/刷新、調校模式、世界存取策略等缺少獨立說明 | 重要功能只能從命令名稱推測 |
| 缺少故障處理入口 | 啟動失敗、版本不符、工作卡住、記憶體壓力、Residence 排除等未形成排查流程 | 問題發生時只能搜尋零散頁面 |
| 缺少頁面責任邊界 | 相同安全提醒和操作說明散落在多頁 | 後續容易出現重複、矛盾與過期內容 |
| 缺少維護規則 | 命令與設定未和來源檔案建立核對表 | 程式更新後文檔容易落後 |

### 2.3 程式碼中需要納入文檔的真實功能

新版內容必須至少覆蓋下列來源：

- `paper-plugin.yml`：Paper/Folia、Java、FreshLib、PacketEvents、Residence、權限。
- `ChunkReviveCommand.java`：`mark`、`unmark`、`regen`、`reset`、`delete`、`prune`、`status`、`server`、`tune`、`cancel`、`reload`、`struct`。
- `PluginConfig.java`：資料庫、重生佇列、記憶體安全、顯示、世界存取、掃描、生態域、安全確認、刪除工作、結構偵測/刷新/保護及實體例外。
- NMS adapters：實際支援的 Minecraft 版本。
- `messages-zh_tw.yml`：確認流程、限制條件、錯誤狀態與遊戲內術語。
- 測試：重置策略、空間批次、記憶體安全遷移、刪除工作恢復等行為界線。

## 3. 設計依據

### 3.1 採用的內容模型

使用 Diátaxis 的四類內容作為「頁面責任」判斷工具，而不是生硬建立四個空目錄：

- **教學**：帶新手完成第一次安全重生。
- **操作指南**：協助已有基本認識的管理員完成具體任務。
- **參考資料**：提供完整、精確、可快速查找的命令和設定資訊。
- **概念說明**：解釋重生、重置、刪除、區域檔案、結構保護與效能模型。

每一頁只設定一個主要意圖。需要背景知識時以短提示和連結導向概念頁；需要完整參數時連到參考頁。

### 3.2 參考網站中採用的做法

| 來源 | 採用做法 | 在 ChunkRevive 的落地方式 |
| --- | --- | --- |
| Fumadocs | 用分隔標題、landing page、Cards、Callout、Steps、Accordion 組織大量內容 | 側邊欄按學習階段分組；每個章節有入口頁；操作頁使用步驟和警告元件 |
| Docker Docs | 首頁清楚區分 Get started、Guides、Manuals、Reference | ChunkRevive 首頁直接提供「首次使用、常見任務、完整參考、疑難排解」入口 |
| Stripe Docs | 先按使用案例導向，再提供產品/技術分類 | 先問使用者「要重生目前區塊、整批資源世界、特定生態域，還是清理磁碟」 |
| Cloudflare Docs | 提供 learning paths、use cases、reference 並維持產品分組 | 建立安全入門路徑，同時保留依功能查閱的操作指南 |
| GitHub Docs | 以使用者旅程和任務命名，首頁顯示熱門入口 | 標題使用「重生一個區塊」「批次重生已標記區塊」，避免只寫抽象模組名 |
| Diátaxis | 分離學習、任務、查詢與理解的內容 | 避免在命令表內插入長篇教學，也避免新手教學塞入全部設定欄位 |

參考連結：

- [Fumadocs 官方文檔](https://www.fumadocs.dev/docs)
- [Fumadocs 教學原始碼](https://github.com/fuma-nama/fumadocs/tree/dev/apps/docs/content/docs)
- [Docker Docs](https://docs.docker.com/)
- [Stripe Docs](https://docs.stripe.com/)
- [Cloudflare Developer Docs](https://developers.cloudflare.com/)
- [GitHub Docs](https://docs.github.com/)
- [Diátaxis](https://diataxis.fr/)

## 4. 目標讀者與主要任務

### 4.1 主要讀者

1. **首次安裝者**：知道 Paper 外掛安裝方式，但不了解 ChunkRevive 的資料風險。
2. **日常管理員**：需要標記、掃描、重生資源世界或特定生態域。
3. **進階維運者**：需要大量重置、刪除、region 修剪、效能調校和工作恢復。
4. **整合/開發者**：需要了解 Residence、PacketEvents、權限、自動化邊界與目前沒有公開 Java API 的限制。

### 4.2 優先支援的使用者問題

- ChunkRevive 是做什麼的？會不會刪除玩家建築？
- 我的 Paper/Minecraft/Java 版本能不能用？
- 如何安全完成第一次區塊重生？
- `regen`、`reset`、`delete`、`prune` 到底有什麼差別？
- 如何只處理已生成、特定範圍或特定生態域的區塊？
- 如何保護 Residence 領地和已偵測結構？
- 如何查看、取消或恢復長時間工作？
- 伺服器卡頓或記憶體不足時要調哪些設定？
- 每個命令、參數、權限、設定鍵的完整資料在哪裡？

## 5. 建議資訊架構

以下目錄取代目前偏扁平的 `usage / config / compatibility / integration` 排列。括號中的英文為建議檔名；顯示標題維持繁體中文。

```text
chunkrevive/
├─ index.mdx                         ChunkRevive
├─ getting-started/
│  ├─ index.mdx                     開始使用
│  ├─ before-you-install.mdx        安裝前須知
│  ├─ installation.mdx              安裝與首次啟動
│  ├─ first-regeneration.mdx        完成第一次安全重生
│  └─ upgrade.mdx                   升級與遷移
├─ guides/
│  ├─ index.mdx                     操作指南
│  ├─ mark-chunks.mdx               選取與標記區塊
│  ├─ regenerate-chunks.mdx         重生單一或批次區塊
│  ├─ regenerate-biome.mdx          重生特定生態域
│  ├─ protect-structures.mdx         偵測、保護與刷新結構
│  ├─ reset-world-data.mdx          依策略重置世界資料
│  ├─ delete-and-prune.mdx          刪除區塊與修剪 Region
│  ├─ monitor-and-cancel.mdx        監看、取消與恢復工作
│  ├─ tune-performance.mdx          產生並套用效能調校
│  └─ production-checklist.mdx      正式環境操作清單
├─ concepts/
│  ├─ index.mdx                     核心概念
│  ├─ operation-model.mdx           Regen、Reset、Delete、Prune
│  ├─ selection-model.mdx           區塊、範圍、生態域與結構
│  ├─ safety-model.mdx              確認、世界限制與領地保護
│  ├─ regeneration-pipeline.mdx     重生佇列與空間批次
│  └─ deletion-lifecycle.mdx        冷區域檢查與刪除工作生命週期
├─ configuration/
│  ├─ index.mdx                     設定總覽
│  ├─ database.mdx                  資料庫
│  ├─ regeneration.mdx              重生與執行緒
│  ├─ memory-safety.mdx             記憶體安全
│  ├─ scanning-and-biomes.mdx       掃描與生態域
│  ├─ worlds-and-safety.mdx         世界範圍與安全限制
│  ├─ structures.mdx                結構偵測、刷新與保護
│  ├─ deletion.mdx                  刪除工作
│  └─ display.mdx                   標記顯示
├─ reference/
│  ├─ index.mdx                     參考資料
│  ├─ commands.mdx                  命令與權限
│  ├─ configuration.mdx             完整設定鍵
│  ├─ compatibility.mdx             相容性
│  └─ files-and-storage.mdx         檔案、資料庫與持久化資料
├─ integrations/
│  ├─ index.mdx                     整合
│  ├─ residence.mdx                 Residence
│  └─ packetevents.mdx              PacketEvents 與標記顯示
├─ troubleshooting/
│  ├─ index.mdx                     疑難排解
│  ├─ startup.mdx                   無法啟動或版本不符
│  ├─ jobs.mdx                      工作卡住、無法取消或重啟恢復
│  ├─ performance.mdx               TPS、CPU、I/O 與記憶體問題
│  └─ unexpected-results.mdx        地形接縫、目標被略過與保護衝突
└─ developers.mdx                   開發者與自動化整合
```

### 5.1 側邊欄分組

`meta.json` 建議使用 Fumadocs 的分隔項目，讓導覽先呈現使用者旅程，再呈現查詢資料：

```json
{
  "title": "ChunkRevive",
  "pages": [
    "---總覽---",
    "index",
    "---入門---",
    "getting-started",
    "---日常操作---",
    "guides",
    "---深入了解---",
    "concepts",
    "---設定與參考---",
    "configuration",
    "reference",
    "---支援---",
    "integrations",
    "troubleshooting",
    "developers"
  ]
}
```

### 5.2 首頁設計

首頁不再承擔完整安裝教學，固定由六個區塊構成：

1. **一句話定位**：安全地選取、重生或清理 Paper 世界中的既有區塊資料。
2. **重要風險提示**：外掛會改動世界資料；正式操作前必須備份。
3. **四個主要入口卡片**：首次使用、常見操作、命令與設定、疑難排解。
4. **功能能力圖**：選取 → 檢查保護 → 建立工作 → 重生/重置/刪除 → 監看結果。
5. **相容性摘要**：只顯示最低必要資訊，連到完整相容性表。
6. **常見任務捷徑**：重生目前區塊、批次處理、生態域、結構、磁碟清理。

首頁只回答「這是什麼、能不能用、接下來去哪裡」，不放完整命令表或設定範例。

## 6. 關鍵頁面內容規格

### 6.1 「完成第一次安全重生」

這是全站最重要的教學頁，必須形成可驗證的成功路徑：

1. 確認版本與相依套件。
2. 建立測試世界或世界副本。
3. 啟動後檢查日誌。
4. 執行 `/cr server` 與 `/cr status`。
5. 站在可犧牲的測試區塊，記錄座標和畫面。
6. 執行 `/cr regen here`。
7. 驗證地形、鄰接邊界、玩家建築和領地結果。
8. 說明下一步：標記批次、效能調校或正式環境清單。

頁面不能提前教 `delete` 或 `prune`，也不展開所有設定。

### 6.2 「Regen、Reset、Delete、Prune」

這一頁直接說明每種操作負責什麼、何時使用，以及會如何處理世界資料。

| 操作 | 負責的工作 | 適用場景 |
| --- | --- | --- |
| **Regen** | 由 ChunkRevive 立即建立 ProtoChunk、執行世界生成階段、寫回 terrain/entity NBT；若區塊已載入，還要套用方塊、生態域、實體、BlockEntity、光照和鄰居更新 | 必須立即刷新目標，不能等待區塊卸載及日後重新載入；已針對伺服器資源完成 Regen 調校，並已驗證目前 Minecraft/Paper adapter 的結果 |
| **Reset** | 不代表單一底層動作；它是策略入口，依 `reset-strategy` 和目標是否構成完整、安全的 Anvil Region，規劃成 `REGENERATE`、`DELETE_CHUNK` 或 `DELETE_REGION` | 希望讓 ChunkRevive 自動替零散區塊與完整 Region 選擇處理方法；適合批次維護和同時包含不同形狀目標的工作 |
| **Delete** | 等待區塊保持 cold，再移除指定 chunk 的 terrain、entity 和 POI 儲存項目；新地形在該區塊下次由伺服器載入時按需生成 | 零散區塊、只選中部分 Region、可接受稍後才重新生成，或希望降低當下 CPU/Heap 負擔的資源世界維護 |
| **Prune** | 處理完整 32×32、共 1024 個區塊的 Anvil Region；清除 terrain、entity、POI 後驗證為空，並將 Region files 截短至合法的 8 KiB header | 整個 Region 都確定可以移除、沒有 Residence 或受保護結構，且目標包含實際回收硬碟空間的大範圍清理 |

頁面必須清楚寫出推薦原則：

```text
完整且安全的 Region → Prune
不完整或零散的範圍 → Delete
必須立即在線更新 → Regen
希望由設定自動決定 → Reset
```

#### 為什麼預設推薦 Delete 與 Prune

ChunkRevive 的預設重置策略是：

```yaml
reset-strategy:
  default-method: DELETE_CHUNK
  eligible-region-method: DELETE_REGION
  incomplete-region-method: DEFAULT
```

這不是因為 Regen 不可使用，而是因為 Delete/Prune 的工作邊界更短：外掛負責安全移除舊資料，之後把重新生成交回伺服器處理。相較之下，Regen 必須由版本專用 NMS 立即重演世界生成、序列化、寫盤和 live chunk 更新。

正式頁面需要解釋以下推薦理由：

1. **較低的即時運算負擔**：Delete/Prune 不需要建立完整 ProtoChunk 圖、生成 halo，或立即重跑結構、洞穴、礦物、植被等階段，通常使用較少 CPU 和 JVM Heap。
2. **更容易控制大量工作**：刪除工作會等待玩家離開、檢查 ChunkHolder，並要求連續兩次觀察到目標保持 cold；工作可持久化並在重啟後恢復。
3. **由伺服器原生生成**：區塊下次載入時，由當前伺服器的正常「尚未生成 chunk」流程建立地形，較容易與現行 seed、版本、datapacks 和 generator 保持一致。
4. **避免在線套用成本**：不需要在玩家正在使用的 live chunk 上移除/重建實體、複製方塊與 biome、重建 BlockEntity、重算光照或觸發鄰居更新。
5. **更適合回收儲存空間**：Delete 會釋放 `.mca` 內可重用 sectors；完整 Region 經 Prune 後可以實際截短至 8 KiB header。Regen 通常只是用新資料覆寫舊資料。
6. **較小的版本耦合面積**：Delete/Prune 主要走受控的 Region I/O；Regen 需要模擬 context、halo、structure metadata、blending 和多個 worldgen stages，較依賴不同 Minecraft/Paper 版本的 NMS 行為。

同時必須交代限制，避免把「推薦」寫成無條件結論：

- Delete Chunk 通常只釋放 Region file 內可重用空間，不會立刻縮小 `.mca` 檔案。
- Prune 只適用於完整且通過 Residence、受保護結構等檢查的 1024-chunk Region。
- 若 Minecraft 版本、datapacks、世界生成設定或 generator 已改變，Delete/Prune 後生成的是「目前規則下的地形」，不一定是歷史舊地形的逐方塊副本。
- Regen 的主要價值是立即在線更新；不能等待區塊卸載時仍應使用 Regen。

這一節的正式內容以 ChunkRevive 專案內的
[`為什麼推薦 Delete 與 Prune 而非 Regen`](../FreshPlugins/projects/ChunkRevive/docs/為什麼推薦Delete與Prune而非Regen.md)
為技術依據，撰寫時仍需逐項對照當前 `PluginConfig`、`ResetStrategyPlanner`、`DeletionService` 和各版本 NMS adapter。

### 6.3 命令參考

命令頁按命令族群分段，每條命令使用一致欄位：

- 語法
- 用途
- 執行者（玩家/主控台）
- 權限
- 參數
- 是否需要二次確認
- 會略過或拒絕的條件
- 相關操作指南

命令參考保持精簡、完整和中立。長流程、背景原理與效能建議放到對應指南。

權限不再建立獨立的 `permissions.mdx`。`commands.mdx` 頁首先提供權限總表，再在每個命令項目中標示實際所需權限，讓讀者不用在命令頁與權限頁之間往返。權限總表至少包含：

- 權限節點。
- 預設授權對象。
- 可使用的命令範圍。
- 是否適合一般玩家持有。

### 6.4 完整設定參考

不能只提供一份大型 YAML 後用段落解釋部分欄位。每個設定鍵必須有：

- 完整路徑
- 型別
- 預設值
- 可用值或範圍
- 是否可透過 `/cr reload` 即時生效
- 行為與風險
- 相關命令/功能

設定主題頁負責教「如何選」，完整設定鍵頁負責查「精確值」。例如 `memory-safety.mdx` 解釋策略，`reference/configuration.mdx` 列出每個鍵。

### 6.5 疑難排解頁

每個問題使用固定格式：

1. 症狀。
2. 最可能原因。
3. 檢查命令或日誌關鍵字。
4. 修復步驟。
5. 若仍未解決，需要收集哪些版本、設定和日誌。

不得建議使用者直接重複執行破壞性命令作為排查手段。

## 7. 頁面寫作與元件規範

### 7.1 每頁基本結構

```mdx
---
title: 動詞開頭或清楚名詞
description: 一句話說明本頁能協助讀者完成什麼
---

頁首摘要：適用對象、結果與風險。

<Callout type="warn" title="操作前先備份">
  只在本頁確實涉及世界資料變更時顯示。
</Callout>

## 開始之前

## 操作步驟

### 第一步 [step]

## 驗證結果

## 下一步
```

參考頁不強制套用步驟結構，改用簡短導言、索引和規格表。

### 7.2 元件使用

- `Cards`：只用於章節入口和下一步選擇，不用來包裝一般段落。
- `Callout`：區分資訊、提示、警告與危險；同頁避免連續堆疊。
- `[step]` 或 `Steps`：只用於必須依序完成的操作。
- `Tabs`：用於 Paper/Folia、玩家/主控台等真正互斥的變體。
- `Accordion`：用於補充細節或 FAQ，不隱藏必要安全資訊。
- 程式碼區塊：設定範例使用 `yaml`，命令使用 `text` 或 `bash`，並加上能理解目的的標題。
- 表格：適合命令、設定與比較；教學步驟不要全部塞進表格。

### 7.3 語言與術語

- 使用繁體中文（臺灣），保留產品名、命令、設定鍵與技術標識的英文。
- 統一使用「區塊」表示 chunk、「重生」或「重新生成」需選定其中一種作為主詞；正式撰寫前建立術語表。
- `region` 第一次出現寫成「Anvil Region（32×32 區塊）」；後續維持同一稱呼。
- 區分方塊座標、區塊座標與 Region 座標，每個含座標的頁面都要標明單位。
- 不使用「顯然、簡單、只要」等低估風險或使用者經驗的語氣。
- 危險命令使用直接句型，明確寫出會變更或刪除哪些資料。

## 8. 內容來源與維護規則

| 文檔資料 | 唯一可信來源 | 更新時的核對方式 |
| --- | --- | --- |
| 外掛名稱、版本、相依、權限 | `paper-plugin.yml`、Gradle 設定 | 發版前逐欄比對 |
| 命令語法、參數、執行者限制 | `ChunkReviveCommand.java` | 建立命令盤點表，與註冊節點逐項核對 |
| 設定鍵、型別、預設值 | `PluginConfig.java` | 由程式碼盤點產生清單，再人工補充行為 |
| 支援版本 | `nms/*` 與建置設定 | 新增/移除 adapter 時同步更新 |
| 錯誤、確認與狀態名稱 | `messages-zh_tw.yml` | 指南中的文字不要假設未存在的訊息 |
| 行為邊界 | service、policy 與 tests | 高風險說明需至少有程式碼或測試佐證 |

新增功能的完成定義應包含：

1. 操作指南是否需要新增或更新。
2. 命令/設定參考是否同步。
3. 相容性或故障處理是否受影響。
4. 舊連結是否需要 redirect 或保留相容頁。

## 9. 製作階段

### 階段 1：建立真實資料盤點

- 匯出完整命令樹、參數、權限、玩家/主控台限制與確認門檻。
- 匯出所有設定鍵、預設值和註解。
- 確認每個 NMS adapter 對應的公開版本名稱。
- 盤點資料庫表、持久化檔案與重啟後恢復行為。
- 建立術語表與操作影響說明。

**交付物**：命令矩陣、設定矩陣、功能覆蓋矩陣、術語表。

### 階段 2：先完成最小安全閱讀路徑

- 重寫 ChunkRevive 首頁。
- 完成安裝前須知、安裝與首次啟動、第一次安全重生。
- 完成四種操作模型與相容性頁。
- 建立新的 `meta.json` 導覽。

**驗收情境**：未接觸過 ChunkRevive 的管理員能在測試世界完成一次重生，且知道哪些命令尚不應使用。

### 階段 3：完成任務型操作指南

- 標記、批次重生、生態域、結構、重置、刪除/修剪、監看/取消、效能調校。
- 每頁加入前置條件、驗證方式、失敗出口和下一步。
- 將現有 `usage/workflows.mdx` 的內容拆入對應頁，不直接複製。

**驗收情境**：讀者可從首頁以兩次點擊內到達任一高頻任務。

### 階段 4：完成參考資料

- 完整命令參考。
- 完整設定鍵參考。
- 在命令參考中完成權限總表，並完成相容性、檔案與儲存參考。
- Residence、PacketEvents 及開發者整合邊界。

**驗收情境**：所有已註冊命令和 `PluginConfig` 公開設定都有文檔位置，覆蓋率 100%。

### 階段 5：疑難排解與內容整合

- 根據程式訊息和常見失敗條件建立排查頁。
- 合併重複段落，建立跨頁連結。
- 為舊路由建立保留頁或 redirect 策略。
- 移除已被替代的舊頁。

### 階段 6：品質驗證

- 執行 `npm run types:check` 與 `npm run build`。
- 驗證所有內部連結、標題錨點與程式碼範例。
- 在桌面和手機寬度檢查首頁、長表格、Callout 與側邊欄。
- 檢查搜尋能否以命令、設定鍵、中英文術語找到正確頁面。
- 對照 ChunkRevive 原始碼完成最終技術審閱。

## 10. 驗收標準

### 資訊架構

- 首頁提供首次使用、常見任務、參考與排錯四種清楚入口。
- 側邊欄不超過三層主要深度。
- 每個資料夾都有 landing page，說明內容與推薦閱讀順序。
- 高風險操作擁有獨立頁面，不與第一次使用教學混寫。

### 完整性

- 命令覆蓋率 100%。
- 設定鍵覆蓋率 100%。
- 權限、相依與支援版本和程式碼一致。
- 每個主要功能至少有一個操作指南或概念頁。

### 可用性

- 新使用者可在單一路徑完成第一次安全重生。
- 任一命令或設定鍵可由站內搜尋直接找到。
- 每個操作指南都有「開始之前」「驗證結果」「下一步」。
- 破壞性操作在執行範例前顯示明確警告和備份要求。

### 技術品質

- MDX 型別檢查和正式建置通過。
- 沒有失效內部連結或不存在的標題錨點。
- 手機版表格與程式碼不破壞頁面寬度。
- 不修改或覆蓋與本次文檔無關的既有工作樹變更。

## 11. 本輪不處理的項目

- 不改動 ChunkRevive 外掛行為、命令或設定。
- 不建立尚未存在的公開 Java API。
- 不承諾未經原始碼確認的 Minecraft/Paper 版本。
- 不在本輪直接刪除舊頁或改動正式導覽。
- 不把內部 NMS 類別當成面向第三方的 API 文檔。
- 不進行 ChunkRegen → ChunkRevive 以外的產品重新命名；若「ChunkRegen」是預期正式名稱，需另立命名與遷移方案。

## 12. 建議的下一步

方案確認後，先執行「階段 1 + 階段 2」，產出可實際瀏覽的首頁與安全入門路徑；經一次內容與畫面審閱後，再批次製作操作指南和完整參考。這能先驗證資訊架構與語氣，也能避免在錯誤模板上一次重寫所有頁面。
