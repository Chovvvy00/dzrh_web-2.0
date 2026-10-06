<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon/favicon.ico';
	import type { LayoutProps } from './$types';
	import TopBanner from '#lib/components/TopBanner.svelte';
	import Header from '#lib/components/Header.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen w-full">
	<!-- This is the top banner componnet that displays the banner image for both mobile and desktop views. -->
	<TopBanner />
	<div class="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">

		<Header />

		<!-- <div class="border-t border-gray-300"></div> -->

		{@render children()}
	</div>
</div>
