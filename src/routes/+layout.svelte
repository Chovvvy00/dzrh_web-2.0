<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon/favicon.ico';
	import type { LayoutProps } from './$types';

	import TopBanner from '#lib/components/TopBanner.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import RadioPlayerComponent from '#lib/components/RadioPlayerComponent.svelte';
	import YoutubeEmbed from '#lib/components/YoutubeEmbed.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="w-full bg-white pb-16">
	<div class="flex min-h-screen flex-col bg-white">
		<!-- Main content -->
		<div class="mx-auto w-full max-w-360 flex-1 px-4 sm:px-6 lg:px-8">
			<TopBanner />

			<Header />

			<main>
				{@render children()}
			</main>
		</div>

		<YoutubeEmbed />

		<Footer />
	</div>

	<div
		class="fixed right-0 bottom-[env(safe-area-inset-bottom)] left-0 z-30
		flex h-16 items-center bg-yellow-400 text-blue-950"
	>
		<!-- player content -->
		<RadioPlayerComponent />
	</div>

</div>