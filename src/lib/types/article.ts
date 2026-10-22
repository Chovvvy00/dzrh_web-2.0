// src/lib/types/article.ts

export type Article = {
	id: string;
	title: string;
	/** Globally unique; becomes the public URL `/post/[slug]`. */
	slug: string;
	image: string;
	excerpt?: string;
	/** Human-readable relative time shown on cards, e.g. "2 days ago". */
	datePosted?: string;
	/** ISO 8601 publish time from the CMS; used for <time datetime> and JSON-LD. */
	publishedAt?: string;
	author?: string;
	/** Editorial tags displayed below the article. */
	tags?: string[];
	/** Article paragraphs rendered on the post page. */
	body?: string[];
};
