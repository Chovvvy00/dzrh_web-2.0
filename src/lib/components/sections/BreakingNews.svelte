<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		article: Article;
	};

	let { article }: Props = $props();
</script>

<section
	class="w-full min-w-0 overflow-hidden rounded-lg border border-red-200 bg-white"
>
	<div class="flex items-center justify-between gap-3 bg-[#b42318] px-4 py-2.5">
		<div class="flex min-w-0 items-center gap-2">
			<span class="relative flex size-2.5 shrink-0">
				<span
					class="absolute inline-flex size-full animate-ping rounded-full bg-white/70"
				></span>

				<span class="relative inline-flex size-2.5 rounded-full bg-white"></span>
			</span>

			<h2
				class="truncate text-md font-extrabold tracking-[0.08em] text-white uppercase"
			>
				Breaking News
			</h2>
		</div>

		<span
			class="hidden shrink-0 text-[10px] font-semibold tracking-wide text-white/70 uppercase sm:block lg:hidden"
		>
			Latest Update
		</span>
	</div>

	<a
		href={sitePath(`/post/${article.slug}`)}
		class="group block"
	>

		<div
			// class="relative aspect-video overflow-hidden bg-neutral-200 lg:aspect-4/3"
			class="relative aspect-video overflow-hidden bg-neutral-200"
		>
			<img
				src={article.image}
				alt={article.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"
			></div>

<!-- 
			<div class="absolute bottom-0 left-0">
				<span
					class="inline-block bg-[#b42318] px-3 py-1.5 text-[10px] font-bold tracking-wide text-white uppercase"
				>
					Developing
				</span>
			</div> -->
		</div>

		<div class="relative p-4 sm:p-5 lg:p-4">

			<div class="mb-3 h-0.5 w-10 bg-[#b42318]"></div>

			<h3
				class="line-clamp-3 text-xl leading-tight font-extrabold text-[#102a43] transition-colors group-hover:text-[#b42318]
					sm:text-2xl
					lg:text-lg
					xl:text-xl"
			>
				{article.title}
			</h3>

			{#if article.excerpt}
				<p
					class="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600"
				>
					{article.excerpt}
				</p>
			{/if}

			<div
				class="mt-4 flex items-center gap-2 text-xs font-bold tracking-wide text-[#b42318] uppercase"
			>
				<span>Read full story</span>

				<span
					aria-hidden="true"
					class="transition-transform duration-200 group-hover:translate-x-1"
				>
					
				</span>
			</div>
		</div>
	</a>
</section>
