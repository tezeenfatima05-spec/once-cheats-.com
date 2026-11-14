import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { DISCORD_INVITE_URL, PRODUCT_BASE } from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: 'Once Human Cheats',
    domain: 'oncecheats.com',
    title: 'Once Human Cheats for PC | ESP & Aimbot Features',
    description:
      'Explore Once Human cheats for PC, compare available features, check compatibility details, and learn the risks and options before you buy.',
    discord: DISCORD_INVITE_URL,
  },
  nav: [
    { href: `${productBase}`, label: 'Products' },
    { href: '/blogs/', label: 'Blogs' },
    { href: '/forum/', label: 'Forum' },
    { href: '/faq/', label: 'FAQ' },
    { href: DISCORD_INVITE_URL, label: 'Support', ariaLabel: 'Join Once Human Cheats on Discord' },
  ],
  hero: {
    status: 'Once Human — PC build online',
    eyebrow: 'PC software guides',
    title: 'Once Human Cheats',
    subtitle:
      'Compare Once Human PC software features—ESP, radar, loot filters, and aim assist—for the Steam and Epic Windows client. Console versions are not supported.',
    ctaPrimary: 'View products',
    ctaBuyNow: 'Buy now',
    ctaSupport: 'Get support',
    modesLabel: 'Once Human modes',
    modes: ['PvE', 'PvP', 'Open World', 'Co-op'],
    metrics: [
      { label: 'Platform', strong: 'PC only' },
      { label: 'Clients', strong: 'Steam & Epic' },
      { label: 'Modules', strong: 'ESP & aim' },
      { label: 'Docs', strong: 'Guides' },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'ESP, Aimbot & PC Software Features',
    subtitle: 'Verified modules for Once Human on Windows—player ESP, loot filters, radar, and aim assist tuning.',
    items: [
      {
        title: 'Player ESP',
        subtitle: 'See threats early.',
        desc: 'Player boxes, distance text and HP readouts for PvP hunts and open-world travel on Windows.',
        bullets: [
          'Distance caps and color filters',
          'Meta-Human highlights through smoke and terrain',
          'Team-safe color modes where supported',
          'Performance sliders for crowded zones',
        ],
        tags: ['once human esp', 'player esp', 'pc cheats'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'Loot & Container ESP',
        subtitle: 'Farm faster.',
        desc: 'Surface loot tiers and interactive containers without tabbing every crate in a bunker run.',
        bullets: [
          'Tier filters to reduce clutter',
          'Container category toggles',
          'Distance-based fade',
        ],
        tags: ['loot esp', 'container esp', 'farming'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Radar Overlay',
        subtitle: 'Rotations on a glance.',
        desc: 'Compact ring for nearby threats when ESP would overload the screen.',
        bullets: ['Radius presets for PvP vs PvE', 'Position lock for ultrawide', 'Pairs with player ESP'],
        tags: ['once human radar', 'pvp awareness', 'overlay'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'Aim Assist',
        subtitle: 'Tune, do not automate.',
        desc: 'FOV, smoothing and target priority sliders—start conservative in warfare servers.',
        bullets: ['Hold-key activation', 'Per-weapon profiles', 'Bone priority controls'],
        tags: ['aim assist', 'aimbot settings', 'pvp'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'World ESP',
        subtitle: 'Objective awareness.',
        desc: 'Highlight world objects and POIs that matter for seasonal routes and boss prep.',
        bullets: [
          'Category toggles per biome',
          'Distance limits for clarity',
          'Pairs with radar presets',
        ],
        tags: ['world esp', 'pve routes', 'objectives'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Config Profiles',
        subtitle: 'Ranked vs farm presets.',
        desc: 'Save PvE farm, PvP warfare and squad presets—cloud backup through the portal.',
        bullets: [
          'Hotkey profile switching',
          'Cloud sync between PCs',
          'Import merchant defaults first',
        ],
        tags: ['config', 'profiles', 'cloud sync'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'Stream Proof',
        subtitle: 'Creators stay safe.',
        desc: 'Hide overlays from OBS and Game Bar while keeping them on your monitor.',
        bullets: ['Capture-safe toggle', 'Test checklist in docs', 'Per-module hide'],
        tags: ['obs safe', 'stream proof', 'capture hide'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Hotkeys',
        subtitle: 'Control without tabbing out.',
        desc: 'Bind ESP, radar and aim assist toggles for mid-fight adjustments.',
        bullets: ['Panic-off bind', 'Per-module toggles', 'Profile switch keys'],
        tags: ['hotkeys', 'bindings', 'overlay'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
      {
        title: 'Cloud Updates',
        subtitle: 'Patch day ready.',
        desc: 'Loader builds and preset notes track NetEase and client patches.',
        bullets: ['Status banner on site', 'Portal push notifications', 'Merchant status page'],
        tags: ['patch day', 'auto update', 'netease'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'PC tooling backed by patches—not promises',
    subtitle:
      'Most cheat shops ship stale loaders and obvious automation. oncecheats.com is built around patch-day delivery, conservative defaults, and live operators for Windows Steam and Epic clients.',
    usLabel: 'Once Human Cheats',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Patch-day loader updates',
        desc: 'Builds pushed after major Once Human or anti-cheat updates—check the site status banner before you queue.',
      },
      {
        title: 'Conservative module defaults',
        desc: 'ESP distance caps and hold-key aim assist mimic careful play—not day-one max FOV configs that flood reports.',
      },
      {
        title: 'Portal & email support',
        desc: 'Merchant and site support paths for loader setup, profiles, and HWID questions—not copy-paste FAQ tickets.',
      },
      {
        title: 'External loader architecture',
        desc: 'Dashboard-driven modules with stream-proof options—no injecting into the game process like legacy shops.',
      },
      {
        title: 'Cloud preset sync',
        desc: 'Farm, PvP and squad profiles backup to the portal—same sliders on any Windows PC.',
      },
      {
        title: 'HWID reset & license moves',
        desc: 'Machine transfers handled through the merchant portal—limits follow your tier.',
      },
    ],
    metrics: [
      {
        value: '<24h',
        title: 'Patch turnaround',
        desc: 'Average time to ship a loader build after major Once Human or NetEase changes.',
      },
      {
        value: '24/7',
        title: 'Operator support',
        desc: 'Support via merchant portal and email when you need setup or config help.',
      },
      {
        value: 'PC',
        title: 'Windows clients',
        desc: 'Steam and Epic builds only—console storefronts are not supported here.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup guide',
    titleLead: 'From checkout to first session in just',
    titleHighlight: 'three simple steps',
    intro:
      'Follow the operator portal to download the loader, import presets, and launch Once Human on Steam or Epic—with support pages linked if anything blocks you.',
    ctaPrimary: 'View products',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Unlock portal & download loader',
        desc: 'Complete checkout, open your operator dashboard, and pull the latest Windows loader build.',
      },
      {
        step: 'Step 2',
        title: 'Launch & configure modules',
        desc: 'Run the external loader, import default ESP and radar presets, and tune aim assist sliders.',
      },
      {
        step: 'Step 3',
        title: 'Verify status & launch Once Human',
        desc: 'Check the live status banner, open Steam or Epic, and play with cloud-backed profiles saved in the portal.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'PC only—check the live status banner before launching after updates.',
    items: ['Windows 10 & 11', 'Steam & Epic', 'Once Human PC client', 'Auto updater', 'Config cloud sync', 'Email support', 'HWID reset', 'External loader'],
  },
  cheats: {
    eyebrow: 'PC software',
    title: 'Once Human PC software',
    subtitle: 'ESP, radar, aim assist, loot filters, and cloud configs—one cheat product for Windows.',
    viewAll: 'View software details',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        tier: 'PC',
        name: 'Software',
        title: 'Once Human PC Software',
        desc: 'Full awareness and aim suite for Steam and Epic on Windows—ESP, radar, aim assist, profiles, and patch-day loader updates.',
        features: ['Player ESP', 'Loot ESP', 'Radar overlay', 'Aim assist', 'Config profiles', 'PC-only Steam & Epic'],
        more: 14,
        href: `${productBase}pc-software/`,
        variant: 'popular',
      },
    ],
  },
  products: {
    eyebrow: 'Products',
    title: 'Once Human products',
    subtitle: 'PC software plus HWID Spoofer, UGC Tool, and Cloud DMA utilities.',
    viewAll: 'View all products',
    get: 'Get',
    explore: 'Explore',
    items: [
      {
        badge: 'Available',
        category: 'System utility',
        title: 'HWID Spoofer',
        subtitle: 'Clean slate for your PC',
        desc: 'Hardware ID spoofing for disk serials, MAC addresses and GPU IDs—follow the portal checklist before launching Once Human.',
        features: ['Spoofer & cleanup tools', 'Serial profile rotation', 'Compatibility scan', 'Post-spoof verification'],
        more: 9,
        href: `${productBase}hwid-spoofer/`,
      },
      {
        badge: 'Available',
        category: 'Account recovery',
        title: 'UGC Tool',
        subtitle: 'Unban & governance control',
        desc: 'Appeal workspace for restrictions, security holds and dispute documentation—workflows and tracking, not ban guarantees.',
        features: ['Custom appeal workflows', 'Dispute automation', 'Case documentation', 'Status tracking dashboard'],
        more: 6,
        href: `${productBase}ugc/`,
      },
      {
        badge: 'Available',
        category: 'Advanced PC',
        title: 'Cloud DMA',
        subtitle: 'DMA hardware workflows',
        desc: 'Separate merchant product for operators with DMA kits—firmware checks, latency notes, and Once Human support flags on the listing.',
        features: ['Cloud DMA onboarding', 'Firmware compatibility', 'Latency guidance', 'Portal escalation path'],
        more: 8,
        href: `${productBase}cloud-dma/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Once Human cheats guides',
    subtitle: 'Trending PC topics: ESP, radar, aim assist, Meta-Human PvP, patch-day checks, utilities, and buying guides for Steam and Epic.',
    latestTitle: 'Once Human Cheats Guides',
    latestSubtitle: 'Filter by topic or sort to find setup guides, feature deep-dives, and safety notes.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    sortTitleAsc: 'A–Z',
    sortTitleDesc: 'Z–A',
    emptyFilter: 'No articles match this filter.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [],
  },
  toolkit: {
    eyebrow: 'Software',
    title: 'Organized, easy to configure',
    subtitle: 'Modules grouped for quick tuning between PvE routes and PvP hunts.',
    items: [
      { num: '01', label: 'ESP', title: 'Players and loot', desc: 'Player, loot and world ESP filters in one tab.' },
      { num: '02', label: 'Radar', title: 'Threat ring', desc: 'Radius, opacity, and position for compact awareness.' },
      { num: '03', label: 'Aim', title: 'Assist tuning', desc: 'FOV, smoothing, and target priority sliders.' },
      { num: '04', label: 'World', title: 'POI highlights', desc: 'Objective categories for seasonal farming.' },
      { num: '05', label: 'Profiles', title: 'Mode presets', desc: 'Farm, PvP and squad configs with cloud backup.' },
      { num: '06', label: 'Utilities', title: 'Add-on tools', desc: 'HWID, UGC, and Cloud DMA checkout paths when you need them.' },
    ],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 easy steps',
    titleBefore: 'From status check to',
    titleHighlight: 'saved profile.',
    subtitle: 'A straight path from purchase to a Once Human profile you can reuse every session.',
    ctaLabel: 'View products',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check live status',
        desc: 'Read the banner on oncecheats.com before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Choose your product',
        desc: 'PC Software for gameplay modules—or utilities if your situation needs HWID, UGC, or DMA.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch & configure',
        desc: 'Download from the portal, enable modules, and tune ESP distance in a quiet zone.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your profile',
        desc: 'When settings feel right, save farm and PvP presets to the cloud.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Field notes',
    title: 'Built for how Once Human plays.',
    items: [
      { num: '01', title: 'Patch-day ready', desc: 'Compatibility notes on the site and merchant portal before long sessions—check after NetEase updates.' },
      { num: '02', title: 'Conservative defaults', desc: 'Start with safe ESP distance and hold-key aim assist—tune up gradually.' },
      { num: '03', title: 'Support channels', desc: 'Stuck on loader or profiles? Use merchant support and the site FAQ first.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Once Human Cheats support',
    subtitle: 'Let us know how we can help.',
    channels: [
      {
        icon: 'compatDiscord',
        title: 'Community Discord',
        desc: 'Join for setup help, status pings, and merchant support hours after checkout.',
        linkLabel: 'Join Discord',
        href: DISCORD_INVITE_URL,
      },
      {
        icon: 'users',
        title: 'Chat before checkout',
        desc: 'Speak to our team about PC software and utilities.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'headphones',
        title: 'Chat to support',
        desc: "We're here for loader, HWID and account issues.",
        linkLabel: 'support@oncecheats.com',
        href: 'mailto:support@oncecheats.com',
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'Compatibility, bans and setup—before you buy.',
        linkLabel: 'View all FAQ',
        href: '/faq/',
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at checkout on oncecheats.com or via our secure checkout.' },
      { title: 'Platform', desc: 'Steam or Epic on Windows 10 or 11—and your Once Human client version.' },
      { title: 'Error detail', desc: 'Screenshot or exact message from the loader or storefront.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers before checkout.',
    subtitle: 'Compatibility, bans and access—no vague promises.',
    items: [
      {
        num: '01',
        q: 'Where do I check if Once Human cheats are online?',
        a: 'Check compatibility notes on oncecheats.com and your merchant portal status after every Once Human or NetEase update.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Your portal unlocks the loader, setup guide and config library via our secure checkout. Follow the guide before launching Once Human.',
      },
      {
        num: '03',
        q: 'Can I get banned using third-party software?',
        a: 'Yes—any modification carries risk. NetEase enforcement and player reports evolve. Read current status and accept the risk before use.',
      },
      {
        num: '04',
        q: 'Which platforms are supported?',
        a: 'Once Human via Steam or Epic on Windows 10/11 64-bit only. PlayStation, Xbox, and macOS are not supported.',
      },
      {
        num: '05',
        q: 'Can I move my license to a new PC?',
        a: 'Use the HWID reset in your merchant portal or contact support with your order email. Limits depend on your tier.',
      },
      {
        num: '06',
        q: 'Where are products and utilities listed?',
        a: 'PC Software, HWID Spoofer, UGC Tool, and Cloud DMA live under oncecheats.com/products/once-human/ with checkout via our partner.',
      },
    ],
  },
  footer: {
    tagline: 'Once Human cheats — ESP, radar and tools for PC. oncecheats.com',
    explore: 'Explore',
    exploreLinks: [
      { href: '/', label: 'Feature overview', ariaLabel: 'Features', scrollTarget: 'features' },
      { href: '/products/once-human/pc-software/', label: 'PC software', ariaLabel: 'PC software' },
      { href: '/products/once-human/', label: 'All products & utilities', ariaLabel: 'Products' },
      { href: '/blogs/', label: 'Read guides', ariaLabel: 'Blogs' },
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About Once Human Cheats',
      description:
        'Once Human Cheats provides PC software, utility tools and support resources at oncecheats.com.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'Once Human Cheats is a PC-focused resource for players exploring ESP, radar, aim assist and utility workflows on Windows. We publish setup guides, safety notes, and live status information so you can evaluate products before checkout.',
            'All product names are used for identification only.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'Our site covers PC Software, HWID Spoofer, UGC Tool, and Cloud DMA. Blog articles explain conservative configs, patch-day checks, and NetEase update behavior.',
            'Content is updated when patches land or loader modules shift. Check compatibility notes on oncecheats.com before every session.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Questions about compatibility, loader errors, or checkout go through email and merchant support. Include your order email, storefront, and Windows version.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How Once Human Cheats handles analytics, cookies, and contact data when you use oncecheats.com.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout and license delivery happen on external checkout pages—we do not store payment card data on oncecheats.com.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us understand which guides and product pages are useful so we can improve content and fix broken links. Support tickets may retain the email address and message content you provide until the issue is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics. You can block cookies in your browser settings; core site content remains accessible without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions, use the options on the Support page. Purchase and refund rules are in our Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description:
        'Purchase, license, refund, and use terms for Once Human Cheats products and oncecheats.com.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: November 2026. By using oncecheats.com or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell access to Once Human PC Software and utility tools (HWID Spoofer, UGC Tool, Cloud DMA) delivered through an operator portal and loader for Steam or Epic on Windows.',
            'Feature lists on each product page describe what is included at the time of purchase. Modules can change when Once Human or anti-cheat systems update.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. oncecheats.com does not process or store payment card numbers.',
            'After purchase, use the operator portal linked from your order flow to download the current loader and setup guide before launching Once Human.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, NetEase penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup—Steam or Epic Once Human on Windows 10/11, current loader from the portal, and the live status banner showing online when you started—contact us through the Support page. Include your order email, Windows version, client build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for Once Human can conflict with game updates and anti-cheat systems. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not enter high-risk PvP while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'Once Human Cheats Support',
      description:
        'Get support for loader, HWID, and checkout questions at oncecheats.com.',
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'Once Human Cheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Join Once Human Cheats on Discord',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
  },
};
