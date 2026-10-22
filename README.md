# DZRH Web 2.0

DZRH news homepage built with SvelteKit and Tailwind CSS.

## Development

Use Node.js 24 or newer. The GitHub Pages workflow reads `.node-version`
to keep its Node.js version aligned with local development.

```sh
pnpm install
pnpm dev
```

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` builds the SvelteKit app
and deploys the generated `build/` directory on every push to `main`.

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Commit and push these deployment changes to `main`.
4. Wait for **Deploy to GitHub Pages** in the **Actions** tab to finish.

The site will be available at <https://chovvvy00.github.io/dzrh_web-2.0/>.
Publishing directly from the source branch with Jekyll displays this README
instead of building the Svelte app.

## Production build

```sh
pnpm check
pnpm build
pnpm preview
```

Open the preview at `http://localhost:4173/dzrh_web-2.0/`.
Development uses `/`; production uses the repository path `/dzrh_web-2.0`.

The static adapter prerenders existing routes. Dynamic routes list their pages
explicitly — articles via `entries()` in `src/routes/post/[slug]/+page.ts` and
categories via `entries()` in `src/routes/[category]/+page.ts` — because link
crawling is disabled during prerendering; that way placeholder utility links
(e.g. `/weather`) do not prevent deployment while every article and category
still gets a page.

## Project structure and naming

- **Routes** (`src/routes/`) are kebab-case and data-driven. Category pages are
  the single dynamic route `[category]` (`/nation`, `/sports`, …) fed by
  `categories.ts`; articles are the single dynamic route `post/[slug]`. Because
  a static route outranks a dynamic one, a section that later needs a custom
  layout can add its own folder back (e.g. `src/routes/sports/`) and override
  the dynamic route with no other changes. Article URLs are defined once in
  `postPath()` in `src/lib/paths.ts`; pages build links with `postPath(slug)`
  and absolute metadata/share URLs with `absoluteUrl(postPath(slug))`.
- **Components** (`src/lib/components/`) are PascalCase `.svelte` files grouped
  by domain: `layout/` (site chrome: header, footer, banners, sidebar), `ads/`,
  `media/` (players and embeds), `article/` (cards, share actions), and
  `sections/` (page sections). `Icon.svelte` sits at the root as the shared
  primitive.
- **Data modules** (`src/lib/data/`) are kebab-case and named for their
  domain: `articles.ts` (article lists), `categories.ts` (category archives),
  `posts.ts` (the slug → post lookup behind `/post/[slug]`, including related
  stories). All of these are sample data until a CMS is wired in.
- **Static assets** (`src/lib/assets/`) hold images, fonts, and logos only —
  never components — and file names are kebab-case (`breaking-news.jpeg`).
- Article slugs must be **globally unique** across all categories; duplicate
  slugs are reported as warnings in dev.

## Icons

Use the shared component with a typed application icon name:

```svelte
<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
</script>

<Icon name="play" class="text-2xl" />
<Icon name="facebook" class="h-4 w-4" />
```

Add aliases in `src/lib/icons.ts`. Collection prefixes belong only in that map;
components do not need collection-specific imports or packages. Unknown aliases
are reported by TypeScript. Put accessible labels on icon-only buttons or links.

The component uses `@iconify/svelte` and fetches icon data from the Iconify API
in the browser. Icons require API access on first load and are not included in
prerendered HTML. For offline or server-rendered icons, use bundled icon data
instead of API names. See the [Iconify Svelte documentation](https://iconify.design/docs/icon-components/svelte/).
