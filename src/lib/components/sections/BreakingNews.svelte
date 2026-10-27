<script lang="ts">
	import { fitNewsSummary } from '#lib/actions/fitNewsSummary.ts';
	import { postPath } from '#lib/paths.ts';
	import type { Post } from '#lib/types/post.ts';
	import { formatDate } from '#lib/utils.ts';

	type Props = {
		article: Pick<Post, 'title' | 'slug' | 'excerpt' | 'publishDate'> & {
			photo: Pick<Post['photo'], 'link'>;
		};
	};

	let { article }: Props = $props();
</script>

<section
	class="@container/breaking-card flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-red-200 bg-white lg:@container-size lg:min-h-0"
>
	<div
		class="flex shrink-0 items-center justify-between gap-3 bg-[#b42318] px-4 py-3 lg:h-12 lg:py-0"
	>
		<div class="flex min-w-0 items-center gap-2">
			<span class="relative flex size-3 shrink-0">
				<span class="absolute inline-flex size-full animate-ping rounded-full bg-white/70"></span>

				<span class="relative inline-flex size-3 rounded-full bg-white"></span>
			</span>

			<h2
				class="min-w-0 text-sm leading-snug font-extrabold tracking-[0.08em] text-white uppercase xl:text-base"
			>
				Breaking News
			</h2>
		</div>

		<span
			class="hidden shrink-0 text-xs font-semibold tracking-wide text-white/70 uppercase sm:block lg:hidden"
		>
			Latest Update
		</span>
	</div>

	<a href={postPath(article.slug)} class="group flex min-w-0 flex-col lg:min-h-0 lg:flex-1">
		<div class="relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-200">
			<img
				src={article.photo.link}
				alt={article.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>

			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"
			></div>
		</div>

		<div use:fitNewsSummary class="summary relative lg:min-h-0 lg:flex-1">
			<div class="summary-content p-4 sm:p-5 lg:px-3 lg:py-2">
				<div class="summary-accent xl:h-0.8 mb-2 h-0.5 w-10 bg-[#b42318]"></div>

				<h3
					class="summary-title line-clamp-3 text-base leading-snug font-extrabold text-[#102a43] transition-colors group-hover:text-[#b42318]
					@min-[24rem]/breaking-card:text-lg"
				>
					{article.title}
				</h3>

				{#if article.excerpt}
					<p class="summary-excerpt mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
						{article.excerpt}
					</p>
				{/if}

				<p class="summary-date mt-2 line-clamp-2 text-xs text-slate-600/70 lg:mt-1">
					{formatDate(article.publishDate)}
				</p>
			</div>
		</div>
	</a>
</section>

<style>
	@media (min-width: 64rem) {
		/* Headlines sets the row height; the summary uses the space below the 16:9 image. */
		.summary {
			container: breaking-summary / size;
		}

		.summary-title,
		.summary-excerpt {
			font-size: var(--text-xs);
		}

		.summary-accent,
		.summary-excerpt {
			display: none;
		}

		@container breaking-card (min-width: 20rem) {
			.summary-title {
				font-size: var(--text-sm);
			}
		}

		@container breaking-summary (min-height: 6rem) {
			.summary-accent {
				display: block;
			}
		}

		@container breaking-card (min-width: 24rem) {
			.summary-excerpt {
				font-size: var(--text-sm);
			}

			@container breaking-summary (min-height: 5rem) {
				.summary-title {
					font-size: var(--text-base);
				}
			}
		}
	}
</style>
