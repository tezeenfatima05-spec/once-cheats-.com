import { t } from '../i18n';
import { checkoutForSlug, checkoutPath, CHECKOUT } from '../config/checkout';
import type { IconName } from '../components/icons/types';
import { PRODUCT_BASE } from '../config/site';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

const brand = '/images/brand';
const merchantShots = '/images/products/once-human';

const sharedGoodToKnow =
  'Once Human and NetEase anti-cheat policies change with patches. Check compatibility notes on oncecheats.com before you purchase or launch. Console versions on PS5 and Xbox are not supported by these PC utilities.';

const sharedLimitations =
  'Third-party software can violate NetEase Terms of Service and lead to account restrictions. You accept all risk. Compatibility may change after game, anti-cheat, or Windows updates without notice.';

const pcSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: '64-bit Windows 10 or Windows 11 (PC only — not console).' },
  { icon: 'reqSteam', text: 'Current Once Human client via Steam or Epic Games Store.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation when required by the portal.' },
  { icon: 'reqWifi', text: 'Stable internet for downloads, updates, and license activation.' },
  { icon: 'reqCpu', text: 'Hardware that meets Once Human published PC requirements.' },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: [
      {
        num: '01',
        title: 'Review compatibility',
        desc: 'Read feature lists, PC-only notes, and risk information on oncecheats.com before checkout.',
      },
      {
        num: '02',
        title: 'Proceed to checkout',
        desc: 'Use Proceed to Checkout to open the authorized merchant page for your product.',
      },
      {
        num: '03',
        title: 'Activate via portal',
        desc: 'Follow merchant delivery instructions for license activation and loader access.',
      },
      {
        num: '04',
        title: 'Configure conservatively',
        desc: 'Load default profiles, test in a low-stakes session, and adjust settings gradually.',
      },
    ],
  };
}

const slides = {
  esp: {
    src: `${brand}/preview-esp.png`,
    alt: 'Illustrative ESP overlay preview for Once Human on PC',
    caption: 'ESP overlays',
    captionDesc: 'Player and world highlights with distance and filter controls in the software UI.',
  },
  aimbot: {
    src: `${brand}/preview-aimbot.png`,
    alt: 'Illustrative aim assist settings preview for Once Human on PC',
    caption: 'Aim assist settings',
    captionDesc: 'FOV, smoothing, and target selection sliders—configure before you queue.',
  },
  radar: {
    src: `${brand}/preview-radar.png`,
    alt: 'Illustrative radar overlay preview for Once Human on PC',
    caption: 'Radar overlay',
    captionDesc: 'Compact awareness layer for PvP encounters and open-world travel.',
  },
  ui: {
    src: `${brand}/preview-ui.png`,
    alt: 'Once Human cheat software configuration dashboard on PC',
    caption: 'Software dashboard',
    captionDesc: 'Hotkeys, config profiles, and module toggles in one launcher window.',
  },
  utility: {
    src: `${brand}/preview-utility.png`,
    alt: 'PC utility tool workflow illustration',
    caption: 'Utility workflow',
    captionDesc: 'Step-by-step checklist screens for HWID, recovery, or DMA-related tools.',
  },
} as const;

