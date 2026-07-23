import { defineConfig } from 'vitepress'

const englishSearch = {
  provider: 'local' as const,
  options: {
    translations: {
      button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      modal: { noResultsText: 'No results found.' }
    }
  }
}

const chineseSearch = {
  provider: 'local' as const,
  options: {
    translations: {
      button: { buttonText: '搜尋', buttonAriaLabel: '搜尋' },
      modal: { noResultsText: '找不到結果。' }
    }
  }
}

const englishTheme = {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/getting-started' }
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Guide',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }]
      }
    ]
  },
  search: englishSearch
}

const chineseTheme = {
  nav: [
    { text: '首頁', link: '/zh/' },
    { text: '指南', link: '/zh/guide/getting-started' }
  ],
  sidebar: {
    '/zh/guide/': [
      {
        text: '指南',
        items: [{ text: '快速開始', link: '/zh/guide/getting-started' }]
      }
    ]
  },
  search: chineseSearch
}

export default defineConfig({
  base: '/docs/',
  lang: 'en-US',
  title: 'Documentation',
  description: 'A documentation site built with VitePress',
  themeConfig: englishTheme,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: englishTheme
    },
    zh: {
      label: '繁體中文',
      lang: 'zh-TW',
      link: '/zh/',
      title: '文件網站',
      description: '使用 VitePress 建立的文件網站',
      themeConfig: chineseTheme
    }
  }
})
