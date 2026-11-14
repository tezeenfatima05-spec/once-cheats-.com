/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Once Human Cheats for PC | ESP & Aimbot Features',
    description:
      'Explore Once Human cheats for PC, compare available features, check compatibility details, and learn the risks and options before you buy.',
  },
  '/products/once-human/': {
    title: 'Once Human Products | PC Software & Utilities',
    description:
      'Compare Once Human PC software, HWID Spoofer, UGC Tool, and Cloud DMA—features, compatibility, and checkout on oncecheats.com.',
  },
  '/products/once-human/pc-software/': {
    title: 'Once Human PC Software | ESP & Aim Assist',
    description:
      'Feature overview for Once Human PC software: ESP, radar, loot filters, aim assist, hotkeys, and config profiles—PC only.',
  },
  '/products/once-human/utilities/': {
    title: 'Once Human Utilities | HWID, UGC & Cloud DMA',
    description:
      'When to consider HWID Spoofer, UGC Tool, or Cloud DMA alongside Once Human PC software—neutral descriptions and checkout links.',
  },
  '/blogs/': {
    title: 'Once Human Cheats Guides & Buying Tips',
    description:
      'Buying guides, ESP and aim assist explainers, safety notes, FPS tips, and compatibility articles for Once Human on PC.',
  },
  '/forum/': {
    title: 'Once Human Forum | Illustrative Discussions',
    description:
      'Read-only example threads about Once Human software settings, compatibility, and checkout— not live customer support.',
  },
  '/reviews/': {
    title: 'Once Human Cheats Reviews',
    description:
      'Browse published Once Human product reviews when available, or use filters to explore the reviews archive on oncecheats.com.',
  },
  '/faq/': {
    title: 'FAQ | Once Human Cheats & Setup',
    description:
      'Answers on PC compatibility, checkout, utilities, ban risks, and guides before you purchase Once Human software.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Once Human Cheats',
    description:
      'Purchase terms, license use, and refund policy for products linked from oncecheats.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Once Human Cheats',
    description:
      'How oncecheats.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About Once Human Cheats',
    description:
      'What oncecheats.com publishes: Once Human PC software guides, utilities, and honest compatibility notes.',
  },
  '/support/': {
    title: 'Support | Once Human Cheats',
    description:
      'Get help with checkout paths, utilities, and reading guides for Once Human PC software.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}