/** Page-specific meta keywords for /blogs/{slug}/ (Once Human Cheats focus). */
export const BLOG_KEYWORDS: Record<string, string> = {
  'best-once-human-cheats':
    'once human cheats, buy once human cheats, best once human cheats 2026, once human esp, once human aimbot, once human pc cheats',
  'once-human-esp-guide':
    'once human esp, once human cheats esp, meta-human esp, loot esp once human, player esp once human, pc cheats',
  'once-human-aimbot-guide':
    'once human aimbot, once human aim assist, once human cheats aimbot, pvp once human cheats, fov smoothing once human',
  'once-human-radar-guide':
    'once human radar, once human cheats radar, pvp radar once human, warfare zone cheats, once human overlay',
  'once-human-cheats-safety':
    'once human cheats safety, ban risk once human, netease anti cheat, once human fair play, safe once human cheats',
  'once-human-installation':
    'once human cheat install, once human loader, once human cheats setup, steam epic once human cheats, windows pc cheats',
  'once-human-cheats-faq':
    'once human cheats faq, once human cheats questions, once human pc support, once human license, oncecheats.com',
  'once-human-hwid-spoofer':
    'once human hwid spoofer, hwid once human, once human hardware ban, once human cheats utilities',
  'once-human-ugc-tool':
    'once human ugc tool, once human account appeal, once human ban appeal, once human cheats utilities',
  'once-human-account-recovery':
    'once human account recovery, once human ban, steam epic once human restriction, once human cheats account',
  'once-human-cloud-dma':
    'once human cloud dma, dma once human cheats, once human advanced cheats, once human pc dma',
  'once-human-pc-requirements':
    'once human cheats requirements, once human pc specs, once human esp requirements, windows once human cheats',
  'once-human-cheats-pricing':
    'once human cheats price, once human subscription, buy once human cheats, once human checkout pricing',
  'once-human-cheats-comparison':
    'once human cheats comparison, once human esp vs utilities, compare once human cheats, once human modules',
  'once-human-fps-boost':
    'once human fps, once human performance, once human esp fps, optimize once human cheats overlay',
  'once-human-updates':
    'once human update, once human patch, once human cheats compatible, netease patch once human cheats, season update',
};

export function getBlogKeywords(slug: string): string {
  return (
    BLOG_KEYWORDS[slug] ??
    'once human cheats, once human esp, once human aimbot, once human pc cheats, oncecheats.com'
  );
}