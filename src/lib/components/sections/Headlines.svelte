<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		articles: Article[];
		href?: string;
	};

	let { articles, href = '/headlines' }: Props = $props();

	let secondaryArticles = $derived(articles.slice(1, 3));
</script>

<section
	class="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
>
	<!-- Header -->
	<div class="flex shrink-0 items-center justify-between gap-3 bg-[#102a43] px-4 py-2.5">
		<h2 class="min-w-0 truncate text-md font-extrabold tracking-[0.08em] text-white uppercase">
			Headlines
		</h2>

		<a
			href={sitePath(href)}
			class="group/more -my-2.5 flex shrink-0 items-center gap-1.5 self-stretch py-2.5 text-[10px] font-bold tracking-widest text-white/70 uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs"
		>
			<span>More Headlines</span>

			<span
				aria-hidden="true"
				class="transition-transform duration-200 group-hover/more:translate-x-1"
			>
				→
			</span>
		</a>
	</div>

	<!-- Mobile -->
	<div class="divide-y divide-neutral-200 md:hidden">
		{#if articles[0]}
			<a href={sitePath(`/post/${articles[0].slug}`)} class="group block">
				<div class="relative aspect-video overflow-hidden bg-neutral-200">
					<img
						src={articles[0].image}
						alt={articles[0].title}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					<div
						class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
					></div>

					<div class="absolute inset-x-0 bottom-0 p-4">
						<div class="mb-2 h-0.5 w-8 bg-blue-300"></div>

						<h3 class="line-clamp-3 text-xl leading-tight font-bold text-white">
							{articles[0].title}
						</h3>
					</div>
				</div>

				{#if articles[0].excerpt}
					<p class="my-4 line-clamp-2 px-4 text-sm leading-relaxed text-neutral-600">
						{articles[0].excerpt}
					</p>
				{/if}
			</a>
		{/if}

		{#each secondaryArticles as article (article.id)}
			<a
				href={sitePath(`/post/${article.slug}`)}
				class="group grid grid-cols-[120px_minmax(0,1fr)] gap-3 p-3"
			>
				<div class="aspect-4/3 overflow-hidden bg-neutral-200">
					<img
						src={article.image}
						alt={article.title}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				<div class="flex min-w-0 flex-col justify-center">
					<div class="mb-2 h-0.5 w-5 bg-blue-900"></div>

					<h3
						class="line-clamp-3 text-sm leading-snug font-semibold text-neutral-900 transition-colors group-hover:text-red-600"
					>
						{article.title}
					</h3>
				</div>
			</a>
		{/each}
	</div>

	<!-- Desktop -->
	<div
		class={[
			'hidden min-h-0 flex-1 md:grid',
			secondaryArticles.length > 0 && 'md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]'
		]}
	>
		{#if articles[0]}
			<a
				href={sitePath(`/post/${articles[0].slug}`)}
				class="group relative flex min-h-90 min-w-0 items-end overflow-hidden bg-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
			>
				<img
					src={articles[0].image}
					alt={articles[0].title}
					class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				<div
					class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"
				></div>

				<div class="relative w-full min-w-0 p-4 xl:p-5">
					<div class="mb-3 h-0.5 w-10 bg-blue-300"></div>

					<h3 class="line-clamp-3 text-xl leading-tight font-black text-white xl:text-2xl">
						{articles[0].title}
					</h3>

					{#if articles[0].excerpt}
						<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
							{articles[0].excerpt}
						</p>
					{/if}
				</div>
			</a>
		{/if}

		<!-- Secondary stories -->
		{#if secondaryArticles.length > 0}
			<div class="grid min-w-0 auto-rows-fr divide-y divide-white/20 border-l border-neutral-200">
				{#each secondaryArticles as article (article.id)}
					<a
						href={sitePath(`/post/${article.slug}`)}
						class="group relative flex min-h-44 min-w-0 items-end overflow-hidden bg-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
					>
						<img
							src={article.image}
							alt={article.title}
							class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>

						<div
							class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent"
						></div>

						<div class="relative w-full min-w-0 p-3 xl:p-4">
							<div class="mb-2 h-0.5 w-6 bg-blue-300"></div>

							<h3 class="line-clamp-3 text-sm leading-snug font-bold text-white xl:text-base">
								{article.title}
							</h3>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
