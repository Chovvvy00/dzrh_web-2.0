<script lang="ts">
	import { onMount } from 'svelte';
	import type { Post } from '#lib/data/posts.ts';
	import { relatedPosts } from '#lib/data/posts.ts';
	import { categories } from '#lib/data/categories.ts';
	import { postPath, sitePath } from '#lib/paths.ts';
	import AdBanner from '#lib/components/ads/AdBanner.svelte';
	import ArticleCard from './ArticleCard.svelte';

	let { post }: { post: Post } = $props();
	let related = $derived(relatedPosts(post.slug, 1));
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	let categoryPicks = $derived.by(() => {
		const entries = Object.entries(categories)
			.filter(([slug]) => `/${slug}` !== post.category.path)
			.map(([slug, category]) => ({
				slug,
				...category,
				articles: category.articles.filter((article) => article.slug !== post.slug)
			}))
			.filter((category) => category.articles.length > 0);

		// Keep initial HTML consistent, then shuffle on every fresh page load.
		if (mounted) {
			for (let index = entries.length - 1; index > 0; index--) {
				const randomIndex = Math.floor(Math.random() * (index + 1));
				[entries[index], entries[randomIndex]] = [entries[randomIndex], entries[index]];
			}
		}

		return entries.slice(0, 3).map((category) => ({
			...category,
			article: category.articles[mounted ? Math.floor(Math.random() * category.articles.length) : 0]
		}));
	});
</script>

<div class="space-y-5">
	{#if related.length}
		<section aria-labelledby="post-related-heading">
			<div class="mb-4 flex items-center gap-3">
				<!-- <span aria-hidden="true" class="h-6 w-1 rounded-full bg-red-700"></span> -->
				<h2
					id="post-related-heading"
					class="text-2xl leading-tight font-extrabold tracking-wide text-[#102a43] uppercase"
				>
					Related news
				</h2>
				<span aria-hidden="true" class="h-px flex-1 bg-neutral-200"></span>
			</div>
			{#each related as story (story.slug)}
				<article>
					<a
						href={postPath(story.slug)}
						class="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-neutral-300 hover:shadow-md"
					>
						<div class="relative aspect-video overflow-hidden bg-neutral-100">
							<img
								src={story.image}
								alt=""
								class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
								loading="lazy"
							/>
							<span
								class="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] rounded bg-[#fff200] px-3 py-2 text-xs leading-tight font-extrabold text-[#102a43] uppercase shadow-sm"
							>
								{story.category.title}
							</span>
						</div>
						<div class="p-5">
							{#if story.datePosted}
								<p class="mb-2 text-xs font-medium text-slate-500">{story.datePosted}</p>
							{/if}
							<h3
								class="text-xl leading-snug font-extrabold text-[#102a43] transition-colors group-hover:text-red-700"
							>
								{story.title}
							</h3>
							{#if story.excerpt}
								<p class="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
									{story.excerpt}
								</p>
							{/if}
							<div
								class="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 text-sm font-bold text-red-700"
							>
								<span>Read story</span>
								<!-- <span
									aria-hidden="true"
									class="flex size-7 items-center justify-center rounded-full bg-red-50 transition-colors group-hover:bg-red-700 group-hover:text-white"
									>→</span
								> -->
							</div>
						</div>
					</a>
				</article>
			{/each}
		</section>
	{/if}

	{#each categoryPicks as category, index (category.slug)}
		<section aria-labelledby={`post-category-${category.slug}`} class="relative">
			<h2
				id={`post-category-${category.slug}`}
				class="absolute top-3 left-3 z-10 max-w-[calc(100%-1rem)] text-xs leading-tight font-bold uppercase"
			>
				<a
					href={sitePath(`/${category.slug}`)}
					class="block rounded bg-[#fff200] px-2 py-1 text-[#102a43] shadow-sm hover:underline"
					>{category.title}</a
				>
			</h2>
			<ArticleCard article={category.article} />
		</section>

		{#if index === 0}
			<section
				aria-label="Advertisement"
				class="relative mx-auto h-62.5 w-75 max-w-full overflow-hidden"
			>
				<AdBanner isTestMode={true} showPlaceholder={true} />
			</section>
		{/if}
	{/each}
</div>

<style>
	a:focus-visible {
		outline: 2px solid #b91c1c;
		outline-offset: 4px;
	}
</style>
