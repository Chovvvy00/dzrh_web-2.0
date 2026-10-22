import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { categorySlugs, getCategory } from '#lib/data/categories.ts';

export const load: PageLoad = ({ params }) => {
	const category = getCategory(params.category);
	if (!category) error(404, 'Category not found');
	return { category };
};

// Link crawling is disabled during prerendering (see vite.config.ts), so the
// static adapter only builds category pages that are listed here.
export const entries: EntryGenerator = () => categorySlugs().map((category) => ({ category }));
