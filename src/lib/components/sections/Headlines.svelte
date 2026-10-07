<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		articles: Article[];
	};

	let { articles }: Props = $props();
</script>

<section class="w-full">
	<!-- Section heading -->
	<div class="border-b-8 border-blue-900">
		<div class="inline-block bg-blue-900 px-4 pt-2">
			<h2 class="text-xl font-bold uppercase text-white">
				Headlines
			</h2>
		</div>
	</div>

	<!-- Mobile -->
	<div class="divide-y divide-neutral-200 sm:hidden">
		{#each articles.slice(0, 3) as article, index (article.id)}
			{#if index === 0}
				<!-- Featured headline -->
				<a
					href={sitePath(`/post/${article.slug}`)}
					class="group block"
				>
					<div class="aspect-video overflow-hidden bg-neutral-200">
						<img
							src={article.image}
							alt={article.title}
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>

					<h3
						class="mt-3 line-clamp-3 text-xl leading-tight font-bold transition-colors group-hover:text-red-600"
					>
						{article.title}
					</h3>

					{#if article.excerpt}
						<p
							class="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500"
						>
							{article.excerpt}
						</p>
					{/if}
				</a>
			{:else}
				<!-- Secondary headlines -->
				<a
					href={sitePath(`/post/${article.slug}`)}
					class="group flex gap-3 py-4"
				>
					<div
						class="aspect-4/3 w-32 shrink-0 overflow-hidden rounded-sm bg-neutral-200"
					>
						<img
							src={article.image}
							alt={article.title}
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>

					<div class="min-w-0 flex-1">
						<h3
							class="line-clamp-3 text-base leading-snug font-semibold transition-colors group-hover:text-red-600"
						>
							{article.title}
						</h3>

						{#if article.excerpt}
							<p
								class="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500"
							>
								{article.excerpt}
							</p>
						{/if}
					</div>
				</a>
			{/if}
		{/each}
	</div>

	<!-- Tablet / Desktop -->
	<div class="hidden grid-cols-3 gap-4 sm:grid">
		{#each articles.slice(0, 3) as article (article.id)}
			<a
				href={sitePath(`/post/${article.slug}`)}
				class="group block"
			>
				<div class="aspect-video overflow-hidden bg-neutral-200">
					<img
						src={article.image}
						alt={article.title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>

				<h3
					class="mt-2 line-clamp-2 text-base leading-snug font-semibold transition-colors group-hover:text-red-600"
				>
					{article.title}
				</h3>

				{#if article.excerpt}
					<p
						class="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500"
					>
						{article.excerpt}
					</p>
				{/if}
			</a>
		{/each}
	</div>
</section>