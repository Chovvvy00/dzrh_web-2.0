<script lang="ts">
	import { postPath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		article: Article;
	};

	let { article }: Props = $props();
</script>

<article class="h-full min-w-0">
	<a
		href={postPath(article.slug)}
		class="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-[border-color,box-shadow] hover:border-neutral-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
	>
		<div class="aspect-video overflow-hidden bg-neutral-100">
			{#if article.image}
				<img
					src={article.image}
					alt=""
					loading="lazy"
					class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
				/>
			{/if}
		</div>
		<div class="flex flex-1 flex-col p-4">
			{#if article.datePosted}
				<p class="mb-2 text-sm leading-relaxed font-medium text-slate-600 xl:text-base">
					{article.datePosted}
				</p>
			{/if}
			<h3
				class="line-clamp-3 text-lg leading-snug font-bold text-[#102A43] transition-colors group-hover:text-red-700 sm:text-xl xl:text-2xl"
			>
				{article.title}
			</h3>
			{#if article.excerpt}
				<p class="mt-2 line-clamp-3 text-base leading-relaxed text-slate-600 xl:text-lg">
					{article.excerpt}
				</p>
			{/if}
			<span class="mt-auto pt-5 text-base leading-relaxed font-bold text-red-700">Read story</span>
		</div>
	</a>
</article>
