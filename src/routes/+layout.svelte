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
</svelte:head>

<div class="w-full pb-16">
	<div class="flex min-h-screen flex-col ">

		<!-- Main content -->
		<div class="mx-auto w-full max-w-360 flex-1 px-4 sm:px-6 lg:px-8">
			<!-- Top Banner -->
			<TopBanner />

			<Header />

			<main>
				{@render children()}
			</main>
		</div>

		<!-- YouTube -->
		<YoutubeEmbed />
		
		<!-- Footer -->
		<Footer />
	</div>


	<!-- Fixed Radio Player -->
	<RadioPlayerComponent />
</div>
