/**
 * Central titles, descriptions, and keywords for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  keywords: string;
}

const BRAND_KW =
  'once human cheats, once human pc cheats, once human esp, once human aimbot, oncecheats.com';

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Once Human Cheats for PC | ESP & Aimbot Features',
    description:
      'Explore Once Human cheats for PC, compare available features, check compatibility details, and learn the risks and options before you buy.',
    keywords: `${BRAND_KW}, buy once human cheats, once human radar, meta-human esp, warfare zone cheats`,
  },
  '/products/once-human/': {
    title: 'Once Human Products | PC Software & Utilities',
    description:
      'Compare Once Human PC cheats, HWID Spoofer, UGC Tool, and Cloud DMA—features, compatibility, and checkout on oncecheats.com.',
    keywords: `${BRAND_KW}, once human products, once human utilities, once human pc software`,
  },
  '/products/once-human/pc-software/': {
    title: 'Once Human PC Cheats | ESP & Aim Assist',
    description:
      'Feature overview for Once Human PC cheats: ESP, radar, loot filters, aim assist, hotkeys, and config profiles—Windows Steam and Epic only.',
    keywords:
      'once human pc cheats, once human cheat software, once human esp, once human aimbot, once human radar, buy once human cheats',
  },
  '/products/once-human/hwid-spoofer/': {
    title: 'HWID Spoofer Product | Once Human PC',
    description:
      'Neutral overview of HWID Spoofer for PC operators—when to read merchant requirements, risks, and separate checkout from main Once Human cheats.',
    keywords: 'once human hwid spoofer, once human hardware ban, once human cheats utilities, hwid once human',
  },
  '/products/once-human/ugc/': {
    title: 'UGC Tool | Once Human Account Recovery',
    description:
      'Merchant-described UGC Tool context for Once Human PC accounts—no guaranteed unbans; read compatibility before checkout.',
    keywords: 'once human ugc tool, once human ban appeal, once human account recovery, once human cheats utilities',
  },
  '/products/once-human/cloud-dma/': {
    title: 'Cloud DMA Product | Once Human PC',
    description:
      'Cloud DMA prerequisites for advanced Once Human PC setups—firmware, latency, and merchant checklist before you purchase.',
    keywords: 'once human cloud dma, once human dma cheats, advanced once human cheats, once human pc dma',
  },
  '/products/once-human/utilities/': {
    title: 'Once Human Utilities | HWID, UGC & Cloud DMA',
    description:
      'When to consider HWID Spoofer, UGC Tool, or Cloud DMA alongside Once Human PC cheats—neutral descriptions and checkout links.',
    keywords: 'once human utilities, once human hwid, once human ugc, once human cloud dma, once human cheats',
  },
  '/blogs/': {
    title: 'Once Human Cheats Guides & Buying Tips',
    description:
      'Trending Once Human cheats guides—ESP, aim assist, radar, safety, installation, patches, and PC buying tips for Steam and Epic.',
    keywords: `${BRAND_KW}, once human guides, once human cheats blog, best once human cheats 2026`,
  },
  '/forum/': {
    title: 'Once Human Cheats Forum | Illustrative Discussions',
    description:
      'Read-only example threads about Once Human cheats settings, ESP, compatibility, and checkout—not live customer support.',
    keywords: `${BRAND_KW}, once human forum, once human esp settings, once human cheats discussion`,
  },
  '/reviews/': {
    title: 'Once Human Cheats Reviews',
    description:
      'Browse published Once Human cheats reviews when available, or use filters to explore the reviews archive on oncecheats.com.',
    keywords: 'once human cheats reviews, once human pc cheats reviews, oncecheats.com reviews',
  },
  '/faq/': {
    title: 'FAQ | Once Human Cheats & Setup',
    description:
      'Answers on Once Human cheats compatibility, checkout, utilities, ban risks, and guides before you purchase PC software.',
    keywords: `${BRAND_KW}, once human cheats faq, once human setup, steam epic once human cheats`,
  },
  '/terms/': {
    title: 'Terms & Conditions | Once Human Cheats',
    description:
      'Purchase terms, license use, and refund policy for Once Human cheats and products linked from oncecheats.com.',
    keywords: 'once human cheats terms, oncecheats.com terms, once human license',
  },
  '/privacy/': {
    title: 'Privacy Policy | Once Human Cheats',
    description:
      'How oncecheats.com uses analytics, cookies, and contact data when you browse Once Human cheats guides or request support.',
    keywords: 'oncecheats.com privacy, once human cheats privacy policy',
  },
  '/about/': {
    title: 'About Once Human Cheats',
    description:
      'What oncecheats.com publishes: Once Human PC cheats guides, utilities, and honest compatibility notes for Windows players.',
    keywords: `${BRAND_KW}, about oncecheats.com, once human cheats guides`,
  },
  '/support/': {
    title: 'Support | Once Human Cheats & Discord',
    description:
      'Join Discord for Once Human cheats setup help, email support@oncecheats.com, read FAQ, and use ticket tips for PC software issues.',
    keywords: `${BRAND_KW}, once human discord, once human cheats support, once human loader help`,
  },
};

export const DEFAULT_PAGE_KEYWORDS = BRAND_KW;

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}