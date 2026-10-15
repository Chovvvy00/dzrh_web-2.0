<script lang="ts">
	import AdComponent from '#lib/components/AdComponent.svelte';
	import Featured from '#lib/components/sections/Featured.svelte';
	import Trending from '#lib/components/sections/Trending.svelte';
	import MostRead from '#lib/components/sections/MostRead.svelte';
</script>

<aside aria-label="Featured and popular news" class="hidden min-w-0 space-y-4 lg:block">
	<Featured />
	<Trending />
	<MostRead />

	<section class="relative mx-auto mb-4 h-62.5 w-75 max-w-full overflow-hidden">
		<AdComponent isTestMode={true} showPlaceholder={true} />
	</section>
</aside>
