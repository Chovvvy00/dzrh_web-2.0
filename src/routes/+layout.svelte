<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon/favicon.ico';
	import type { LayoutProps } from './$types';

	import TopBanner from '#lib/components/TopBanner.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import RadioPlayerComponent from '#lib/components/RadioPlayerComponent.svelte';
	import YoutubeEmbed from '#lib/components/YoutubeEmbed.svelte';
	import AdComponent from '#lib/components/AdComponent.svelte';
	import NewsSidebar from '#lib/components/NewsSidebar.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="mx-auto max-w-[1920px] pb-16 text-base">
	<div class="flex min-h-screen w-full flex-col">
		<div class="mx-auto">
			<TopBanner />
		</div>

		<!-- Main content -->
		<main class="flex-1 px-2 md:px-6">
			<!-- Header content -->
			<div class="sticky top-0 z-50 bg-white pt-1">
				<Header />
			</div>

			<section
				class="relative mx-auto my-4 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
			>
				<AdComponent isTestMode={true} showPlaceholder={true} />
			</section>

			<div class="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
				<div class="min-w-0">
					{@render children()}
				</div>

				<NewsSidebar />
			</div>

			<YoutubeEmbed />
		</main>

		<Footer />
		<RadioPlayerComponent />
	</div>
</div>
