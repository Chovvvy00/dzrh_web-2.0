<script>
	import CategoryArchive from '#lib/components/sections/CategoryArchive.svelte';
	import { categoryArchives } from '#lib/data/sample-archives.ts';

    console.log(categoryArchives['headlines'])
</script>

<CategoryArchive {...categoryArchives['headlines']} />
