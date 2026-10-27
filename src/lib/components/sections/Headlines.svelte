<script lang="ts">
	import { postPath, sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/post.ts';

	type Props = {
		articles: Article[];
		href?: string;
	};

	let { articles, href = '/headlines' }: Props = $props();

	let secondaryArticles = $derived(articles.slice(0, 6));
</script>

<section
	class="@container flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
>
	<!-- Header -->
	<div
		class="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 bg-[#102a43] px-4 py-3 md:flex-nowrap md:py-2.5 lg:h-12 lg:py-0"
	>
		<h2
			class="min-w-0 text-sm leading-snug font-extrabold tracking-[0.08em] text-white uppercase xl:text-base"
		>
			Headlines
		</h2>

		<a
			href={sitePath(href)}
			class="group/more -my-2.5 flex shrink-0 items-center gap-1.5 self-stretch py-2.5 text-xs font-bold tracking-widest text-white/70 uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
		>
			<span>More Headlines</span>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				class="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
			>
				<path d="M5 12h14" />
				<path d="m12 5 7 7-7 7" />
			</svg>
		</a>
	</div>

	<!-- Mobile -->
	<div class="divide-y divide-neutral-200 md:hidden">
		{#if articles[0]}
			<a href={postPath(articles[0].slug)} class="group block">
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

						<h3 class="line-clamp-3 text-base leading-tight font-bold text-white sm:text-lg">
							{articles[0].title}
						</h3>
						<span class="text-xs text-slate-300">{articles[0].datePosted}</span>
					</div>
				</div>

				{#if articles[0].excerpt}
					<p class="my-4 line-clamp-2 px-4 text-sm leading-relaxed text-neutral-600">
						{articles[0].excerpt}
					</p>
				{/if}
			</a>
		{/if}

		{#each secondaryArticles.slice(1) as article (article.id)}
			<a
				href={postPath(article.slug)}
				class="group grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 p-4 sm:grid-cols-[120px_minmax(0,1fr)]"
			>
				<div class="aspect-video overflow-hidden bg-neutral-200">
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
					<span class="text-xs text-slate-500/70">{article.datePosted}</span>
				</div>
			</a>
		{/each}
	</div>

	<!-- Show four cards in narrow containers and six when three columns fit. -->
	<div class="hidden min-h-0 flex-1 md:grid">
		<div class="grid min-w-0 grid-cols-2 items-start gap-2 @min-[36rem]:grid-cols-3">
			{#each secondaryArticles as article, index (article.id)}
				<a
					href={postPath(article.slug)}
					class="group relative {index < 4
						? 'flex'
						: 'hidden @min-[36rem]:flex'} aspect-video min-w-0 items-end overflow-hidden bg-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
				>
					<img
						src={article.image}
						alt={article.title}
						class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>

					<div
						class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent"
					></div>

					<div class="relative w-full min-w-0 p-2 @min-[42rem]:p-3">
						<div class="mb-1 h-0.5 w-6 bg-blue-300"></div>

						<h3
							class="line-clamp-2 text-sm leading-snug font-bold text-white @min-[48rem]:text-base"
						>
							{article.title}
						</h3>
						<span class="text-xs text-slate-300/80">{article.datePosted}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
