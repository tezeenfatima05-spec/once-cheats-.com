/** Normalize pathname for comparing with nav hrefs (trailing slash, index.html). */
export function normalizePathForNav(pathname: string): string {
  let path = pathname.replace(/\/index\.html$/, '');
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path || '/';
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (/^https?:\/\//i.test(href)) return false;
  const path = normalizePathForNav(pathname);
  const linkPath = normalizePathForNav(href);

  if (linkPath === '/') return path === '/';
  return path === linkPath || path.startsWith(linkPath);
}