# DZRH Web 2.0

DZRH news homepage built with SvelteKit and Tailwind CSS.

## Development

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

The static adapter prerenders existing routes. Article, category, and utility
links currently point to placeholder routes that still need pages. Link crawling
is disabled during prerendering so these placeholders do not prevent deployment.

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
