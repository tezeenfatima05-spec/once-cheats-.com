import type { ForumPost } from '../forum';

const BASE =
  'once human cheats, once human pc cheats, once human esp, oncecheats.com forum';

export function getForumIndexKeywords(): string {
  return `${BASE}, once human settings, once human compatibility, once human aim assist`;
}

export function getForumThreadKeywords(post: ForumPost): string {
  const topic = post.slug.replace(/-/g, ' ');
  const cat = post.category.toLowerCase();
  return `${BASE}, once human ${cat}, ${topic}, illustrative once human cheats discussion`;
}