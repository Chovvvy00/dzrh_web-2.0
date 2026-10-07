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

<section class="w-full min-w-0">
	<!-- Section Header -->
	<div class="mb-4 flex items-center gap-2 border-b border-neutral-300 pb-2">
		<span class="h-2 w-2 rounded-full bg-red-600"></span>

		<h2 class="text-xl font-bold uppercase">Trending</h2>
	</div>

	<!-- Featured Trending Article -->
	{#if articles[0]}
		<a
			href={sitePath(`/post/${articles[0].slug}`)}
			class="group flex min-w-0 items-start gap-3"
		>
			{#if articles[0].image}
				<div
					class="aspect-4/3 w-28 shrink-0 overflow-hidden bg-neutral-200 sm:w-32 lg:w-24 xl:w-28"
				>
					<img
						src={articles[0].image}
						alt=""
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>
			{/if}

			<div class="min-w-0 flex-1">
				<h3
					class="line-clamp-4 text-base leading-snug font-semibold transition-colors group-hover:text-red-600"
				>
					{articles[0].title}
				</h3>
			</div>
		</a>
	{/if}

	<!-- Other Trending Articles -->
	<div class="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
		{#each articles.slice(1) as article (article.id)}
			<a
				href={sitePath(`/post/${article.slug}`)}
				class="group flex min-w-0 items-start gap-3 py-3"
			>
				<span
					class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
				></span>

				<h3
					class="line-clamp-3 text-sm leading-snug font-medium transition-colors group-hover:text-red-600"
				>
					{article.title}
				</h3>
			</a>
		{/each}
	</div>
</section>