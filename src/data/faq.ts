import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const pcSoftware = link('Once Human PC software', productPath('pc-software'));
const productsHub = link('Once Human products', ROUTES.products);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const ugc = link('UGC Tool', productPath('ugc'));
const cloudDma = link('Cloud DMA', productPath('cloud-dma'));
const blogs = link('Blogs', ROUTES.blog);
const safetyGuide = link('safety guide', '/blogs/once-human-cheats-safety/');

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('Once Human PC software on 64-bit Windows 10 or 11 via Steam or Epic. PlayStation and Xbox clients are not supported.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after checkout?',
    a: a('Proceed to Checkout opens the authorized merchant page. Delivery, activation, and loader steps are described there—not on oncecheats.com.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can Once Human accounts be restricted for third-party tools?',
    a: `Yes. NetEase publishes Fair Play Announcements describing enforcement against cheating. Read our ${safetyGuide} before you buy.`,
  },
  {
    id: 'features',
    topic: 'esp',
    icon: 'faqStatus',
    q: 'Which features does the PC software include?',
    a: `See ${pcSoftware} for ESP, radar, loot filters, aim assist, hotkeys, and profiles. Lists follow the merchant offering at purchase time.`,
  },
  {
    id: 'utilities',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What utilities are listed separately?',
    a: `${hwid}, ${ugc}, and ${cloudDma} are separate checkout paths on ${productsHub}. None guarantee account recovery or unban.`,
  },
  {
    id: 'pricing',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Where do I see pricing?',
    a: a('Pricing and plans appear on the merchant checkout page after you click Proceed to Checkout. oncecheats.com does not display subscription totals.'),
  },
  {
    id: 'updates',
    topic: 'setup',
    icon: 'faqBlogDefault1',
    q: 'Do game updates affect software compatibility?',
    a: `Major Once Human patches can change module behavior. Re-read ${blogs} compatibility notes after updates.`,
  },
  {
    id: 'support',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'Where do I get support?',
    a: a('Use the Support page and merchant contact options. Include your order email and Windows version when asking about loader issues.'),
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.slice(0, 6);
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs;
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Straight answers before checkout.',
  subtitle: 'PC compatibility, utilities, and risk—without vague promises.',
};

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'setup',
  'esp',
  'safety',
  'products',
  'blog',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Related questions',
  subtitle: 'Quick answers for this page.',
};

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const topics = new Set<FaqTopic>(['all']);
  items.forEach((item) => topics.add(item.topic));
  return SITE_FAQ_FILTER_TOPICS.filter((t) => topics.has(t));
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const shared: SiteFaqItem[] = [
    {
      id: 'prod-risk',
      topic: 'safety',
      icon: 'faqBanRisk',
      q: 'Does this product remove ban risk?',
      a: a('No. Third-party tools can violate Terms of Service. NetEase Fair Play enforcement may apply.'),
    },
    {
      id: 'prod-checkout',
      topic: 'setup',
      icon: 'faqAfterBuy',
      q: 'How do I purchase?',
      a: a('Use Proceed to Checkout on the product page for the authorized merchant link.'),
    },
  ];

  if (slug === 'pc-software') {
    return [
      {
        id: 'prod-pc-1',
        topic: 'esp',
        icon: 'faqBlogSlugEsp',
        q: 'Is this for console Once Human?',
        a: a('No—PC Windows clients only (Steam/Epic).'),
      },
      {
        id: 'prod-pc-2',
        topic: 'esp',
        icon: 'faqBlogSlugScripts',
        q: 'Where are aim assist settings explained?',
        a: `${link('Aimbot guide', '/blogs/once-human-aimbot-guide/')} walks through FOV and smoothing terminology.`,
      },
      ...shared,
    ];
  }

  if (slug === 'ugc') {
    return [
      {
        id: 'prod-ugc-1',
        topic: 'products',
        icon: 'faqProductsPage',
        q: 'Does UGC guarantee account recovery?',
        a: a('No. It is a case-management workspace; publishers decide outcomes.'),
      },
      ...shared,
    ];
  }

  if (slug === 'hwid-spoofer') {
    return [
      {
        id: 'prod-hwid-1',
        topic: 'products',
        icon: 'faqBlogSlugHwid',
        q: 'When is HWID tooling relevant?',
        a: a('When restrictions appear tied to hardware—not as a substitute for reading NetEase enforcement notices.'),
      },
      ...shared,
    ];
  }

  if (slug === 'cloud-dma') {
    return [
      {
        id: 'prod-dma-1',
        topic: 'products',
        icon: 'faqProductsPage',
        q: 'Is Cloud DMA the same as PC software?',
        a: a('No—separate merchant product for DMA hardware workflows. Confirm compatibility on the merchant listing.'),
      },
      ...shared,
    ];
  }

  return shared;
}

export function getBlogFaqs(_tag: string, _slug: string): SiteFaqItem[] {
  return [
    {
      id: 'blog-default-1',
      topic: 'blog',
      icon: 'faqBlogDefault1',
      q: 'Are blog guides official merchant documentation?',
      a: `Articles explain workflows. ${pcSoftware} feature lists and the merchant page are authoritative at checkout.`,
    },
    {
      id: 'blog-default-2',
      topic: 'safety',
      icon: 'faqBanRisk',
      q: 'Do guides promise safety or stealth?',
      a: a('No—guides discuss risk honestly and link to NetEase Fair Play context.'),
    },
  ];
}

export const compareRows = [
  { feature: 'Player ESP', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Loot ESP filters', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Radar overlay', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Aim assist tuning', icon: 'compareAutoCombo' as const, lite: true, pro: true, elite: true },
  { feature: 'Config profiles', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];