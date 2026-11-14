export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export const EXTERNAL_LINK_REL = 'noopener noreferrer' as const;