<script lang="ts">
	import type { PageProps } from './$types';
	import { absoluteUrl, postPath, sitePath } from '#lib/paths.ts';
	import { relatedPosts } from '#lib/data/posts.ts';
	import AdBanner from '#lib/components/ads/AdBanner.svelte';
	import ArticleCard from '#lib/components/article/ArticleCard.svelte';
	import PostLayout from '#lib/components/layout/PostLayout.svelte';
	import PostSidebar from '#lib/components/article/PostSidebar.svelte';
	import ShareActions from '#lib/components/article/ShareActions.svelte';
	import dzrhLogo from '#lib/assets/logo/dzrh-logo.svg';

	let { data }: PageProps = $props();

	let post = $derived(data.post);

	// Internal links use postPath; canonical/OG/share URLs use its absolute form.
	let canonicalUrl = $derived(absoluteUrl(postPath(post.slug)));
	let ogImage = $derived(absoluteUrl(post.image));

	let timeLabel = $derived(
		post.publishedAt
			? new Date(post.publishedAt).toLocaleDateString('en-PH', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: post.datePosted
	);

	let tags = $derived(post.tags?.length ? post.tags : [post.category.title]);

	let related = $derived(relatedPosts(post.slug, 4));
	let relatedHeading = $derived(
		related.some((candidate) => candidate.category.title === post.category.title)
			? `More ${post.category.title} stories`
			: 'More stories'
	);

	let structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		headline: post.title,
		description: post.excerpt ?? post.title,
		image: ogImage,
		mainEntityOfPage: canonicalUrl,
		articleSection: post.category.title,
		author: { '@type': 'Organization', name: post.author ?? 'DZRH News' },
		publisher: {
			'@type': 'Organization',
			name: 'DZRH',
			logo: { '@type': 'ImageObject', url: absoluteUrl(dzrhLogo) }
		},
		datePublished: post.publishedAt ?? undefined
	});

	// Escape "</" so article content can never terminate the JSON-LD script tag.
	let structuredDataTag = $derived(
		// eslint-disable-next-line no-useless-escape -- the backslash stops the Svelte parser from ending this component's <script> block.
		`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/<\//g, '<\\/')}<\/script>`
	);
</script>

<svelte:head>
	<title>{post.title} | DZRH</title>
	<meta name="description" content={post.excerpt ?? post.title} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="DZRH" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt ?? post.title} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImage} />
	{#if post.publishedAt}
		<meta property="article:published_time" content={post.publishedAt} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.excerpt ?? post.title} />
	<meta name="twitter:image" content={ogImage} />

	{@html structuredDataTag}
</svelte:head>

<PostLayout>
	{#snippet sidebar()}
		<PostSidebar {post} />
	{/snippet}

	<article class="post-article min-w-0 wrap-anywhere" aria-labelledby="post-title">
		<h1
			id="post-title"
			class="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-neutral-950 sm:text-4xl"
		>
			{post.title}
		</h1>

		<div class="post-image relative">
			<div class="share-rail">
				<ShareActions url={canonicalUrl} title={post.title} layout="rail" />
			</div>
			<figure class="overflow-hidden bg-neutral-100">
				<img
					src={post.image}
					alt={post.title}
					fetchpriority="high"
					class="aspect-[2/1] w-full object-cover"
				/>
			</figure>
		</div>

		<div
			class="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-700 sm:text-base"
		>
			{#if timeLabel}
				<time datetime={post.publishedAt}>{timeLabel}</time>
				<span aria-hidden="true">|</span>
			{/if}
			<span class="font-medium">{post.author ?? 'DZRH News'}</span>
		</div>

		<div class="article-body mt-8 sm:mt-10">
			{#each post.body as paragraph, index (index)}
				<p>{paragraph}</p>
			{/each}
		</div>

		<section aria-label="Advertisement" class="article-ad relative mx-auto my-10 overflow-hidden">
			<AdBanner isTestMode={true} showPlaceholder={true} />
		</section>

		{#if related.length}
			<section aria-labelledby="more-stories-heading" class="mt-14">
				<div
					class="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3"
				>
					<h2 id="more-stories-heading" class="text-xl font-extrabold uppercase">
						{relatedHeading}
					</h2>
					{#if post.category.path}
						<a
							href={sitePath(post.category.path)}
							class="text-sm font-bold text-red-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
							>See all →</a
						>
					{/if}
				</div>
				<div class="grid gap-5 sm:grid-cols-2">
					{#each related as relatedPost (relatedPost.slug)}
						<ArticleCard article={relatedPost} />
					{/each}
				</div>
			</section>
		{/if}

		<footer
			class="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-neutral-200 pt-5 text-sm uppercase"
			aria-label="Article tags"
		>
			<span class="font-bold">Tags</span>
			{#each tags as tag (tag)}
				{#if tag === post.category.title && post.category.path}
					<a
						href={sitePath(post.category.path)}
						class="hover:text-red-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
						>{tag}</a
					>
				{:else}
					<span>{tag}</span>
				{/if}
			{/each}
		</footer>
	</article>
</PostLayout>

<style>
	.share-rail {
		margin-bottom: 1rem;
	}

	.article-body {
		font-size: 1.125rem;
		line-height: 1.95;
		color: #171717;
	}

	.article-body p + p {
		margin-top: 1.5rem;
	}

	.article-ad {
		width: 100%;
		max-width: 728px;
		height: 90px;
	}

	@media (max-width: 639px) {
		.article-ad {
			max-width: 320px;
			height: 50px;
		}
	}

	@media (min-width: 1024px) {
		.share-rail {
			position: absolute;
			top: 1.5rem;
			left: -2rem;
			z-index: 1;
			margin: 0;
		}
	}
</style>
