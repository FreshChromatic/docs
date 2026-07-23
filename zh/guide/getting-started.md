# 快速開始

## 啟動開發伺服器

```bash
npm run docs:dev
```

開啟終端顯示的本機網址，即可預覽文件。編輯 Markdown 檔案後，頁面會自動更新。

## 建置網站

```bash
npm run docs:build
```

產生的靜態網站位於 `.vitepress/dist`，可部署至任何靜態網站託管服務。

## 新增頁面

在專案中建立新的 `.md` 檔案，例如 `zh/guide/advanced.md`，再到 `.vitepress/config.mts` 的側邊欄加入連結即可。
