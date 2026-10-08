<script lang="ts">
	import Icon from '@iconify/svelte';

	let isOpen = $state(true);

	const title = 'DZRH Live';
	const youtubeId = 'VzS75VuvLxs';
</script>

<article
	class={[
		'fixed right-2 bottom-18 left-2 z-20 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-2xl',
		'sm:right-4 sm:left-auto sm:w-md',
		'transition-all duration-300 ease-out'
	]}
>
	<!-- Header -->
	<header
		class="flex h-12 items-center justify-between gap-3 border-b border-neutral-200 bg-white px-3"
	>
		<div class="flex min-w-0 items-center gap-3">
			<!-- YouTube icon -->
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-white"
			>
				<Icon icon="mdi:youtube" class="text-xl" />
			</div>

			<div class="min-w-0">
				<div class="flex items-center gap-2">
					<h2 class="truncate text-sm font-bold text-neutral-900">
						{title}
					</h2>

					<span
						class="flex shrink-0 items-center gap-1 rounded-sm bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white uppercase"
					>
						<span class="size-1.5 rounded-full bg-white"></span>
						Live
					</span>
				</div>

				<p class="truncate text-xs text-neutral-500">Watch the latest DZRH broadcast</p>
			</div>
		</div>

		<!-- Toggle -->
		<button
			type="button"
			aria-label={isOpen ? 'Hide video player' : 'Show video player'}
			aria-expanded={isOpen}
			onclick={() => (isOpen = !isOpen)}
			class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
		>
			<Icon
				icon="mdi:chevron-down"
				class={['text-xl transition-transform duration-300', isOpen ? 'rotate-0' : 'rotate-180']}
			/>
		</button>
	</header>

	<!-- Video -->
	<div
		class={[
			'grid transition-[grid-template-rows] duration-300 ease-out',
			isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
		]}
	>
		<div class="min-h-0 overflow-hidden">
			<iframe
				class="aspect-video w-full bg-black"
				src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&rel=0`}
				title="DZRH Live Broadcast"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
	</div>
</article>
