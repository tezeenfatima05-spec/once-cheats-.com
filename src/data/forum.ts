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
  return { ...input, commentsCount: count };
}

/** Illustrative read-only discussions — not live customer threads. */
export const forumPosts: ForumPost[] = [
  thread({
    slug: 'esp-distance-filters-example',
    category: 'Features',
    categoryTone: 'purple',
    title: 'How do distance filters interact with player ESP?',
    excerpt: 'Example thread about trimming ESP clutter in crowded zones.',
    author: 'example_mod',
    age: '3 days ago',
    upvotes: 41,
    flair: 'Illustrative',
    body: [
      'In the ESP guide we cap distance so distant Meta-Humans do not flood the overlay. Start around 150m in open world and tighten for PvP zones.',
      'Pair distance caps with color rules so squad members stay readable.',
    ],
    comments: [
      { author: 'example_user_a', age: '2 days ago', score: 12, body: 'Lowering opacity on far targets helped more than shrinking distance.' },
      {
        author: 'example_user_b',
        age: '2 days ago',
        score: 8,
        body: 'Ultrawide needed a wider cap or the radar felt empty.',
        replies: [{ author: 'example_mod', age: '1 day ago', score: 5, body: 'Try separate PvE and PvP profiles.' }],
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
    excerpt: 'Example discussion on aim assist defaults for PC.',
    author: 'example_mod',
    age: '4 days ago',
    upvotes: 36,
    body: [
      'Wide FOV with low smoothing looks obvious in clips; the aimbot guide suggests narrow FOV first, then add smoothing until movement feels natural.',
    ],
    comments: [
      { author: 'example_user_c', age: '3 days ago', score: 9, body: 'Started at merchant defaults and only changed one slider per session.' },
      { author: 'example_user_d', age: '3 days ago', score: 4, body: 'Document hotkeys before changing FOV mid-fight.' },
    ],
    sourcePath: '/blogs/once-human-aimbot-guide/',
    sourceTitle: 'Once Human Aimbot Guide',
  }),
  thread({
    slug: 'radar-overlay-placement',
    category: 'Features',
    categoryTone: 'purple',
    title: 'Where do you park the radar on a 1440p panel?',
    excerpt: 'Illustrative UI placement notes.',
    author: 'example_user_e',
    age: '5 days ago',
    upvotes: 22,
    body: ['Bottom-left keeps radar clear of Once Human interaction prompts on most HUD scales.'],
    comments: [{ author: 'example_user_f', age: '4 days ago', score: 6, body: 'Moved it top-right for streaming layout.' }],
  }),
  thread({
    slug: 'loot-esp-tier-filters',
    category: 'Features',
    categoryTone: 'purple',
    title: 'Loot ESP tiers — fewer icons, faster runs',
    excerpt: 'Example farming thread.',
    author: 'example_user_g',
    age: '1 week ago',
    upvotes: 28,
    body: ['Filter to weapon crates only during bunker routes; re-enable meds before PvP areas.'],
    comments: [
      { author: 'example_mod', age: '6 days ago', score: 7, body: 'Cross-check filters after patches—loot tables shift.' },
    ],
  }),
  thread({
    slug: 'hotkey-profile-swapping',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'Switching configs with hotkeys safely',
    excerpt: 'Example workflow for PvE vs PvP profiles.',
    author: 'example_user_h',
    age: '6 days ago',
    upvotes: 19,
    body: ['Bind profile swap outside combat keys. Test in a quiet zone after each patch.'],
    comments: [{ author: 'example_user_i', age: '5 days ago', score: 3, body: 'Named profiles PvE and PvP to avoid mistakes.' }],
  }),
  thread({
    slug: 'windows-11-compatibility-notes',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'Windows 11 23H2 — any loader quirks?',
    excerpt: 'Illustrative compatibility checklist.',
    author: 'example_user_j',
    age: '1 week ago',
    upvotes: 31,
    body: ['Run merchant compatibility scan before first launch. Reboot after driver installs.'],
    comments: [
      { author: 'example_mod', age: '6 days ago', score: 11, body: 'See installation guide for admin and secure boot notes.' },
    ],
    sourcePath: '/blogs/once-human-installation/',
    sourceTitle: 'Installation guide',
  }),
  thread({
    slug: 'steam-vs-epic-client',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'Steam or Epic — does overlay path differ?',
    excerpt: 'Example client comparison.',
    author: 'example_user_k',
    age: '4 days ago',
    upvotes: 17,
    body: ['Both are PC-only paths listed on oncecheats.com. Follow portal notes for the client you actually play on.'],
    comments: [{ author: 'example_user_l', age: '3 days ago', score: 5, body: 'Epic install path mattered for shortcut targets.' }],
  }),
  thread({
    slug: 'patch-day-software-checklist',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'After a Once Human patch — what do you verify?',
    excerpt: 'Illustrative patch workflow.',
    author: 'example_mod',
    age: '2 days ago',
    upvotes: 44,
    body: ['Read patch notes, download any loader update from merchant, reset to default profile, test in a low-risk area.'],
    comments: [
      { author: 'example_user_m', age: '1 day ago', score: 8, body: 'Avoid PvP until ESP names render correctly.' },
      { author: 'example_user_n', age: '1 day ago', score: 4, body: 'Kept old profile backup before updating.' },
    ],
  }),
  thread({
    slug: 'fps-impact-overlay-settings',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'FPS dips when ESP density is maxed',
    excerpt: 'Example performance tuning.',
    author: 'example_user_o',
    age: '5 days ago',
    upvotes: 26,
    body: ['Reduce loot ESP range and disable redundant boxes. Pair with in-game graphics guide in blogs.'],
    comments: [{ author: 'example_mod', age: '4 days ago', score: 6, body: 'FPS boost article has Windows power plan steps too.' }],
    sourcePath: '/blogs/once-human-fps-boost/',
    sourceTitle: 'FPS boost guide',
  }),
  thread({
    slug: 'display-scaling-4k',
    category: 'Settings',
    categoryTone: 'blue',
    title: '125% display scaling vs overlay alignment',
    excerpt: 'Illustrative display setting thread.',
    author: 'example_user_p',
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
    excerpt: 'Example utility comparison.',
    author: 'example_mod',
    age: '3 days ago',
    upvotes: 33,
    body: ['HWID tools address hardware identifiers. UGC organizes appeals. Neither guarantees NetEase reverses a sanction.'],
    comments: [
      { author: 'example_user_q', age: '2 days ago', score: 7, body: 'Read safety guide before combining utilities with gameplay software.' },
    ],
  }),
  thread({
    slug: 'cloud-dma-prerequisites',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'Cloud DMA — what to verify on the merchant page',
    excerpt: 'Illustrative DMA setup questions.',
    author: 'example_user_r',
    age: '6 days ago',
    upvotes: 21,
    body: ['Confirm firmware, cabling, and game support on merchant docs before checkout.'],
    comments: [{ author: 'example_mod', age: '5 days ago', score: 5, body: 'Separate product from PC software—different checkout.' }],
    sourcePath: '/blogs/once-human-cloud-dma/',
  }),
  thread({
    slug: 'ban-risk-fair-play-context',
    category: 'Compatibility',
    categoryTone: 'orange',
    title: 'NetEase Fair Play posts — how do you interpret them?',
    excerpt: 'Illustrative risk discussion.',
    author: 'example_mod',
    age: '1 week ago',
    upvotes: 52,
    body: ['Official announcements describe enforcement trends. Treat them as reason to assume risk—not as something cheats bypass.'],
    comments: [
      { author: 'example_user_s', age: '6 days ago', score: 10, body: 'No tool here promises stealth.' },
      { author: 'example_user_t', age: '5 days ago', score: 3, body: 'Account risk is separate from hardware tools.' },
    ],
    sourcePath: '/blogs/once-human-cheats-safety/',
  }),
  thread({
    slug: 'license-activation-flow',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'License key did not attach on first login',
    excerpt: 'Example activation troubleshooting.',
    author: 'example_user_u',
    age: '2 days ago',
    upvotes: 16,
    body: ['Use the same email as checkout. Wait for merchant confirmation mail before pasting keys.'],
    comments: [{ author: 'example_mod', age: '1 day ago', score: 4, body: 'Support page lists what to include in tickets.' }],
  }),
  thread({
    slug: 'choosing-main-software-checkout',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'Which checkout button is the main Once Human build?',
    excerpt: 'Illustrative purchase path question.',
    author: 'example_user_v',
    age: '3 days ago',
    upvotes: 27,
    body: ['Proceed to Checkout on the PC software page uses /go/once-human/. Utilities have their own buttons.'],
    comments: [{ author: 'example_mod', age: '2 days ago', score: 8, body: 'Buying guide walks through comparison.' }],
    sourcePath: '/blogs/best-once-human-cheats/',
  }),
  thread({
    slug: 'config-backup-habit',
    category: 'Settings',
    categoryTone: 'blue',
    title: 'Exporting profiles before patches',
    excerpt: 'Example profile hygiene.',
    author: 'example_user_w',
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
    author: 'example_user_x',
    age: '5 days ago',
    upvotes: 23,
    body: ['Borderless vs exclusive fullscreen changes injection behavior. Restart loader after toggling.'],
    comments: [
      { author: 'example_user_y', age: '4 days ago', score: 5, body: 'Verified Once Human was on primary monitor.' },
    ],
  }),
  thread({
    slug: 'subscription-options-merchant-side',
    category: 'Utilities',
    categoryTone: 'green',
    title: 'Where did monthly vs lifetime pricing go on oncecheats.com?',
    excerpt: 'Example note about pricing UI removal.',
    author: 'example_mod',
    age: '1 day ago',
    upvotes: 15,
    body: ['oncecheats.com shows features only. Plans appear on the merchant checkout after Proceed to Checkout.'],
    comments: [{ author: 'example_user_z', age: '20 hours ago', score: 2, body: 'Pricing guide blog still compares concepts, not dollar amounts on-site.' }],
    sourcePath: '/blogs/once-human-cheats-pricing/',
  }),
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}