<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon/favicon.ico';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';

	import TopBanner from '#lib/components/layout/TopBanner.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import RadioPlayer from '#lib/components/media/RadioPlayer.svelte';
	import YoutubeEmbed from '#lib/components/media/YoutubeEmbed.svelte';
	import AdBanner from '#lib/components/ads/AdBanner.svelte';
	import NewsSidebar from '#lib/components/layout/NewsSidebar.svelte';

	let { children }: LayoutProps = $props();
	let isPost = $derived(page.route.id?.startsWith('/post/') ?? false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="mx-auto max-w-[1920px] pb-36 text-base lg:pb-16">
	<div class="flex min-h-screen w-full flex-col">
		<div class="mx-auto w-full min-w-0">
			<TopBanner />
		</div>

		<!-- Main content -->
		<main class="min-w-0 flex-1 px-4 sm:px-6">
			<!-- Header content -->
			<div class="sticky top-0 z-50 bg-white pt-1">
				<Header />
			</div>

			<section
				class="relative mx-auto my-4 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
			>
				<AdBanner isTestMode={true} showPlaceholder={true} />
			</section>

			{#if isPost}
				{@render children()}
			{:else}
				<div
					class="mt-6 grid grid-cols-1 items-start gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_280px]"
				>
					<div class="min-w-0">
						{@render children()}
					</div>

					<NewsSidebar />
				</div>
			{/if}

			<YoutubeEmbed />
		</main>

		<Footer />
		<RadioPlayer />
	</div>
</div>
