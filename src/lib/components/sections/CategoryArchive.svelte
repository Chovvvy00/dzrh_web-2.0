<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import type { Article } from '#lib/types/article.ts';

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

<section aria-labelledby={headingId} class="min-w-0 pb-8 [overflow-wrap:anywhere] sm:pb-10">
	<nav aria-label="Breadcrumb" class="mb-3 text-sm font-medium text-slate-500 sm:mb-5 sm:text-base">
		<ol class="flex flex-wrap items-center gap-2">
			<li>
				<a
					href={sitePath('/')}
					class="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
					>Home</a
				>
			</li>
			<li aria-hidden="true" class="text-slate-300">/</li>
			<li aria-current="page" class="text-slate-700">{title}</li>
		</ol>
	</nav>

	<header class="relative mb-5 border-b border-neutral-200 pb-4 sm:mb-6 sm:pb-6">
		<h1
			id={headingId}
			class="text-2xl leading-tight font-extrabold tracking-tight text-[#102A43] sm:text-4xl"
		>
			{title} Articles
		</h1>
		<!-- {#if description}
			<p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>
		{/if} -->
		<span class="absolute -bottom-px left-0 h-1 w-14 rounded-full bg-red-700" aria-hidden="true"
		></span>
	</header>

	{#if lead}
		<div
			class="grid gap-5 {highlights.length ? 'md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]' : ''}"
		>
			<article class="min-w-0">
				<a
					href={sitePath(`/post/${lead.slug}`)}
					class="group relative flex h-full min-h-80 items-end overflow-hidden rounded-xl bg-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 sm:min-h-96"
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
						class="absolute inset-0 bg-linear-to-t from-[#071b2e]/80 via-[#071b2e]/10 to-[#071b2e]/10"
					></div>
					<div class="relative w-full min-w-0 p-4 sm:p-6">
						<!-- <span
							class="mb-4 inline-flex rounded-sm bg-[#f7d347] px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-[#102A43] uppercase"
							>Top story</span
						> -->
						<h2
							class="text-xl leading-tight font-extrabold tracking-tight text-white sm:text-2xl xl:text-3xl"
						>
							{lead.title}
						</h2>
						{#if lead.datePosted}
							<p class="mt-1 text-xs font-medium text-white/75">{lead.datePosted}</p>
						{/if}
						{#if lead.excerpt}
							<p class="mt-3 line-clamp-3 text-sm leading-relaxed text-white/85">{lead.excerpt}</p>
						{/if}
						<span
							class="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#f7d347] sm:mt-5"
							>Read full story {@render arrow()}</span
						>
					</div>
				</a>
			</article>

			{#if highlights.length}
				<div
					class="flex min-w-0 flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200 px-1 md:px-3"
				>
					{#each highlights as article (article.id)}
						<article class="flex flex-1 flex-col justify-center py-1 md:py-3">
							<a
								href={sitePath(`/post/${article.slug}`)}
								class="group flex min-w-0 items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
							>
								<div
									class="aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:w-40 md:w-28 xl:w-36 2xl:w-52"
								>
									{#if article.image}
										<img
											src={article.image}
											alt=""
											loading="lazy"
											class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
										/>
									{/if}
								</div>
								<div class="min-w-0 flex-1">
									<h2
										class="line-clamp-3 text-sm leading-snug font-bold text-[#102A43] transition-colors group-hover:text-red-700 xl:text-base"
									>
										{article.title}
									</h2>
									{#if article.excerpt}
										<p class="md:mb-1.5 line-clamp-1 text-xs leading-relaxed text-slate-500">
											{article.excerpt}
										</p>
									{/if}
									{#if article.datePosted}
										<p class="text-[11px] text-slate-500">{article.datePosted}</p>
									{/if}
								</div>
							</a>
						</article>
					{/each}
				</div>
			{/if}
		</div>

		{#if archiveArticles.length}
			<div class="mt-7 mb-4 flex items-center gap-3 sm:mt-9 sm:mb-5">
				<span class="h-5 w-1 shrink-0 rounded-full bg-red-700" aria-hidden="true"></span>
				<h2 class="min-w-0 text-base font-extrabold tracking-tight text-[#102A43] sm:text-lg">
					More {title} stories
				</h2>
				<div class="h-px min-w-4 flex-1 bg-neutral-200" aria-hidden="true"></div>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
				{#each visibleArticles as article (article.id)}
					<article class="min-w-0">
						<a
							href={sitePath(`/post/${article.slug}`)}
							class="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-[border-color,box-shadow] hover:border-neutral-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
						>
							<div class="aspect-video overflow-hidden bg-neutral-100">
								{#if article.image}
									<img
										src={article.image}
										alt=""
										loading="lazy"
										class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
									/>
								{/if}
							</div>
							<div class="flex flex-1 flex-col p-4">
								{#if article.datePosted}
									<p class="mb-2 text-[11px] text-slate-500">{article.datePosted}</p>
								{/if}
								<h3
									class="line-clamp-3 text-base leading-snug font-bold text-[#102A43] transition-colors group-hover:text-red-700"
								>
									{article.title}
								</h3>
								{#if article.excerpt}
									<p class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
										{article.excerpt}
									</p>
								{/if}
								<span
									class="mt-auto flex items-center justify-between gap-2 pt-5 text-xs font-bold text-red-700"
									>Read story {@render arrow()}</span
								>
							</div>
						</a>
					</article>
				{/each}
			</div>

			<div
				class="mt-6 flex flex-col items-stretch gap-4 border-t border-neutral-200 pt-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
			>
				<p role="status" class="text-xs text-slate-500">
					Showing {4 + visibleArticles.length} of {articles.length} articles
				</p>
				{#if visibleCount < archiveArticles.length}
					<button
						type="button"
						onclick={() => (visibleCount += 9)}
						class="inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#102A43] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
					>
						More articles {@render arrow()}
					</button>
				{:else}
					<p class="text-xs text-slate-500">You're all caught up.</p>
				{/if}
			</div>
		{/if}
	{:else}
		<div
			class="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center"
		>
			<h2 class="text-lg font-bold text-[#102A43]">No articles yet</h2>
			<p class="mt-2 text-sm text-slate-500">
				Check back soon for more {title.toLowerCase()} stories.
			</p>
		</div>
	{/if}
</section>
