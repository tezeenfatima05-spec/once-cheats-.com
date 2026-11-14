import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/** External checkout URLs — redirect targets for /go/* (never re-encode). */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  onceHuman: 'once-human',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
  cloudDma: 'cloud-dma',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Internal checkout path (redirects to authorized merchant URL server-side). */
export function checkoutPath(product: CheckoutProduct = 'onceHuman'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Primary CTA across the site — Once Human software checkout. */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('onceHuman');

/** Map product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'account-recovery':
      return checkoutPath('ugc');
    case 'cloud-dma':
      return checkoutPath('cloudDma');
    case 'pc-software':
    case 'once-human':
    case 'cheat':
    default:
      return checkoutPath('onceHuman');
  }
}

/** Affiliate link attributes for merchant CTAs. */
export const CHECKOUT_LINK_REL = 'sponsored noopener nofollow' as const;

/** Resolve blog CTA or legacy href values to internal checkout paths. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}&`) || href.startsWith(`${url}?`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return checkoutPath('cloudDma');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (href.includes('%2Fproducts%2Fonce-human') || href.includes('/products/once-human')) {
    return checkoutPath('onceHuman');
  }

  return href;
}