<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		articles: Article[];
	};

	let { articles }: Props = $props();
</script>

<section class="w-full">
	<div class="border-b-8 border-blue-900">
		<div class="inline-block bg-blue-900 px-4 pt-2">
			<h2 class="text-xl font-bold text-white uppercase">Headlines</h2>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each articles.slice(0, 3) as article (article.id)}
			<a href={sitePath(`/post/${article.slug}`)} class="group block">
				<div class="aspect-16/10 overflow-hidden bg-neutral-200">
					<img
						src={article.image}
						alt={article.title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>

				<h3 class="mt-2 line-clamp-2 text-sm leading-snug font-medium group-hover:text-red-600">
					{article.title}
				</h3>

				{#if article.excerpt}
					<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
						{article.excerpt}
					</p>
				{/if}
			</a>
		{/each}
	</div>
</section>
