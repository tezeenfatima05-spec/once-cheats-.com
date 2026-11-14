export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  /** Optional SEO title (~45–60 chars); defaults at render. */
  metaTitle?: string;
  /** Optional meta description; defaults to excerpt. */
  metaDescription?: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'Features', tone: 'purple', icon: 'users' },
  { name: 'Settings', tone: 'blue', icon: 'navBlog' },
  { name: 'Compatibility', tone: 'orange', icon: 'refresh' },
  { name: 'Utilities', tone: 'green', icon: 'messageCircle' },
] as const;

function thread(input: Omit<ForumPost, 'commentsCount' | 'comments'> & { comments: ForumComment[] }): ForumPost {
  const count = input.comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);
  const metaDescription =
    input.metaDescription ??
    (input.excerpt.length >= 72
      ? input.excerpt
      : `${input.excerpt} Illustrative Once Human PC notes on oncecheats.com (read-only).`);
  return { ...input, commentsCount: count, metaDescription };
}

/** Illustrative read-only discussions — not live customer threads. */
export const forumPosts: ForumPost[] = [
  thread({
    slug: 'esp-distance-filters-example',
    category: 'Features',
    categoryTone: 'purple',
    title: 'How do distance filters interact with player ESP?',
    metaDescription:
      'Illustrative thread on oncecheats.com: trimming Once Human player ESP distance filters on PC so crowded zones stay readable.',
    excerpt: 'How I trim ESP distance so crowded zones on PC do not look like a light show—settings from our ESP guide.',
    author: 'mira_k',
    age: '3 days ago',
    upvotes: 41,
    flair: 'Illustrative',
    body: [
      'In the ESP guide we cap distance so distant Meta-Humans do not flood the overlay. Start around 150m in open world and tighten for PvP zones.',
      'Pair distance caps with color rules so squad members stay readable.',
    ],
    comments: [
      { author: 'member_a', age: '2 days ago', score: 12, body: 'Lowering opacity on far targets helped more than shrinking distance.' },
      {
        author: 'member_b',
        age: '2 days ago',
        score: 8,
        body: 'Ultrawide needed a wider cap or the radar felt empty.',
        replies: [{ author: 'mira_k', age: '1 day ago', score: 5, body: 'Try separate PvE and PvP profiles.' }],
      },
    ],
    sourceTitle: 'Once Human ESP Guide',
    sourcePath: '/blogs/once-human-esp-guide/',
  }),
  thread({
    slug: 'aimbot-fov-smoothing-example',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'FOV vs smoothing — what to tune first?',
    metaDescription:
      'Illustrative oncecheats.com discussion: aim assist FOV vs smoothing defaults for Once Human on Windows PC.',
    excerpt: 'Narrow FOV first, then smoothing—how I tune aim assist on PC without looking robotic in clips.',
    author: 'mira_k',
    age: '4 days ago',
    upvotes: 36,
    body: [
      'Wide FOV with low smoothing looks obvious in clips; the aimbot guide suggests narrow FOV first, then add smoothing until movement feels natural.',
    ],
    comments: [
      { author: 'member_c', age: '3 days ago', score: 9, body: 'Started at merchant defaults and only changed one slider per session.' },
      { author: 'member_d', age: '3 days ago', score: 4, body: 'Document hotkeys before changing FOV mid-fight.' },
    ],
    sourcePath: '/blogs/once-human-aimbot-guide/',
    sourceTitle: 'Once Human Aimbot Guide',
  }),
  thread({
    slug: 'radar-overlay-placement',
    category: 'Features',
    categoryTone: 'purple',
    title: 'Where do you park the radar on a 1440p panel?',
    excerpt: 'Once Human cheats radar placement on 1440p—illustrative UI notes for ESP and warfare rotations.',
    author: 'member_e',
    age: '5 days ago',
    upvotes: 22,
    body: ['Bottom-left keeps radar clear of Once Human interaction prompts on most HUD scales.'],
    comments: [{ author: 'member_f', age: '4 days ago', score: 6, body: 'Moved it top-right for streaming layout.' }],
  }),
  thread({
    slug: 'loot-esp-tier-filters',
    category: 'Features',
    categoryTone: 'purple',
    title: 'Loot ESP tiers — fewer icons, faster runs',
    excerpt: 'Loot ESP tier filters for Once Human cheats farming routes—fewer icons, faster bunker clears on PC.',
    author: 'member_g',
    age: '1 week ago',
    upvotes: 28,
    body: ['Filter to weapon crates only during bunker routes; re-enable meds before PvP areas.'],
    comments: [
      { author: 'mira_k', age: '6 days ago', score: 7, body: 'Cross-check filters after patches—loot tables shift.' },
    ],
  }),
  thread({
    slug: 'hotkey-profile-swapping',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'Switching configs with hotkeys safely',
    excerpt: 'Hotkey profile swaps for Once Human cheats—split PvE farm and PvP warfare presets on Windows.',
    author: 'member_h',
    age: '6 days ago',
    upvotes: 19,
    body: ['Bind profile swap outside combat keys. Test in a quiet zone after each patch.'],
    comments: [{ author: 'member_i', age: '5 days ago', score: 3, body: 'Named profiles PvE and PvP to avoid mistakes.' }],
  }),
  thread({
    slug: 'windows-11-compatibility-notes',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'Windows 11 23H2 — any loader quirks?',
    excerpt: 'Illustrative compatibility checklist.',
    author: 'member_j',
    age: '1 week ago',
    upvotes: 31,
    body: ['Run merchant compatibility scan before first launch. Reboot after driver installs.'],
    comments: [
      { author: 'mira_k', age: '6 days ago', score: 11, body: 'See installation guide for admin and secure boot notes.' },
    ],
    sourcePath: '/blogs/once-human-installation/',
    sourceTitle: 'Installation guide',
  }),
  thread({
    slug: 'steam-vs-epic-client',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'Steam or Epic — does overlay path differ?',
    excerpt: 'Steam vs Epic paths for Once Human PC cheats—same Windows client, different install shortcuts.',
    author: 'member_k',
    age: '4 days ago',
    upvotes: 17,
    body: ['Both are PC-only paths listed on oncecheats.com. Follow portal notes for the client you actually play on.'],
    comments: [{ author: 'member_l', age: '3 days ago', score: 5, body: 'Epic install path mattered for shortcut targets.' }],
  }),
  thread({
    slug: 'patch-day-software-checklist',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'After a Once Human patch — what do you verify?',
    excerpt: 'Illustrative patch workflow.',
    author: 'mira_k',
    age: '2 days ago',
    upvotes: 44,
    body: ['Read patch notes, download any loader update from merchant, reset to default profile, test in a low-risk area.'],
    comments: [
      { author: 'member_m', age: '1 day ago', score: 8, body: 'Avoid PvP until ESP names render correctly.' },
      { author: 'member_n', age: '1 day ago', score: 4, body: 'Kept old profile backup before updating.' },
    ],
  }),
  thread({
    slug: 'fps-impact-overlay-settings',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'FPS dips when ESP density is maxed',
    excerpt: 'FPS dips when Once Human ESP is maxed—cheats overlay tuning with in-game graphics on PC.',
    author: 'member_o',
    age: '5 days ago',
    upvotes: 26,
    body: ['Reduce loot ESP range and disable redundant boxes. Pair with in-game graphics guide in blogs.'],
    comments: [{ author: 'mira_k', age: '4 days ago', score: 6, body: 'FPS boost article has Windows power plan steps too.' }],
    sourcePath: '/blogs/once-human-fps-boost/',
    sourceTitle: 'FPS boost guide',
  }),
  thread({
    slug: 'display-scaling-4k',
    category: 'Settings',
    categoryTone: 'blue',
    title: '125% display scaling vs overlay alignment',
    excerpt: 'Windows display scaling vs Once Human cheat overlay alignment—illustrative 4K setup notes.',
    author: 'member_p',
    age: '1 week ago',
    upvotes: 14,
    body: ['Match Windows scaling before calibrating radar position; mismatched scaling shifts overlay anchors.'],
    comments: [],
  }),
  thread({
    slug: 'comparing-utilities-hwid-ugc',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'HWID spoofer vs UGC — different problems',
    excerpt: 'HWID Spoofer vs UGC for Once Human—cheats utilities solve different PC restriction problems.',
    author: 'mira_k',
    age: '3 days ago',
    upvotes: 33,
    body: ['HWID tools address hardware identifiers. UGC organizes appeals. Neither guarantees NetEase reverses a sanction.'],
    comments: [
      { author: 'member_q', age: '2 days ago', score: 7, body: 'Read safety guide before combining utilities with gameplay software.' },
    ],
  }),
  thread({
    slug: 'cloud-dma-prerequisites',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'Cloud DMA — what to verify on the merchant page',
    excerpt: 'Illustrative DMA setup questions.',
    author: 'member_r',
    age: '6 days ago',
    upvotes: 21,
    body: ['Confirm firmware, cabling, and game support on merchant docs before checkout.'],
    comments: [{ author: 'mira_k', age: '5 days ago', score: 5, body: 'Separate product from PC software—different checkout.' }],
    sourcePath: '/blogs/once-human-cloud-dma/',
  }),
  thread({
    slug: 'ban-risk-fair-play-context',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'NetEase Fair Play posts — how do you interpret them?',
    excerpt: 'Illustrative risk discussion.',
    author: 'mira_k',
    age: '1 week ago',
    upvotes: 52,
    body: ['Official announcements describe enforcement trends. Treat them as reason to assume risk—not as something cheats bypass.'],
    comments: [
      { author: 'member_s', age: '6 days ago', score: 10, body: 'No tool here promises stealth.' },
      { author: 'member_t', age: '5 days ago', score: 3, body: 'Account risk is separate from hardware tools.' },
    ],
    sourcePath: '/blogs/once-human-cheats-safety/',
  }),
  thread({
    slug: 'license-activation-flow',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'License key did not attach on first login',
    excerpt: 'Once Human cheats license activation on PC—illustrative portal and email mismatch notes.',
    author: 'member_u',
    age: '2 days ago',
    upvotes: 16,
    body: ['Use the same email as checkout. Wait for merchant confirmation mail before pasting keys.'],
      comments: [{ author: 'mira_k', age: '1 day ago', score: 4, body: 'Support hub and Discord list what to include in tickets.' }],
  }),
  thread({
    slug: 'choosing-main-software-checkout',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'Which checkout button is the main Once Human build?',
    excerpt: 'Illustrative purchase path question.',
    author: 'member_v',
    age: '3 days ago',
    upvotes: 27,
    body: ['Proceed to Checkout on the PC software page uses /go/once-human/. Utilities have their own buttons.'],
    comments: [{ author: 'mira_k', age: '2 days ago', score: 8, body: 'Buying guide walks through comparison.' }],
    sourcePath: '/blogs/best-once-human-cheats/',
  }),
  thread({
    slug: 'config-backup-habit',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'Exporting profiles before patches',
    excerpt: 'Export Once Human cheat profiles before seasonal patches—illustrative cloud and local backup habit.',
    author: 'member_w',
    age: '4 days ago',
    upvotes: 18,
    body: ['Cloud backup helps, but keep a local copy when Season updates land.'],
    comments: [],
  }),
  thread({
    slug: 'troubleshoot-overlay-not-showing',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'Overlay missing after fullscreen swap',
    excerpt: 'Illustrative troubleshooting.',
    author: 'member_x',
    age: '5 days ago',
    upvotes: 23,
    body: ['Borderless vs exclusive fullscreen changes injection behavior. Restart loader after toggling.'],
    comments: [
      { author: 'member_y', age: '4 days ago', score: 5, body: 'Verified Once Human was on primary monitor.' },
    ],
  }),
  thread({
    slug: 'subscription-options-merchant-side',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'Where did monthly vs lifetime pricing go on oncecheats.com?',
    excerpt: 'Once Human cheats pricing lives on merchant checkout—illustrative note after on-site plan UI removal.',
    author: 'mira_k',
    age: '1 day ago',
    upvotes: 15,
    body: ['oncecheats.com shows features only. Plans appear on the merchant checkout after Proceed to Checkout.'],
    comments: [{ author: 'member_z', age: '20 hours ago', score: 2, body: 'Pricing guide blog still compares concepts, not dollar amounts on-site.' }],
    sourcePath: '/blogs/once-human-cheats-pricing/',
  }),
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}