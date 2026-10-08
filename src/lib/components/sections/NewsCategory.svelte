<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

	type Props = {
		title: string;
		articles: Article[];
		href: string;
	};

	let { title, articles, href }: Props = $props();
</script>

<section class="w-full min-w-0">
	<!-- Category heading -->
	<div class="mb-3 flex items-center justify-between border-b border-neutral-300 pb-2">
		<h2 class="text-xl font-bold uppercase">
			{title}
		</h2>
	</div>

	<!--
		Mobile / Tablet:
		Article 1 = full width
		Articles 2 & 3 = two columns

		XL / Desktop:
		All 3 = equal columns
	-->
	<div class="grid grid-cols-2 gap-x-3 gap-y-4 xl:grid-cols-3 xl:gap-4">
		{#each articles.slice(0, 3) as article, index (article.id)}
			<a
				href={sitePath(`/post/${article.slug}`)}
				class="group block min-w-0 {index === 0 ? 'col-span-2' : ''} xl:col-span-1"
			>
				<!-- Image -->
				<div
					class="overflow-hidden bg-neutral-200 {index === 0
						? 'aspect-video'
						: 'aspect-4/3'} xl:aspect-video"
				>
					<img
						src={article.image}
						alt={article.title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				<!-- Headline -->
				<h3
					class="mt-2 line-clamp-2 leading-snug transition-colors group-hover:text-red-600
						{index === 0
						? 'text-lg font-semibold'
						: 'text-sm font-medium'}
						xl:text-base xl:font-medium"
				>
					{article.title}
				</h3>

				<span class="text-slate-500/70 text-xs">{article.datePosted}</span>
			</a>
		{/each}
	</div>

	<div class="flex justify-end items-center py-4">
		<a
			href={sitePath(href)}
			class="text-xs font-semibold uppercase text-slate-700/70 transition-colors hover:text-red-600 hover:underline"
		>
			read more
		</a>
	</div>
</section>