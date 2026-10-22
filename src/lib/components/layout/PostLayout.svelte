<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, sidebar }: { children: Snippet; sidebar: Snippet } = $props();
</script>

<div class="post-layout">
	<div class="min-w-0">{@render children()}</div>
	<aside aria-label="Related news and categories" class="min-w-0">
		{@render sidebar()}
	</aside>
</div>

<style>
	.post-layout {
		display: grid;
		align-items: start;
		gap: 3rem;
		max-width: 1320px;
		margin: 2rem auto 4rem;
	}

	@media (min-width: 1024px) {
		.post-layout {
			grid-template-columns: minmax(0, 1fr) 300px;
			gap: clamp(2rem, 4vw, 3.75rem);
			padding-left: 3rem;
		}
	}
</style>
