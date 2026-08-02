import { defineI18n } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const locales = ['zh_tw', 'en'] as const;
export type Locale = (typeof locales)[number];
export const localePreferenceCookie = 'chunkrevive-locale';

export const i18n = defineI18n({
  languages: [...locales],
  defaultLanguage: 'en',
  hideLocale: 'never',
  parser: 'dir',
  fallbackLanguage: null,
});

export const i18nUI = defineI18nUI(i18n, {
  zh_tw: {
    displayName: '繁體中文',
    'Ask AI(AI chat button)': '詢問 AI',
    'Back to Home(404 not found page)': '返回首頁',
    'Choose a language(language switcher)': '選擇語言',
    'Choose a language(language switcher)(aria-label)': '選擇語言',
    'Close Banner(banner)(aria-label)': '關閉橫幅',
    'Close Search(search dialog)(aria-label)': '關閉搜尋',
    'Close Sidebar(aria-label)': '關閉側邊欄',
    'Close Sidebar(sidebar)(aria-label)': '關閉側邊欄',
    'Collapse Sidebar(sidebar)(aria-label)': '收合側邊欄',
    'Copied Text(code block)(aria-label)': '已複製文字',
    'Copy Anchor Link(heading anchor)(aria-label)': '複製段落連結',
    'Copy Link(accordion)(aria-label)': '複製連結',
    'Copy Markdown(page actions)': '複製 Markdown',
    'Copy Text(code block)(aria-label)': '複製文字',
    'Dark(theme switcher)(aria-label)': '深色',
    'Default(type table)': '預設值',
    'Edit on GitHub(edit page)': '在 GitHub 編輯',
    'Hide Sidebar(sidebar)': '隱藏側邊欄',
    'Last updated on(page footer)': '最後更新於',
    'Layout Tab(layout tab trigger)': '版面分頁',
    'Light(theme switcher)(aria-label)': '淺色',
    'Next Page(pagination)': '下一頁',
    'No Headings(table of contents)': '沒有標題',
    'No results found(search dialog)': '找不到結果',
    'On this page(table of contents)': '本頁內容',
    'Open Search(search trigger)(aria-label)': '開啟搜尋',
    'Open Sidebar(aria-label)': '開啟側邊欄',
    'Open Sidebar(sidebar)(aria-label)': '開啟側邊欄',
    'Open in ChatGPT(page actions)': '在 ChatGPT 開啟',
    'Open in Claude(page actions)': '在 Claude 開啟',
    'Open in Cursor(page actions)': '在 Cursor 開啟',
    'Open in GitHub(page actions)': '在 GitHub 開啟',
    'Open in Scira AI(page actions)': '在 Scira AI 開啟',
    'Open(page actions)': '開啟',
    'Page Not Found(404 not found page)': '找不到頁面',
    'Parameters(type table)': '參數',
    'Previous Page(pagination)': '上一頁',
    'Prop(type table)': '屬性',
    'Read {url}, I want to ask questions about it.(page actions)':
      '閱讀 {url}，我想詢問相關問題。',
    'Returns(type table)': '回傳值',
    'Search(search dialog)': '搜尋文件',
    'Search(search trigger)': '搜尋',
    'Show Sidebar(sidebar)': '顯示側邊欄',
    'System(theme switcher)(aria-label)': '跟隨系統',
    'Table of Contents(inline table of contents)': '目錄',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
      '你要尋找的頁面可能已被移除、重新命名，或暫時無法使用。',
    'Toggle Menu(home layout header)(aria-label)': '切換選單',
    'Toggle Theme(theme switcher)(aria-label)': '切換主題',
    'Type(type table)': '型別',
    'View as Markdown(page actions)': '以 Markdown 檢視',
  },
  en: {
    displayName: 'English',
  },
});

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
