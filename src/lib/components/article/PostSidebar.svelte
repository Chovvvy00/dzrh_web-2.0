<script lang="ts">
	import type { Post } from '#lib/data/posts.ts';
	import { relatedPosts } from '#lib/data/posts.ts';
	import { categories } from '#lib/data/categories.ts';
	import { postPath, sitePath } from '#lib/paths.ts';
	import AdBanner from '#lib/components/ads/AdBanner.svelte';

	let { post }: { post: Post } = $props();
	let related = $derived(relatedPosts(post.slug, 1));
	// Stable category rotation keeps prerendered HTML and client navigation consistent.
	let categoryPicks = $derived.by(() => {
		const entries = Object.entries(categories);
		const currentIndex = entries.findIndex(([slug]) => `/${slug}` === post.category.path);
		return Array.from({ length: 3 }, (_, offset) => {
			const [slug, category] = entries[(currentIndex + offset + 1) % entries.length];
			return { slug, ...category };
		});
	});
</script>

<div class="space-y-5">
	<section aria-labelledby="post-related-heading">
		<h2 id="post-related-heading" class="mb-3 text-2xl leading-tight font-extrabold uppercase">
			Related news
		</h2>
		{#each related as story (story.slug)}
			<a href={postPath(story.slug)} class="related-story block bg-[#102a43] text-white">
				<img src={story.image} alt="" class="aspect-[2/1] w-full object-cover" loading="lazy" />
				<div class="p-4">
					<h3 class="text-lg leading-snug font-bold">{story.title}</h3>
					{#if story.datePosted}
						<p class="mt-2 text-xs text-slate-200">{story.datePosted}</p>
					{/if}
				</div>
			</a>
		{/each}
	</section>

	{#each categoryPicks as category, index (category.slug)}
		<section aria-labelledby={`post-category-${category.slug}`} class="category-panel">
			<h2
				id={`post-category-${category.slug}`}
				class="bg-[#fff200] px-4 py-3 text-xl font-extrabold uppercase"
			>
				<a href={sitePath(`/${category.slug}`)} class="hover:underline">{category.title}</a>
			</h2>
			<ul class="divide-y divide-neutral-200 px-4">
				{#each category.articles.slice(0, 2) as story (story.slug)}
					<li>
						<a href={postPath(story.slug)} class="flex items-start gap-3 py-4 hover:text-red-700">
							<img
								src={story.image}
								alt=""
								loading="lazy"
								class="h-16 w-20 shrink-0 object-cover"
							/>
							<h3 class="line-clamp-3 text-sm leading-relaxed font-bold">{story.title}</h3>
						</a>
					</li>
				{/each}
			</ul>
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
	.category-panel {
		border: 1px solid #e5e5e5;
	}

	a:focus-visible {
		outline: 2px solid #b91c1c;
		outline-offset: 4px;
	}

	.related-story:hover h3 {
		text-decoration: underline;
	}
</style>
