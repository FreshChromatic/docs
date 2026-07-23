# Getting Started

## Start the Development Server

```bash
npm run docs:dev
```

Open the local URL shown in the terminal to preview the documentation. The page updates automatically as you edit Markdown files.

## Build the Site

```bash
npm run docs:build
```

The generated static site is placed in `.vitepress/dist` and can be deployed to any static hosting provider.

## Add a Page

Create a new `.md` file in the project, such as `guide/advanced.md`, then add a link to it in the sidebar within `.vitepress/config.mts`.
