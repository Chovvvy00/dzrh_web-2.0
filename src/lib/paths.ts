import { resolve } from '$app/paths';

/** Production origin. Share links, canonical URLs, and JSON-LD always use it. */
export const siteOrigin = 'https://chovvvy00.github.io';

/** Include the deployment base, even for placeholder paths without a route yet. */
export function sitePath(path: string): string {
	return `${resolve('/')}${path.replace(/^\/+/, '')}`;
}

/**
 * Article permalink. Every article on the site lives under `/post/[slug]`
 * regardless of category, so article URLs stay stable when stories are
 * recategorized. Edit only this function to change the article URL shape.
 */
export function postPath(slug: string): string {
	return sitePath(`/post/${slug}`);
}

/**
 * Absolute production URL for an internal root-relative path (sitePath or
 * postPath output), a bundled asset path, a data URI, or an absolute URL.
 */
export function absoluteUrl(pathOrUrl: string): string {
	if (/^(https?:|data:)/.test(pathOrUrl)) return pathOrUrl;
	return `${siteOrigin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}
