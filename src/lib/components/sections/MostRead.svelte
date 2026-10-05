<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import mostReadImage from '#lib/assets/test-images/MostRead.jpeg';

	const articles = [
		{
			id: '1',
			title: 'Sample MostRead headline',
			slug: 'mostread-1',
			image: mostReadImage
		},
		{
			id: '2',
			title: 'Another mostread story',
			slug: 'mostread-2'
		},
		{
			id: '3',
			title: 'Third mostread story',
			slug: 'mostread-3'
		},
		{
			id: '4',
			title: 'Fourth mostread story',
			slug: 'mostread-4'
		}
	];
</script>

<section>
	<h2 class="mb-3 text-xl font-bold uppercase">Most Read</h2>

	{#if articles[0]}
		<a href={sitePath(`/post/${articles[0].slug}`)} class="group block">
			{#if articles[0].image}
				<div class="aspect-video overflow-hidden">
					<img
						src={articles[0].image}
						alt={articles[0].title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			{/if}

			<h3 class="mt-2 leading-snug font-medium group-hover:text-red-600">
				{articles[0].title}
			</h3>
		</a>
	{/if}

	<div class="mt-4 space-y-3">
		{#each articles.slice(1) as article (article.id)}
			<a
				href={sitePath(`/post/${article.slug}`)}
				class="block text-sm leading-snug hover:text-red-600"
			>
				{article.title}
			</a>
		{/each}
	</div>
</section>
