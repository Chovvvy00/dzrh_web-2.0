<script lang="ts">
	import NewsSidebar from '#lib/components/layout/NewsSidebar.svelte';
	import { postPath, sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/post.ts';

	type Props = {
		title: string;
		description?: string;
		/** Articles ordered from newest to oldest. */
		articles: Article[];
	};

	let { title, description, articles }: Props = $props();
	const headingId = $props.id();
	let lead = $derived(articles[0]);
	let highlights = $derived(articles.slice(1, 4));
	let archiveArticles = $derived(articles.slice(4));
	// Reset the card limit when category data changes; the button can increase it.
	let visibleCount = $derived(Math.min(9, archiveArticles.length));
	let visibleArticles = $derived(archiveArticles.slice(0, visibleCount));
</script>

<svelte:head>
	<title>{title} Articles | DZRH</title>
	<meta
		name="description"
		content={description ??
			`Browse the latest ${title.toLowerCase()} stories and articles from DZRH.`}
	/>
</svelte:head>

{#snippet arrow()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M5 12h14m-6-6 6 6-6 6" />
	</svg>
{/snippet}

<section
	aria-labelledby={headingId}
	class="grid min-w-0 grid-cols-1 items-start gap-x-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:grid-rows-[auto_auto_1fr]"
>
	<div class="min-w-0 lg:col-start-1 lg:row-start-1">
		<nav
			aria-label="Breadcrumb"
			class="mb-3 text-sm leading-relaxed font-medium text-slate-600 sm:mb-3 md:text-base xl:text-lg"
		>
			<ol class="flex flex-wrap items-center gap-2">
				<li>
					<a
						href={sitePath('/')}
						class="inline-flex min-h-11 items-center rounded-sm text-xs transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 md:text-sm xl:text-base"
						>Home</a
					>
				</li>
				<li aria-hidden="true" class="text-slate-300 md:text-sm xl:text-base">/</li>
				<li aria-current="page" class="text-sm text-slate-700 md:text-base xl:text-lg">{title}</li>
			</ol>
		</nav>

		<header class="relative mb-5 border-b border-neutral-200 pb-4 sm:mb-6 sm:pb-6">
			<h1
				id={headingId}
				class="text-2xl leading-tight font-extrabold tracking-tight text-[#102A43] sm:text-3xl xl:text-4xl 2xl:text-5xl"
			>
				{title} Articles
			</h1>

			<span
				class="absolute -bottom-px left-0 h-1 w-14 rounded-full bg-red-700 xl:h-2"
				aria-hidden="true"
			></span>
		</header>
	</div>

	<div class="min-w-0 lg:col-start-1 lg:row-start-2">
		{#if lead}
			<div
				class="grid gap-5 {highlights.length ? 'md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]' : ''}"
			>
				<!-- Lead Big Image -->
				<article class="min-w-0">
					<a
						href={postPath(lead.slug)}
						class="group relative flex aspect-video min-h-0 w-full items-end overflow-hidden rounded-xl bg-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
					>
						{#if lead.image}
							<img
								src={lead.image}
								alt=""
								fetchpriority="high"
								class="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
							/>
						{/if}
						<div
							class="absolute inset-0 bg-linear-to-t from-[#071b2e]/80 via-[#071b2e]/35 to-[#071b2e]/5"
						></div>
						<div class="relative w-full min-w-0 p-3 sm:p-5 md:p-4 xl:p-5">
							<h2
								class="text-xl leading-snug font-extrabold tracking-tight text-white sm:text-2xl xl:text-3xl 2xl:text-4xl"
							>
								{lead.title}
							</h2>
							{#if lead.excerpt}
								<p class="hidden leading-relaxed text-white/95 xl:line-clamp-2 2xl:text-lg">
									{lead.excerpt}
								</p>
							{/if}

							<div class="flex justify-between xl:mt-2 xl:pr-5 2xl:pb-5">
								{#if lead.datePosted}
									<p
										class="text-xs leading-relaxed font-medium text-white/90 sm:text-sm 2xl:text-base"
									>
										{lead.datePosted}
									</p>
								{/if}
								<span
									class="hidden items-center gap-2 text-base leading-relaxed font-bold text-[#f7d347] xl:inline-flex"
									>Read full story {@render arrow()}
								</span>
							</div>
						</div>
					</a>
				</article>

				<!-- 3 Highlight Image -->
				{#if highlights.length}
					<div
						class="flex min-w-0 flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200 px-2 sm:px-3"
					>
						{#each highlights as article (article.id)}
							<article class="flex flex-1 flex-col justify-center py-2 sm:py-3 md:py-1">
								<a
									href={postPath(article.slug)}
									class="group flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
								>
									<!-- Image -->
									<div
										class="aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:w-40 md:w-28 xl:w-36 2xl:w-52"
									>
										{#if article.image}
											<img
												src={article.image}
												alt=""
												loading="lazy"
												class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										{/if}
									</div>

									<!-- Dynamic text container -->
									<div
										class="flex max-h-15 min-h-0 min-w-0 flex-1 flex-col justify-center
										overflow-hidden sm:max-h-22.5 md:max-h-18.75
										xl:max-h-22.5 2xl:max-h-29.25"
									>
										<!-- Title: adapts depending on available space -->
										<h2
											class="line-clamp-2 shrink-0 text-sm leading-tight font-bold text-[#102A43]
											transition-colors group-hover:text-red-700
											sm:text-base xl:text-lg 2xl:line-clamp-3 2xl:text-xl"
										>
											{article.title}
										</h2>

										<!-- Excerpt: fills remaining space -->
										{#if article.excerpt}
											<p
												class="mt-1 hidden min-h-0 overflow-hidden text-sm leading-snug
												text-slate-600 xl:line-clamp-1 2xl:line-clamp-3
												2xl:text-base"
											>
												{article.excerpt}
											</p>
										{/if}

										<!-- Date -->
										{#if article.datePosted}
											<p
												class="mt-1 shrink-0 truncate text-xs leading-tight
												text-slate-500 sm:text-sm"
											>
												{article.datePosted}
											</p>
										{/if}
									</div>
								</a>
							</article>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<div
				class="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-10 text-center sm:px-6 sm:py-16"
			>
				<h2 class="text-2xl leading-snug font-bold text-[#102A43] xl:text-3xl">No articles yet</h2>
				<p class="mt-2 text-base leading-relaxed text-slate-600 xl:text-lg">
					Check back soon for more {title.toLowerCase()} stories.
				</p>
			</div>
		{/if}
	</div>

	<div class="mt-7 min-w-0 sm:mt-9 lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-0">
		<NewsSidebar />
	</div>

	<div class="min-w-0 lg:col-start-1 lg:row-start-3">
		{#if archiveArticles.length}
			<div class="mt-4 mb-4 flex items-center gap-3 sm:mt-9 sm:mb-5">
				<span class="h-5 w-1 shrink-0 rounded-full bg-red-700" aria-hidden="true"></span>
				<h2
					class="min-w-0 text-lg leading-snug font-extrabold tracking-tight text-[#102A43] sm:text-2xl xl:text-3xl"
				>
					More {title} stories
				</h2>
				<div class="h-px min-w-4 flex-1 bg-neutral-200" aria-hidden="true"></div>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{#each visibleArticles as article (article.id)}
					<article class="min-w-0">
						<a
							href={postPath(article.slug)}
							class="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-[border-color,box-shadow] hover:border-neutral-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
						>
							<div class="aspect-video shrink-0 overflow-hidden bg-neutral-100">
								{#if article.image}
									<img
										src={article.image}
										alt=""
										loading="lazy"
										class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
									/>
								{/if}
							</div>

							<div class="flex flex-1 flex-col p-3 sm:p-4 md:p-3">
								<h3
									class="line-clamp-2 text-lg leading-snug font-bold text-[#102A43] transition-colors group-hover:text-red-700 xl:text-xl"
								>
									{article.title}
								</h3>
								{#if article.excerpt}
									<p
										class="line-clamp-3 hidden leading-relaxed text-slate-600 md:text-base xl:text-lg"
									>
										{article.excerpt}
									</p>
								{/if}

								<div class="flex items-center justify-between">
									{#if article.datePosted}
										<p class="text-sm leading-relaxed text-slate-600 xl:text-base">
											{article.datePosted}
										</p>
									{/if}

									<span
										class="flex items-center gap-2 text-sm leading-relaxed font-bold text-red-700"
										>Read story {@render arrow()}
									</span>
								</div>
							</div>
						</a>
					</article>
				{/each}
			</div>

			<div
				class="mt-6 flex flex-col items-stretch gap-4 border-t border-neutral-200 pt-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
			>
				<p role="status" class="text-sm leading-relaxed text-slate-600 xl:text-base">
					Showing {4 + visibleArticles.length} of {articles.length} articles
				</p>
				{#if visibleCount < archiveArticles.length}
					<button
						type="button"
						onclick={() => (visibleCount += 9)}
						class="inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#102A43] px-5 py-3 text-base leading-relaxed font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
					>
						More articles {@render arrow()}
					</button>
				{:else}
					<p class="text-sm leading-relaxed text-slate-600 xl:text-base">You're all caught up.</p>
				{/if}
			</div>
		{/if}
	</div>
</section>
