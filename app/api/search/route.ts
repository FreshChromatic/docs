import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  localeMap: {
    // Orama has no Traditional Chinese stemmer. The generic English tokenizer
    // still indexes the original terms without pretending the content is translated.
    zh_tw: 'english',
    en: 'english',
  },
});
