/** Runtime 301 map for scripts/serve.mjs (keep aligned with astro.config redirects). */
export const PATH_REDIRECTS = new Map([
  ['/cheats', '/products/once-human/'],
  ['/cheats/', '/products/once-human/'],
  ['/blog', '/blogs/'],
  ['/blog/', '/blogs/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
]);

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname.startsWith('/blog/') && pathname !== '/blog/') {
    return pathname.replace(/^\/blog\//, '/blogs/') + (pathname.endsWith('/') ? '' : '/');
  }

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}