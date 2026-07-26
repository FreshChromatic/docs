import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

type Action = {
  label: string;
  href: string;
};

type Feature = {
  title: string;
  description: string;
};

export function LandingPage({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  features,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: Action;
  secondary: Action;
  features: Feature[];
}) {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-32">
        <div className="mb-6 flex items-center gap-2 rounded-full border bg-fd-card/80 px-3 py-1.5 text-sm text-fd-muted-foreground shadow-sm backdrop-blur">
          <BookOpen className="size-4 text-fd-primary" aria-hidden="true" />
          {eyebrow}
        </div>
        <h1 className="max-w-4xl bg-gradient-to-br from-fd-foreground to-fd-muted-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground sm:text-xl">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground shadow-sm transition hover:opacity-90"
          >
            {primary.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={secondary.href}
            className="rounded-lg border bg-fd-background/80 px-5 py-2.5 font-medium transition hover:bg-fd-accent"
          >
            {secondary.label}
          </Link>
        </div>
      </section>
      <section className="relative mx-auto grid max-w-6xl gap-4 px-6 pb-24 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border bg-fd-card/80 p-6 shadow-sm backdrop-blur"
          >
            <CheckCircle2 className="mb-4 size-5 text-fd-primary" aria-hidden="true" />
            <h2 className="font-semibold">{feature.title}</h2>
            <p className="mt-2 leading-7 text-fd-muted-foreground">{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
