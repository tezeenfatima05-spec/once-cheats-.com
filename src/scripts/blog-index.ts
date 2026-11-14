/** Blog index topic filters, search, and Starwind sort select. */
export function initBlogIndexFilters() {
  const grid = document.getElementById('blog-grid');
  const emptyEl = document.getElementById('blog-empty');
  const sortRoot = document.getElementById('blog-sort-select');
  const searchInput = document.getElementById('blog-search') as HTMLInputElement | null;
  const searchForm = searchInput?.closest('form');
  if (!grid) return;

  const emptyMessage = grid.dataset.emptyMessage ?? 'No articles match this filter.';

  const filters = document.querySelectorAll<HTMLButtonElement>('[data-blog-filter]');

  const cards = () => [...grid.querySelectorAll<HTMLElement>('[data-blog-card]')];

  const activeTag = () =>
    document.querySelector<HTMLButtonElement>('[data-blog-filter][aria-pressed="true"]')?.getAttribute(
      'data-blog-filter',
    ) ?? 'all';

  const getSortSelectRoot = () => sortRoot?.querySelector<HTMLElement>('[data-sw-select]');

  const getSort = () => {
    const root = getSortSelectRoot();
    const fromAttr = root?.getAttribute('data-value');
    if (fromAttr) return fromAttr;
    const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
    return input?.value || 'newest';
  };

  const isBlogSortEvent = (event: Event) => {
    const root = getSortSelectRoot();
    if (!root || !sortRoot) return false;
    return event.target === root || root.contains(event.target as Node);
  };

  const compareCards = (a: HTMLElement, b: HTMLElement, sort: string) => {
    const tsA = Number(a.getAttribute('data-ts') ?? 0);
    const tsB = Number(b.getAttribute('data-ts') ?? 0);
    const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
    const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
    if (sort === 'oldest') return tsA - tsB;
    if (sort === 'short') return readA - readB;
    if (sort === 'long') return readB - readA;
    const titleA = (a.getAttribute('data-title') ?? '').toLowerCase();
    const titleB = (b.getAttribute('data-title') ?? '').toLowerCase();
    if (sort === 'title-asc') return titleA.localeCompare(titleB);
    if (sort === 'title-desc') return titleB.localeCompare(titleA);
    return tsB - tsA;
  };

  const matchesSearch = (el: HTMLElement) => {
    const q = searchInput?.value.trim().toLowerCase() ?? '';
    if (!q) return true;
    const hay = [
      el.getAttribute('data-title'),
      el.getAttribute('data-desc'),
      el.getAttribute('data-tag'),
      el.getAttribute('data-slug'),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  };

  const apply = () => {
    const tag = activeTag();
    const sort = getSort();
    const items = cards();

    const sorted = [...items].sort((a, b) => compareCards(a, b, sort));
    sorted.forEach((el) => grid.appendChild(el));

    let visibleCount = 0;
    items.forEach((el) => {
      const tagMatch = tag === 'all' || el.getAttribute('data-tag') === tag;
      const match = tagMatch && matchesSearch(el);
      el.classList.toggle('hidden', !match);
      if (match) visibleCount += 1;
    });

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
      emptyEl.textContent = emptyMessage;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      apply();
    });
  });

  searchInput?.addEventListener('input', apply);
  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    apply();
  });

  const onSortChange = (event: Event) => {
    if (!isBlogSortEvent(event)) return;
    apply();
  };

  document.addEventListener('starwind:value-change', onSortChange);

  // Starwind select hydrates after first paint — re-apply once ready.
  requestAnimationFrame(apply);
  window.setTimeout(apply, 0);
}
