/** Merchant / portal UI screenshots (local copies of authorized Supabase assets). */
export const ONCE_HUMAN_SHOTS = {
  merchantVisuals: '/images/products/once-human/merchant-visuals.webp',
  merchantAimbot: '/images/products/once-human/merchant-aimbot.webp',
  merchantMisc: '/images/products/once-human/merchant-misc.webp',
  portalVisuals: '/images/products/once-human/portal-visuals.webp',
  portalAimbot: '/images/products/once-human/portal-aimbot.webp',
  portalMisc: '/images/products/once-human/portal-misc.webp',
} as const;

export type OnceHumanShotKey = keyof typeof ONCE_HUMAN_SHOTS;