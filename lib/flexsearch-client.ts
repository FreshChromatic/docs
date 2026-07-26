'use client';

import type { SearchClient } from 'fumadocs-core/search/client';
import {
  createContentHighlighter,
  type SortedResult,
} from 'fumadocs-core/search';
import FlexSearch from 'flexsearch';

type SearchDocument = {
  id: string;
  content: string;
  page_id: string;
  type: 'page' | 'heading' | 'text';
  breadcrumbs?: string[];
  tags: string[];
  url: string;
};

type ExportedData = {
  type: 'i18n';
  raw: Record<string, Record<string, string>>;
};

function createIndex(locale: string) {
  return new FlexSearch.Document<SearchDocument>({
    tokenize: 'full',
    ...(locale === 'zh_tw' ? { encoder: FlexSearch.Charset.CJK } : {}),
    document: {
      id: 'id',
      index: ['content'],
      tag: ['tags'],
      store: true,
    },
  });
}

type SearchIndex = ReturnType<typeof createIndex>;

const databaseCache = new Map<string, Promise<Map<string, SearchIndex>>>();

async function loadIndexes(from: string) {
  const response = await fetch(from);
  if (!response.ok) {
    throw new Error(`Failed to fetch search indexes from ${from}.`);
  }

  const data = (await response.json()) as ExportedData;
  const indexes = new Map<string, SearchIndex>();

  for (const [locale, raw] of Object.entries(data.raw)) {
    const index = createIndex(locale);
    for (const [key, value] of Object.entries(raw)) {
      index.import(key, value);
    }
    indexes.set(locale, index);
  }

  return indexes;
}

function getIndexes(from: string) {
  let cached = databaseCache.get(from);
  if (!cached) {
    cached = loadIndexes(from);
    databaseCache.set(from, cached);
  }
  return cached;
}

async function searchIndex(index: SearchIndex, query: string) {
  const matches = await index.searchAsync(query, {
    index: 'content',
    limit: 60,
  });
  const ids = matches[0]?.result ?? [];
  const grouped = new Map<string, SearchDocument[]>();

  for (const id of ids) {
    const document = index.get(id) as SearchDocument | undefined;
    if (!document) continue;

    let group = grouped.get(document.page_id);
    if (!group) {
      group = [];
      grouped.set(document.page_id, group);
    }
    if (document.type !== 'page') group.push(document);
  }

  const highlighter = createContentHighlighter(query);
  const results: SortedResult[] = [];

  for (const [pageId, documents] of grouped) {
    const page = index.get(pageId) as SearchDocument | undefined;
    if (!page) continue;

    results.push({
      id: pageId,
      type: 'page',
      content: highlighter.highlightMarkdown(page.content),
      breadcrumbs: page.breadcrumbs,
      url: page.url,
    });

    for (const document of documents) {
      results.push({
        id: document.id,
        type: document.type,
        content: highlighter.highlightMarkdown(document.content),
        breadcrumbs: document.breadcrumbs,
        url: document.url,
      });
    }
  }

  return results;
}

export function localizedFlexsearchClient(locale: string): SearchClient {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const from = `${basePath}/api/search`;

  return {
    deps: [from, locale],
    async search(query) {
      const indexes = await getIndexes(from);
      const index = indexes.get(locale);
      if (!index) return [];
      return searchIndex(index, query);
    },
  };
}
