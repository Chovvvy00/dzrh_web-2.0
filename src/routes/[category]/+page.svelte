<script lang="ts">
	import type { PageProps } from './$types';
	import CategoryArchive from '#lib/components/sections/CategoryArchive.svelte';

	let { data }: PageProps = $props();
</script>

<CategoryArchive {...data.category} />
