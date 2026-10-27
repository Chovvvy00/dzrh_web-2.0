<script lang="ts">
	import { postPath, sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/post.ts';

	type Props = {
		title: string;
		articles: Article[];
		href: string;
	};

	let { title, articles, href }: Props = $props();
</script>

<section class="@container w-full min-w-0">
	<!-- Category heading -->
	<div class="mb-3 flex items-center justify-between border-b border-neutral-300 pb-2">
		<h2 class="text-lg font-bold uppercase @min-[32rem]:text-xl">
			{title}
		</h2>
	</div>

	<!--
		Mobile / Tablet:
		Article 1 = full width
		Articles 2 & 3 = two columns

		Wide category container:
		All 3 = equal columns
	-->
	<div class="grid grid-cols-2 gap-x-3 gap-y-4 @min-[36rem]:grid-cols-3 @min-[36rem]:gap-4">
		{#each articles.slice(0, 3) as article, index (article.id)}
			<a
				href={postPath(article.slug)}
				class="group block min-w-0 {index === 0 ? 'col-span-2' : ''} @min-[36rem]:col-span-1"
			>
				<!-- Image -->
				<div class="aspect-video overflow-hidden bg-neutral-200">
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
						{index === 0 ? 'text-base font-semibold @min-[32rem]:text-lg' : 'text-sm font-medium'}
						@min-[36rem]:text-base @min-[36rem]:font-semibold"
				>
					{article.title}
				</h3>

				<span class="mt-2 block text-xs text-slate-500">{article.datePosted}</span>
			</a>
		{/each}
	</div>

	<div class="flex items-center gap-3 pt-4">
		<span class="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden="true"></span>
		<a
			href={sitePath(href)}
			class="shrink-0 text-xs font-semibold text-slate-700/70 uppercase transition-colors hover:text-red-600 hover:underline"
		>
			View more
		</a>
	</div>
</section>
