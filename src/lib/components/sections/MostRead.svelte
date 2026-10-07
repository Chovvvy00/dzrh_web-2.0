<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import mostReadImage from '#lib/assets/test-images/MostRead.jpeg';

	const articles = [
		{
			id: '1',
			title: 'Sample Most Read headline',
			slug: 'mostread-1',
			image: mostReadImage
		},
		{
			id: '2',
			title: 'Another Most Read story',
			slug: 'mostread-2'
		},
		{
			id: '3',
			title: 'Third Most Read story',
			slug: 'mostread-3'
		},
		{
			id: '4',
			title: 'Fourth Most Read story',
			slug: 'mostread-4'
		}
	];
</script>

<section class="w-full min-w-0">
	<!-- Heading -->
	<div class="mb-3 border-b border-neutral-300 pb-2">
		<h2 class="text-xl font-bold uppercase">
			Most Read
		</h2>
	</div>

	{#if articles[0]}
		<!-- Top story -->
		<a
			href={sitePath(`/post/${articles[0].slug}`)}
			class="group block"
		>
			{#if articles[0].image}
				<div class="aspect-video overflow-hidden bg-neutral-200">
					<img
						src={articles[0].image}
						alt={articles[0].title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>
			{/if}

			<div class="mt-2 flex gap-3">
				<span
					class="shrink-0 text-3xl leading-none font-bold text-neutral-300"
				>
					01
				</span>

				<h3
					class="line-clamp-3 text-base leading-snug font-semibold transition-colors group-hover:text-red-600"
				>
					{articles[0].title}
				</h3>
			</div>
		</a>
	{/if}

	<!-- Other stories -->
	<div class="mt-4 divide-y divide-neutral-200">
		{#each articles.slice(1) as article, index (article.id)}
			<a
				href={sitePath(`/post/${article.slug}`)}
				class="group flex gap-3 py-3 first:pt-0"
			>
				<span
					class="w-9 shrink-0 text-2xl leading-none font-bold text-neutral-300"
				>
					{String(index + 2).padStart(2, '0')}
				</span>

				<h3
					class="line-clamp-3 text-sm leading-snug font-medium transition-colors group-hover:text-red-600"
				>
					{article.title}
				</h3>
			</a>
		{/each}
	</div>
</section>