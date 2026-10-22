import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { getPost, postSlugs } from '#lib/data/posts.ts';

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404, 'Article not found');
	return { post };
};

// Link crawling is disabled during prerendering (see vite.config.ts), so the
// static adapter only builds article pages that are listed here.
export const entries: EntryGenerator = () => postSlugs().map((slug) => ({ slug }));
