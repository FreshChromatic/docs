import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug.length === 1 && slug[0] === 'chunkrevive') {
    redirect('/zh_tw/chunkrevive/getting-started');
  }
  const page = source.getPage(slug, 'zh_tw');
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return [
    { slug: ['chunkrevive'] },
    ...source.getPages('zh_tw').map((page) => ({
      slug: page.slugs,
    })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1 && slug[0] === 'chunkrevive') {
    return {};
  }
  const page = source.getPage(slug, 'zh_tw');
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