function slide(...keys: (keyof typeof slides)[]): ProductSlide[] {
  return keys.map((k) => slides[k]);
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  'pc-software': [
    'best-once-human-cheats',
    'once-human-esp-guide',
    'once-human-aimbot-guide',
    'once-human-cheats-safety',
    'once-human-installation',
    'once-human-cheats-faq',
  ],
  'hwid-spoofer': ['once-human-hwid-spoofer', 'once-human-cheats-safety', 'once-human-installation'],
  ugc: ['once-human-ugc-tool', 'once-human-cheats-safety', 'once-human-account-recovery'],
  'cloud-dma': ['once-human-cloud-dma', 'once-human-pc-requirements', 'once-human-installation'],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements' | 'about' | 'body'>
> = {
  'pc-software': {
    images: [
      {
        src: `${merchantShots}/merchant-visuals.webp`,
        alt: 'Once Human PC software visual ESP module panel screenshot',
        caption: 'Visual ESP modules',
        captionDesc: 'Player and world highlight controls in the merchant software UI.',
      },
      {
        src: `${merchantShots}/merchant-aimbot.webp`,
        alt: 'Once Human PC software aim assist settings screenshot',
        caption: 'Aim assist settings',
        captionDesc: 'FOV, smoothing, and target selection in the merchant dashboard.',
      },
      {
        src: `${merchantShots}/merchant-misc.webp`,
        alt: 'Once Human PC software misc configuration screenshot',
        caption: 'Misc configuration',
        captionDesc: 'Hotkeys, profiles, and additional module toggles.',
      },
      {
        src: `${merchantShots}/portal-visuals.webp`,
        alt: 'Once Human loader portal visuals tab screenshot',
        caption: 'Portal visuals tab',
        captionDesc: 'Alternate portal layout for ESP and overlay options.',
      },
    ],
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: pcSystemRequirements,
    fullFeatures: [
      'Player ESP with distance readouts',
      'Loot and container ESP filters',
      'Radar overlay for PvP awareness',
      'Aim assist with FOV customization',
      'Smoothing and target selection',
      'Visual color and opacity settings',
      'Hotkey bindings per module',
      'Config profile save and load',
      'PC-only — Steam and Epic clients',
    ],
    overview: {
      title: 'PC software built around awareness and aim features',
      paragraphs: [
        'The Once Human PC software combines ESP, radar, and aim assist modules in one external-style dashboard. Feature availability follows the merchant listing—compare modules on oncecheats.com before checkout.',
        'Designed for the Windows PC client only. Console builds on PlayStation and Xbox are out of scope for this product.',
      ],
    },
    about: [
      {
        type: 'p',
        text: 'Once Human blends open-world survival with PvE scenarios and PvP pressure from other Meta-Humans. ESP and radar modules focus on awareness; aim assist focuses on tuning—not automation that replaces core gunplay.',
      },
    ],
    body: [
      { type: 'h2', text: 'Modules buyers compare first' },
      {
        type: 'p',
        text: 'ESP highlights players, loot, and interactive objects. Radar compresses nearby threats into a compact overlay. Aim assist exposes FOV, smoothing, and bone or target priority—start with merchant defaults.',
      },
      { type: 'h2', text: 'Add-ons that pair with the main build' },
      {
        type: 'p',
        text: 'HWID Spoofer, UGC Tool, and Cloud DMA are separate utilities with their own checkout paths. Use them only when your situation matches the product description—not as ban guarantees.',
      },
    ],
  },
  'hwid-spoofer': {
    images: slide('utility', 'ui', 'esp'),
    goodToKnow:
      'Create a Windows restore point before hardware-level changes. Verify identifiers after a full reboot before launching Once Human.',
    limitations:
      'Spoofing does not reverse account-level restrictions by itself. Never run conflicting spoof tools together. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before changes.' },
      { icon: 'reqShieldGuide', text: 'Follow the merchant portal guide step by step.' },
      { icon: 'reqWifi', text: 'Internet access for verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation options',
      'Restore point checklist',
      'Compatibility scan',
      'Post-change verification',
      'Portal workflow documentation',
    ],
    overview: {
      title: 'Hardware identifier tooling for PC recovery workflows',
      paragraphs: [
        'The HWID Spoofer helps when fresh PC accounts fail on one machine but work elsewhere. It is a technical utility—not a promise that NetEase or Once Human will accept every new session.',
        'Pair with honest expectations: account bans may still apply even after hardware changes.',
      ],
    },
    body: [
      { type: 'h2', text: 'When operators consider it' },
      {
        type: 'p',
        text: 'Use after confirming the restriction looks hardware-bound rather than account-only. Read the [safety guide](/blogs/once-human-cheats-safety/) before you combine spoofing with gameplay software.',
      },
    ],
  },
  ugc: {
    images: slide('utility', 'ui', 'radar'),
    goodToKnow:
      'Gather order email, platform details, and restriction screenshots before opening merchant support. The UGC Tool structures workflows; it does not bypass publisher review.',
    limitations:
      'No guaranteed account recovery or unban. Outcomes depend on case type and publisher policy. Permanent sanctions may require a new account path.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at merchant checkout.' },
      { icon: 'reqShieldAccount', text: 'Account details and any restriction notice you received.' },
      { icon: 'reqWifiPortal', text: 'Internet access for dashboards and support.' },
    ],
    fullFeatures: [
      'Appeal workflow templates',
      'Case documentation structure',
      'Status tracking dashboard',
      'Evidence upload organization',
      'Follow-up reminder checklist',
      'Multi-platform case notes',
    ],
    overview: {
      title: 'Account governance workspace — not a guaranteed unban',
      paragraphs: [
        'The UGC Tool (Unban & Governance Control) is sold as an appeal and case-management workspace on the merchant site. oncecheats.com describes it neutrally: you organize disputes; publishers decide outcomes.',
        'Do not purchase expecting automatic restoration after NetEase Fair Play enforcement.',
      ],
    },
    body: [
      { type: 'h2', text: 'What the merchant listing typically covers' },
      {
        type: 'p',
        text: 'Workflow builders, evidence templates, and tracking—not hands-on account hacking. See [UGC explained](/blogs/once-human-ugc-tool/) for how it differs from gameplay software.',
      },
    ],
  },
  'cloud-dma': {
    images: slide('ui', 'utility', 'radar'),
    goodToKnow:
      'Cloud DMA setups depend on your hardware, firmware, and network. Read merchant requirements before purchase.',
    limitations:
      'DMA and cloud-assisted setups involve cost, latency, and compatibility risk. Not a substitute for reading Once Human system requirements.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Compatible 64-bit Windows PC with required DMA hardware when applicable.' },
      { icon: 'reqWifi', text: 'Stable low-latency connection for cloud components.' },
      { icon: 'reqSettings', text: 'Follow merchant wiring and firmware checklist exactly.' },
    ],
    fullFeatures: [
      'Cloud DMA onboarding checklist',
      'Firmware compatibility notes',
      'Latency and display guidance',
      'Secure portal access steps',
      'Support escalation path',
    ],
    overview: {
      title: 'Cloud DMA overview for advanced PC setups',
      paragraphs: [
        'Cloud DMA is a separate merchant product for operators who already use DMA hardware workflows. oncecheats.com links checkout only—capabilities and pricing live on the merchant product page.',
        'Confirm Once Human is listed as supported on the merchant listing before you buy.',
      ],
    },
    body: [
      { type: 'h2', text: 'Before checkout' },
      {
        type: 'p',
        text: 'Read [Cloud DMA explained](/blogs/once-human-cloud-dma/) and verify your hardware against the merchant spec sheet.',
      },
    ],
  },
};

