<script lang="ts">
	import { resolve } from '$app/paths';
	import featuredImage from '#lib/assets/test-images/Featured.jpg';

	const article = {
		title:
			'facilisis arcu eu, vestibulum urna. Pellentesque lorem dolor, vehicula ut sollicitudin vitae, eleifend id massa..',
		slug: 'featured-article',
		image: featuredImage
	};
</script>

<section class="w-full">
	<!-- Header -->
	<div class="border-b-8 border-[#f7d347]">
		<div class="inline-block bg-[#f7d347] px-4 pt-2">
			<h2 class="text-xl font-bold text-white uppercase">Featured</h2>
		</div>
	</div>

	<!-- Featured Article -->
	<a href={resolve(`/post/${article.slug}`)} class="group block">
		<div class="overflow-hidden">
			<img
				src={article.image}
				alt={article.title}
				class="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>

		<div class="bg-neutral-600 px-4 py-2">
			<h3 class="line-clamp-3 text-base leading-snug font-medium text-white">
				{article.title}
			</h3>
		</div>
	</a>
</section>
