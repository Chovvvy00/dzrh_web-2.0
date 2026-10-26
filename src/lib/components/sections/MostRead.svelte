<script lang="ts">
	import { postPath, sitePath } from '#lib/paths.ts';
	import { mostReadArticles as articles } from '#lib/data/articles.ts';
</script>

<section
	aria-labelledby="most-read-heading"
	class="@container w-full min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-white"
>
	<!-- Heading -->
	<div
		class="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-3 py-2.5 lg:flex-nowrap @min-[24rem]:px-4 @min-[24rem]:py-3"
	>
		<div class="flex items-center gap-2.5">
			<span class="h-6 w-1 rounded-full bg-[#102A43]"></span>

			<h2
				id="most-read-heading"
				class="text-base font-extrabold tracking-tight text-neutral-900 uppercase @min-[24rem]:text-lg"
			>
				Most Read
			</h2>
		</div>

		<!-- <span
			class="rounded-full bg-neutral-100 px-2 py-1 text-xs font-bold tracking-wide text-neutral-500 uppercase"
		>
			Top Stories
		</span> -->
	</div>

	<!-- Featured top article -->
	{#if articles[0]}
		<a href={postPath(articles[0].slug)} class="group block p-3 @min-[24rem]:p-4">
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
				</div>
			{/if}

			<div class="mt-2 @min-[24rem]:mt-3">
				<h3
					class="line-clamp-2 text-sm leading-snug font-bold text-neutral-900 transition-colors duration-200 group-hover:text-red-700 @min-[16rem]:text-base"
				>
					{articles[0].title}
				</h3>
			</div>
		</a>
	{/if}

	<!-- Other most-read articles -->
	<div class="mx-3 divide-y divide-neutral-100 border-t border-neutral-200 @min-[24rem]:mx-4">
		{#each articles.slice(1) as article (article.id)}
			<a
				href={postPath(article.slug)}
				class="group flex items-start gap-3 py-2.5 transition-colors duration-200 hover:bg-neutral-100 @min-[24rem]:py-4"
			>
				<div class="flex flex-row items-center justify-between gap-2">
					<!-- Most Read indicator -->
					<span
						class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#102A43] transition-transform duration-200 group-hover:scale-125"
					></span>

					<!-- Article title -->
					<h3
						class="group-hover:text-blue line-clamp-2 text-sm leading-snug font-semibold text-neutral-800 transition-colors duration-200 @min-[24rem]:line-clamp-3"
					>
						{article.title}
					</h3>
				</div>
			</a>
		{/each}
	</div>

	<!-- Footer -->
	<div
		class="border-t border-neutral-100 bg-neutral-50 px-3 py-2.5 @min-[24rem]:px-4 @min-[24rem]:py-3"
	>
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
