<script lang="ts">
	import { fitNewsSummary } from '#lib/actions/fitNewsSummary.ts';
	import { onMount } from 'svelte';
	import { postPath } from '#lib/paths.ts';
	import { featuredArticle as article } from '#lib/data/articles.ts';

	let { matchHeightTo }: { matchHeightTo?: string } = $props();
	let leadHeight = $state<number | null>(null);

	onMount(() => {
		if (!matchHeightTo) return;
		const lead = document.querySelector<HTMLElement>(matchHeightTo);
		if (!lead) return;

		// The main news row determines the height, including after a breakpoint changes.
		const updateHeight = () => {
			leadHeight = lead.getBoundingClientRect().height || null;
		};
		updateHeight();
		const observer = new ResizeObserver(updateHeight);
		observer.observe(lead);
		return () => observer.disconnect();
	});
</script>

<section
	class:matched={leadHeight !== null}
	style:--lead-height={leadHeight !== null ? `${leadHeight}px` : undefined}
	class="@container flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white"
>
	<!-- Header -->
	<div
		class="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 bg-[#f7d347] px-3 py-2.5 lg:h-12 lg:py-0 @min-[24rem]:px-4 @min-[24rem]:py-3"
	>
		<h2
			class="min-w-0 text-sm leading-snug font-extrabold tracking-[0.08em] text-slate-700 uppercase xl:text-base"
		>
			Featured
		</h2>
		<!--
		<div
			class="group/more -my-2.5 flex shrink-0 items-center gap-1.5 self-stretch py-2.5 text-xs font-bold tracking-widest text-slate-700/80 uppercase"
		>
			<span>Editor's Choice</span>
		</div> -->
	</div>

	<div class="featured-body divide-y divide-neutral-200">
		<a href={postPath(article.slug)} class="featured-link group block">
			<div class="relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-200">
				<img
					src={article.image}
					alt={article.title}
					class="transistion-transform h-full w-full object-cover duration-500 group-hover:scale-105"
				/>

				<div
					class="to transparent pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent"
				></div>
			</div>

			<div use:fitNewsSummary class="featured-summary relative">
				<div class="summary-content p-3 @min-[24rem]:p-5">
					<div class="summary-accent mb-2 h-0.5 w-10 bg-[#f7d347]"></div>

					<h3
						class="summary-title line-clamp-2 overflow-clip text-sm leading-snug font-extrabold text-slate-700 transition-colors group-hover:text-[#f7d347] @min-[16rem]:text-base @min-[24rem]:text-lg"
					>
						{article.title}
					</h3>

					<p
						class="summary-excerpt mt-2 line-clamp-2 hidden overflow-clip text-sm leading-relaxed text-slate-700/80 @min-[16rem]:line-clamp-2"
					>
						{article.excerpt}
					</p>

					<p class="summary-date mt-2 line-clamp-2 text-xs text-slate-600/70">
						{article.datePosted}
					</p>

					<div class="summary-cta mt-3">
						<span
							class="inline-flex items-center gap-2 bg-[#f7d347] px-3 py-1.5
							text-xs font-extrabold tracking-wide text-slate-800 uppercase transition-colors
							duration-200 group-hover:bg-[#e9c632] @min-[24rem]:text-sm"
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
			</div>
		</a>
	</div>
</section>

<style>
	@media (min-width: 64rem) {
		.matched {
			height: var(--lead-height);
		}

		.matched .featured-body,
		.matched .featured-link {
			display: flex;
			flex: 1;
			flex-direction: column;
			min-height: 0;
		}

		.matched .featured-summary {
			flex: 1;
			min-height: 0;
			container: featured-summary / size;
		}

		@container featured-summary (min-height: 0px) {
			.summary-content {
				padding: 0.5rem 0.75rem;
			}

			.summary-title {
				font-size: var(--text-sm);
			}

			.summary-accent,
			.summary-excerpt,
			.summary-date,
			.summary-cta {
				display: none;
			}
		}

		@container featured-summary (min-height: 5rem) {
			.summary-title {
				font-size: var(--text-base);
			}

			.summary-date {
				display: block;
			}
		}

		@container featured-summary (min-height: 8rem) {
			.summary-accent,
			.summary-cta {
				display: block;
			}
		}
	}
</style>
