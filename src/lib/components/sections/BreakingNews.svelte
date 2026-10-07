<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		article: Article;
	};

	let { article }: Props = $props();
</script>

<!-- <section class="w-full">
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
</section> -->

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
				class="truncate text-sm font-extrabold tracking-[0.08em] text-white uppercase"
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
			class="relative aspect-video overflow-hidden bg-neutral-200 lg:aspect-4/3"
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


<!-- 
<section
	class="w-full overflow-hidden rounded-xl border border-neutral-200 bg-[#fffdf8] shadow-sm"
>
	<div
		class="flex items-center justify-between gap-4 bg-[#b42318] px-4 py-2.5 sm:px-5"
	>
		<div class="flex items-center gap-2.5">
			<span class="relative flex size-2.5 shrink-0">
				<span
					class="absolute inline-flex size-full animate-ping rounded-full bg-white/70"
				></span>

				<span class="relative inline-flex size-2.5 rounded-full bg-white"></span>
			</span>

			<h2
				class="text-sm font-extrabold tracking-[0.08em] text-white uppercase sm:text-base"
			>
				Breaking News
			</h2>
		</div>

		<span
			class="hidden text-xs font-semibold tracking-wide text-white/70 uppercase sm:block"
		>
			Latest Update
		</span>
	</div>


	<a
		href={sitePath(`/post/${article.slug}`)}
		class="group grid min-w-0 md:grid-cols-[1.15fr_1fr]"
	>

		<div
			class="relative aspect-video overflow-hidden bg-neutral-200 md:aspect-auto md:min-h-72"
		>
			<img
				src={article.image}
				alt={article.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			<div
				class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
			></div>
		</div>

		<div
			class="relative flex flex-col justify-center border-t border-neutral-200 p-5 md:border-t-0 md:border-l md:p-6 lg:p-8"
		>

			<div
				class="absolute top-0 left-0 h-1 w-20 bg-[#b42318] md:top-6 md:h-12 md:w-1"
			></div>

			<p
				class="mb-2 text-xs font-bold tracking-[0.08em] text-[#b42318] uppercase"
			>
				Developing Story
			</p>

			<h3
				class="text-xl leading-tight font-extrabold text-[#102a43] transition-colors group-hover:text-[#b42318] sm:text-2xl lg:text-3xl"
			>
				{article.title}
			</h3>

			{#if article.excerpt}
				<p
					class="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600 sm:text-base"
				>
					{article.excerpt}
				</p>
			{/if}

			<div class="mt-5">
				<span
					class="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#b42318] uppercase transition-all group-hover:gap-2.5"
				>
					Read full story
					<span aria-hidden="true">→</span>
				</span>
			</div>
		</div>
	</a>
</section> -->