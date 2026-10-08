// src/lib/types/article.ts

export type Article = {
	id: string;
	title: string;
	slug: string;
	image: string;
	excerpt?: string;
	datePosted?: string;
};
