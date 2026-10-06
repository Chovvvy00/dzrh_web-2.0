<script lang="ts">
	let isOpen = $state(true);

	const title = 'DZRH Youtube Embed';
	// const youtubeId = 'x9k8xSDrr2k';
</script>

<article
	class={[
		'fixed top-full right-0 z-20 w-md max-w-[calc(100%-4rem)] bg-white drop-shadow',
		'pb-15 transition-transform duration-350 ease-out',
		isOpen ? '-translate-y-full' : '-translate-y-26'
	]}
>
	<header class="flex h-10 items-center justify-between gap-6 p-2 pl-4">
		<h1 class="line-clamp-1 text-sm">
			{title}
		</h1>

		<button
			type="button"
			aria-label={isOpen ? 'Hide player' : 'Show player'}
			class={[
				'flex size-8 items-center justify-center rounded-full text-neutral-600',
				'transition-transform hover:bg-neutral-100',
				isOpen ? 'rotate-90' : '-rotate-90'
			]}
			onclick={() => (isOpen = !isOpen)}
		>
			›
		</button>
	</header>
<!-- 
	<iframe
		src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&rel=0&enablejsapi=1`}
		{title}
		class="aspect-video w-full bg-neutral-100"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	></iframe> -->

	<iframe
		class="aspect-video w-full bg-neutral-100"
		src="https://www.youtube.com/embed/VzS75VuvLxs?si=WOCvA4AWbhVK3J5w"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</article>