function buildMainCheatPage(): ProductPage {
  const cheat = t.cheats.items[0]!;
  const content = productContent['pc-software'];
  return {
    slug: 'pc-software',
    kind: 'tier',
    badge: cheat.badge,
    tier: cheat.tier,
    name: cheat.name,
    title: cheat.title,
    subtitle: cheat.desc,
    desc: cheat.desc,
    features: cheat.features,
    more: cheat.more,
    variant: cheat.variant,
    buyUrl: checkoutForSlug('pc-software'),
    images: content.images,
    overview: content.overview,
    acquisition: acquisitionFor(cheat.title),
    goodToKnow: content.goodToKnow,
    limitations: content.limitations,
    fullFeatures: content.fullFeatures,
    systemRequirements: content.systemRequirements,
    about: content.about,
    body: content.body ?? [],
    relatedBlogSlugs: productRelatedBlogSlugs['pc-software'] ?? [],
  };
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => !p.href.endsWith(PRODUCT_BASE))
    .map((product) => {
      const slug = product.href.replace(PRODUCT_BASE, '').replace(/\/$/, '');
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: content.body ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [buildMainCheatPage(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides: ProductSlide[] = [
  {
    src: `${merchantShots}/merchant-visuals.webp`,
    alt: 'Once Human PC software visual ESP module panel screenshot',
    caption: 'Visual ESP modules',
    captionDesc: 'Player and world highlight controls in the merchant software UI.',
  },
  {
    src: `${merchantShots}/merchant-aimbot.webp`,
    alt: 'Once Human PC software aim assist settings screenshot',
    caption: 'Aim assist settings',
    captionDesc: 'FOV, smoothing, and target selection in the merchant dashboard.',
  },
  {
    src: `${merchantShots}/merchant-misc.webp`,
    alt: 'Once Human PC software misc configuration screenshot',
    caption: 'Misc configuration',
    captionDesc: 'Hotkeys, profiles, and additional module toggles.',
  },
];

export const productHub = {
  path: PRODUCT_BASE,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'Once Human PC software, HWID Spoofer, UGC Tool, and Cloud DMA—compare features and checkout paths on oncecheats.com.',
  buyUrl: checkoutPath('onceHuman'),
};

/** Add-on buttons shown on the main cheat product page. */
export const mainProductAddons = [
  { label: 'HWID Spoofer', href: checkoutPath('hwidSpoofer') },
  { label: 'UGC Tool', href: checkoutPath('ugc') },
  { label: 'Cloud DMA', href: checkoutPath('cloudDma') },
] as const;

export const AUTHORIZED_MERCHANT_URLS = Object.values(CHECKOUT);