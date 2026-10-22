import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command, isPreview }) => ({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter(),
			paths: {
				base: command === 'serve' && !isPreview ? '' : '/dzrh_web-2.0',
				// The base is fixed at build time, so emit root-relative paths instead of
				// page-relative ones ("/dzrh_web-2.0/post/x" rather than "../../post/x").
				// Canonical, Open Graph, and share URLs need the stable form.
				relative: false
			},
			prerender: {
				// Only prerender routes that exist; utility links (e.g. /weather) are
				// still placeholders, and article pages are listed by entries().
				crawl: false
			}
		})
	]
}));
