import type { AlbumPhoto } from './albumPhoto';
import type { Category } from './category';
import type { Media } from './media';
import type { Tag } from './tag';
import type { User } from './user';

/** Article data used by cards and post pages, including the existing sample stories. */
export type Article = {
	id: string;
	title: string;
	slug: string;
	image: string;
	excerpt?: string;
	datePosted?: string;
	publishedAt?: string;
	author?: string;
	tags?: string[];
	/** CMS HTML or plain-text paragraphs from sample articles. */
	body?: string | string[];
};

export type Post = {
	exclude: string;
	title: string;
	slug: string;
	body?: string;
	excerpt?: string;
	mtitle: string;
	mdesc: string;
	photo: Media;
	categories: Category[];
	tags?: Tag[];
	postedBy: Partial<User> | string;
	status: string;
	postType: string;
	album: [];
	albumName: string;
	videoLink: string;
	headline: boolean;
	sponsor: {
		companyName: string;
		hyperlink: string;
		logoUrl: string;
	};
	publishDate: string;
	pageViews: number;
	albumPhotos: AlbumPhoto;
};
