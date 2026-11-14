/** Authorized merchant checkout URLs (referral ID TAZEEN only). */
export const CHECKOUT_URLS = {
  onceHuman: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fonce-human',
  hwidSpoofer: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fhwid-spoofer',
  ugc: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fugc',
  cloudDma: 'https://zadeyo.com/go/TAZEEN?to=%2Fproducts%2Fcloud-dma',
};

/** Internal /go/* paths → authorized checkout URLs. */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/once-human', CHECKOUT_URLS.onceHuman],
  ['/go/once-human/', CHECKOUT_URLS.onceHuman],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}