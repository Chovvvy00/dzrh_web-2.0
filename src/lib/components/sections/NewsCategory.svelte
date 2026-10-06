<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	type Article = {
		id: string;
		title: string;
		slug: string;
		image: string;
	};

	type Props = {
		title: string;
		articles: Article[];
		href: string;
	};

	let { title, articles, href }: Props = $props();
</script>

<section class="w-full">
	<!-- Category heading -->
	<div class="mb-3 flex items-center justify-between">
		<h2 class="text-xl font-semibold uppercase">
			{title}
		</h2>
	</div>

	<!-- Articles -->
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
		{#each articles.slice(0, 3) as article (article.id)}
			<a href={sitePath(`/post/${article.slug}`)} class="group block">
				<div class="aspect-video overflow-hidden bg-neutral-200">
					<img
						src={article.image}
						alt={article.title}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				<h3
					class="mt-2 line-clamp-2 text-base leading-snug transition-colors group-hover:text-red-600"
				>
					{article.title}
				</h3>
			</a>
		{/each}
	</div>

	<!-- More -->
	<div class="mt-2 flex justify-end">
		<a href={sitePath(href)} class="text-xs font-medium uppercase hover:text-red-600"> More </a>
	</div>
</section>
