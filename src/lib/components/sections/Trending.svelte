<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import trendingImage from '#lib/assets/test-images/Trending.jpeg';

	type Article = {
		id: string;
		title: string;
		slug: string;
		image?: string;
	};

	const articles: Article[] = [
		{
			id: '1',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			slug: 'trending-1',
			image: trendingImage
		},
		{
			id: '2',
			title:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum vulputate lorem eu cursus.',
			slug: 'trending-2'
		},
		{
			id: '3',
			title: 'Third trending story',
			slug: 'trending-3'
		},
		{
			id: '4',
			title: 'Fourth trending story',
			slug: 'trending-4'
		}
	];
</script>

<section
	aria-labelledby="trending-heading"
	class="w-full min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-white"
>
	<!-- Section heading -->
	<div class="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3">
		<div class="flex items-center gap-2.5">
			<span class="h-6 w-1 rounded-full bg-red-700"></span>

			<h2
				id="trending-heading"
				class="text-lg font-extrabold tracking-tight text-neutral-900 uppercase"
			>
				Trending
			</h2>
		</div>

		<div class="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1">
			<span class="relative flex h-2 w-2">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60 motion-reduce:animate-none"
				></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
			</span>

			<span class="text-[10px] font-bold tracking-wide text-red-700 uppercase"> Trending </span>
		</div>
	</div>

	<!-- Featured trending article -->
	{#if articles[0]}
		<a href={sitePath(`/post/${articles[0].slug}`)} class="group block p-3">
			{#if articles[0].image}
				<div class="relative aspect-video overflow-hidden rounded-lg bg-neutral-100">
					<img
						src={articles[0].image}
						alt={articles[0].title}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>

					<!-- Image gradient -->
					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/30 to-transparent"
					></div>

					<!-- Trending badge
                    <span
                        class="absolute top-3 left-3 rounded-md bg-red-700 px-2.5 py-1.5 text-[10px] font-extrabold tracking-wide text-white uppercase shadow-md"
                    >
                        Trending Now
                    </span> -->
				</div>
			{/if}

			<div class="mt-3">
				<h3
					class="line-clamp-3 text-base leading-snug font-bold text-neutral-900 transition-colors duration-200 group-hover:text-red-700"
				>
					{articles[0].title}
				</h3>

				<div class="mt-3 flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>

					<span class="text-[11px] font-semibold tracking-wide text-neutral-500 uppercase">
						Popular right now
					</span>
				</div>
			</div>
		</a>
	{/if}

	<!-- Other trending articles -->
	{#if articles.length > 1}
		<div class="mx-3 divide-y divide-neutral-100 border-t border-neutral-200">
			{#each articles.slice(1) as article (article.id)}
				<a
					href={sitePath(`/post/${article.slug}`)}
					class="group flex min-w-0 items-start gap-3 px-1 py-3.5 transition-colors duration-200 hover:bg-neutral-50"
				>
					<!-- Trending indicator -->
					<span
						class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-600 transition-transform duration-200 group-hover:scale-125"
					></span>

					<!-- Article headline -->
					<div class="min-w-0 flex-1">
						<h3
							class="line-clamp-3 text-sm leading-snug font-semibold text-neutral-800 transition-colors duration-200 group-hover:text-red-700"
						>
							{article.title}
						</h3>
					</div>
				</a>
			{/each}
		</div>
	{/if}

	<!-- Footer -->
	<div class="border-t border-neutral-100 bg-neutral-50 px-4 py-3">
		<a
			href={sitePath('/most-read')}
			class="group flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-neutral-600 uppercase transition-colors hover:text-[#102A43]"
		>
			<span>View all popular articles</span>

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
</section>
