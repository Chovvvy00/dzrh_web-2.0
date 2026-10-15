<script lang="ts">
	import CategoryArchive from '#lib/components/sections/CategoryArchive.svelte';
	import { categoryArchives } from '#lib/data/sample-archives.ts';
</script>

<CategoryArchive {...categoryArchives['lifestyle']} />
