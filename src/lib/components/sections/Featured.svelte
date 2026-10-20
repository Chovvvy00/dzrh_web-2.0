<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import { featuredArticle as article } from '#lib/data/sample-articles.ts';
</script>

<section
	class="flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
>
	<!-- Header -->
	<div class="flex shrink-0 items-center justify-between gap-3 bg-[#f7d347] px-4 py-2.5">
		<h2 class="text-xl min-w-0 truncate font-extrabold tracking-[0.8] text-slate-700 uppercase">
			Featured
		</h2>

		<div
			class="group/more -my-2.5 flex shrink-0 items-center gap-1.5 self-stretch py-2.5 text-[10px] font-bold tracking-widest text-slate-700/80 uppercase"
		>
			<span>Editor's Choice</span>
		</div>
	</div>

	<div class="divide-y divide-neutral-200">
		<a href={sitePath(`/featured/${article.slug}`)} class="group block">
			<div class="relative aspect-video overflow-hidden bg-neutral-200">
				<img
					src={article.image}
					alt={article.title}
					class="transistion-transform h-full w-full object-cover duration-500 group-hover:scale-105"
				/>

				<div
					class="to transparent pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent"
				></div>
			</div>

			<div class="realative p-4 sm:p-5 lg:p-4">
				<div class="mb-3 h-0.5 w-10 bg-[#f7d347]"></div>

				<h3
					class="line-clamp-2 overflow-clip text-xl leading-tight font-extrabold text-slate-700 transition-colors group-hover:text-[#f7d347]"
				>
					{article.title}
				</h3>

				<p class="mt-2 line-clamp-2 overflow-clip leading-relaxed text-slate-700/80">
					{article.excerpt}
				</p>

				<p class="mt-2 line-clamp-2 text-md text-slate-600/70">{article.datePosted}</p>

				<div class="mt-4">
					<span
						class="inline-flex items-center gap-2 bg-[#f7d347] px-4 py-1.5
							font-extrabold tracking-wide text-slate-800 uppercase text-md
							transition-colors duration-200 group-hover:bg-[#e9c632]"
					>
						Read full story

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
							class="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
						>
							<path d="M5 12h14" />
							<path d="m12 5 7 7-7 7" />
						</svg>
					</span>
				</div>
			</div>
		</a>
	</div>
</section>
