// src/lib/data/posts.ts
//
// Single lookup behind every `/post/[slug]` URL: it flattens all article
// groups (category archives plus standalone sections) into one map keyed by
// the globally unique article slug. Swap this module for a CMS fetch when
// articles move out of sample data — the post route only uses the exports
// below.

import type { Article } from '#lib/types/article.ts';
import { categories } from './categories.ts';
import { breakingNews, featuredArticle, mostReadArticles, trendingArticles } from './articles.ts';

/** Category shown on a post; `path` is null while the section has no archive page. */
export type PostCategory = {
	title: string;
	path: string | null;
};

export type Post = Article & {
	category: PostCategory;
	/** Always populated: the post page renders paragraphs, never an empty body. */
	body: string[];
};

type ArticleGroup = {
	category: PostCategory;
	articles: Article[];
};

// Sections without an archive page keep `path: null`, so the category chip
// renders as plain text instead of linking to a route that does not exist.
const standaloneGroups: ArticleGroup[] = [
	{ category: { title: 'Breaking News', path: null }, articles: [breakingNews] },
	{ category: { title: 'Featured', path: null }, articles: [featuredArticle] },
	{ category: { title: 'Trending', path: null }, articles: trendingArticles },
	{ category: { title: 'Most Read', path: null }, articles: mostReadArticles }
];

const articleGroups: ArticleGroup[] = [
	...Object.entries(categories).map(([slug, category]) => ({
		category: { title: category.title, path: `/${slug}` },
		articles: category.articles
	})),
	...standaloneGroups
];

// Placeholder body until the CMS supplies `article.body`. Every linked article
// must open a readable page, so posts never render an empty body.
const sampleBody = [
	'This is sample article content for the DZRH Web 2.0 post layout. Replace these paragraphs with the article body from the CMS; the page renders each entry of `body` as its own paragraph, so a migration only needs to supply the array.',
	'The post page keeps every article on one URL shape, `/post/[slug]`, regardless of its category. Category lives with the article as metadata: it drives the breadcrumb, the category chip, and the related-stories rail, but it never changes the address of the story.',
	'Long-form content is styled with the typography scale shared across the site, so headings, quotes, and lists keep the same rhythm as the rest of DZRH Web 2.0. Advertisement slots sit between paragraphs to keep the reading column comfortable on both mobile and desktop.',
	'Share actions use the canonical URL of the article, which means a story keeps working when it moves between sections of the site. Related stories are picked from the same category first, then topped up with the latest posts when a section has fewer stories than the rail expects.',
	'Check back for the live article content. Sample data exists only to exercise the layout: breadcrumbs, metadata, structured data, prerendering, and related content all run against the same code paths the CMS will use.'
];

const postsBySlug = new Map<string, Post>();
for (const { category, articles } of articleGroups) {
	for (const article of articles) {
		// First group wins; slugs are globally unique by contract (see Article.slug).
		if (postsBySlug.has(article.slug)) continue;
		postsBySlug.set(article.slug, {
			...article,
			category,
			body: article.body ?? sampleBody
		});
	}
}

if (import.meta.env.DEV) {
	const seen = new Set<string>();
	for (const { articles } of articleGroups) {
		for (const { slug } of articles) {
			if (seen.has(slug)) console.warn(`Duplicate article slug: "${slug}"`);
			seen.add(slug);
		}
	}
}

/** Look up the post for a `/post/[slug]` URL, or undefined for unknown slugs. */
export function getPost(slug: string): Post | undefined {
	return postsBySlug.get(slug);
}

/** Every slug the static build must prerender (see entries() in the post route). */
export function postSlugs(): string[] {
	return [...postsBySlug.keys()];
}

/** Up to `limit` posts: same category first, then the newest posts overall. */
export function relatedPosts(slug: string, limit = 4): Post[] {
	const current = postsBySlug.get(slug);
	if (!current) return [];

	const all = [...postsBySlug.values()].filter((post) => post.slug !== slug);
	const sameCategory = all.filter((post) => post.category.title === current.category.title);
	const rest = all.filter((post) => post.category.title !== current.category.title);

	return [...sameCategory, ...rest].slice(0, limit);
}
