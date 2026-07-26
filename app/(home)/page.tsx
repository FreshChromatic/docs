import { LandingPage } from '@/components/landing-page';

export default function HomePage() {
  return (
    <LandingPage
      eyebrow="FreshChromatic"
      title="Documentation"
      description="Fast, flexible documentation powered by Fumadocs."
      primary={{ label: 'Get Started', href: '/chunkrevive' }}
      secondary={{ label: 'Browse Guides', href: '/chunkrevive/guides' }}
      features={[
        {
          title: 'Markdown First',
          description: 'Write and maintain content directly in Markdown or MDX.',
        },
        {
          title: 'Fast Development',
          description: 'Preview every change instantly with the Next.js development server.',
        },
        {
          title: 'Built for Navigation',
          description: 'Search, sidebars, page outlines, and dark mode work out of the box.',
        },
      ]}
    />
  );
}
