<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import featuredImage from '#lib/assets/test-images/Featured.jpeg';

	const article = {
		title:
			'facilisis arcu eu, vestibulum urna. Pellentesque lorem dolor, vehicula ut sollicitudin vitae, eleifend id massa..',
		excerpt: 'desc sadgkasdgklj aslkdfgjaslgjasljg saldkgj askldjg  Pellentesque lorem dolor, vehicula  Pellentesque lorem dolor, vehicula  Pellentesque lorem dolor, vehicula  Pellentesque lorem dolor, vehicula ',
		slug: 'featured-article',
		image: featuredImage,
		datePosted: '2 hours ago'
	};
</script>

<section class="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">

	<!-- Header -->
	<div class="flex shrink-0 items-center justify-between gap-3 bg-[#f7d347] px-4 py-2.5">
		<h2 class="min-w-0 truncate text-md font-extrabold tracking-[0.8] text-slate-700 uppercase">Featured</h2>

		<div class="group/more -my-2.5 flex shrink-0 items-center gap-1.5 self-stretch py-2.5 text-[10px] font-bold tracking-widest text-slate-700/80 uppercase">
			<span>Editor's Choice</span>
		</div>

	</div>

	 <div class="divide-y divide-neutral-200">
		<a href={sitePath('/')} class="group block">
			<div class="relative aspect-video overflow-hidden bg-neutral-200">
				<img
					src={featuredImage}
					alt={article.title}
					class="h-full w-full object-cover transistion-transform duration-500 group-hover:scale-105"
				/>

				<div class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to transparent"></div>
			</div>

			<div class="realative p-4 sm:p-5 lg:p-4">

				<div class="mb-3 h-0.5 w-10 bg-[#f7d347]"></div>

				<h3 class="line-clamp-2 text-xl leading-tight font-extrabold text-slate-700 transition-colors group-hover:text-[#f7d347] sm:text-2xl lg:text-lg xl:text-xl overflow-clip">
					{article.title}
				</h3>

				<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-700/80 overflow-clip">{article.excerpt}</p>

				<p class="mt-2 line-clamp-2 text-xs text-slate-600/70">{article.datePosted}</p>


				<div class="mt-4">
					<span
						class="inline-flex items-center gap-2 bg-[#f7d347] px-4 py-1.5
							text-xs font-extrabold tracking-wide text-slate-800 uppercase
							transition-colors duration-200 group-hover:bg-[#e9c632]"
					>
						Read full story

						<span
							aria-hidden="true"
							class="transition-transform duration-200 group-hover:translate-x-1"
						>
							→
						</span>
					</span>
				</div>
			</div>
		</a>
	 </div>
</section>





<!-- 
<section class="w-full">
	<div class="border-b-8 border-[#f7d347]">
		<div class="inline-block bg-[#f7d347] px-4 pt-2">
			<h2 class="text-xl font-bold text-slate-700 uppercase">Featured</h2>
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

<!-- 
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
</section> -->

