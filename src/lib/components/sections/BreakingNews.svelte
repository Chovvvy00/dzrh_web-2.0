<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		article: Article;
	};

	let { article }: Props = $props();
</script>

<section class="w-full">
	<div class="border-b-8 border-[#c7443c]">
		<div class="inline-block bg-[#c7443c] px-4 pt-2">
			<h2 class="text-xl font-bold text-white uppercase">Breaking News</h2>
		</div>
	</div>

	<a href={sitePath(`/post/${article.slug}`)} class="group block">
		<div class="aspect-video overflow-hidden bg-neutral-200">
			<img
				src={article.image}
				alt={article.title}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>

		<h3 class="mt-3 text-lg leading-snug font-medium group-hover:text-red-600">
			{article.title}
		</h3>

		{#if article.excerpt}
			<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
				{article.excerpt}
			</p>
		{/if}
	</a>
</section>
