<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import featuredImage from '#lib/assets/test-images/Featured.jpg';

	const article = {
		title:
			'facilisis arcu eu, vestibulum urna. Pellentesque lorem dolor, vehicula ut sollicitudin vitae, eleifend id massa..',
		slug: 'featured-article',
		image: featuredImage
	};
</script>
<!-- 
<section class="w-full">
	<div class="border-b-8 border-[#f7d347]">
		<div class="inline-block bg-[#f7d347] px-4 pt-2">
			<h2 class="text-xl font-bold text-gray-700 uppercase">Featured</h2>
		</div>
	</div>

	<a href={sitePath(`/post/${article.slug}`)} class="group block">
		<div class="overflow-hidden">
			<img
				src={article.image}
				alt={article.title}
				class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>

		<div class="bg-neutral-600 px-4 py-2">
			<h3 class="line-clamp-3 text-lg leading-snug font-medium text-white">
				{article.title}
			</h3>
		</div>
	</a>
</section> -->


<section class="w-full min-w-0">
	
	<div class="flex items-end border-b-2 border-[#f7d347]">
		<div class="bg-[#f7d347] px-4 py-2">
			<h2 class="text-lg font-extrabold tracking-wide text-[#102a43] uppercase sm:text-xl">
				Featured
			</h2>
		</div>
	</div>

	<a
		href={sitePath(`/post/${article.slug}`)}
		class="group block overflow-hidden border border-neutral-200 bg-white"
	>

		<div class="relative aspect-4/3 overflow-hidden bg-neutral-200 sm:aspect-video xl:aspect-4/3">
			<img
				src={article.image}
				alt={article.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
			></div>

			<div class="absolute bottom-0 left-0">
				<span
					class="inline-block bg-[#f7d347] px-3 py-1.5 text-xs font-extrabold tracking-wide text-[#102a43] uppercase"
				>
					Editor's Pick
				</span>
			</div>
		</div>

		<div class="p-4">
			<h3
				class="line-clamp-3 text-lg leading-tight font-bold text-[#102a43] transition-colors group-hover:text-red-600 xl:text-xl"
			>
				{article.title}
			</h3>

			<div class="mt-4 flex items-center gap-2">
				<span class="h-0.5 w-6 bg-[#f7d347]"></span>

				<span
					class="text-xs font-bold tracking-wide text-neutral-500 uppercase"
				>
					Read story
				</span>
			</div>
		</div>
	</a>
</section>