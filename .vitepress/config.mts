import { defineConfig } from 'vitepress'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'ALGOLIA_')
  const algoliaSearch = {
    provider: 'algolia' as const,
    options: {
      appId: env.ALGOLIA_APP_ID,
      apiKey: env.ALGOLIA_SEARCH_API_KEY,
      indexName: env.ALGOLIA_INDEX_NAME
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
    search: algoliaSearch
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
    search: algoliaSearch
  }

  return {
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
  }
})
