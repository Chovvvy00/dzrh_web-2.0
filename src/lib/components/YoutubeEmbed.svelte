<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import fallbackThumbnail from '#lib/assets/logo/rhtv-logo.png';

	type YouTubePlayer = {
		getPlayerState: () => number;
		destroy: () => void;
	};
	type YouTubeWindow = Window & {
		YT?: {
			Player: new (
				element: HTMLIFrameElement,
				options: {
					events: {
						onReady: (event: { target: YouTubePlayer }) => void;
						onStateChange: (event: { data: number }) => void;
						onError: () => void;
					};
				}
			) => YouTubePlayer;
		};
		onYouTubeIframeAPIReady?: () => void;
	};

	let isOpen = $state(false);
	let isPlaying = $state(false);
	let showThumbnail = $state(true);
	let iframe: HTMLIFrameElement;

	const title = 'DZRH Live';
	const youtubeId = 'VzS75VuvLxs';
	let thumbnailSrc = $state(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`);

	onMount(() => {
		let openFrame = 0;
		if (window.innerWidth >= 1024) {
			// Paint the collapsed position before starting the opening transition.
			openFrame = requestAnimationFrame(() => {
				openFrame = requestAnimationFrame(() => (isOpen = true));
			});
		}

		iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&modestbranding=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;

		const youtubeWindow = window as YouTubeWindow;
		const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
		let player: YouTubePlayer | undefined;
		let disposed = false;

		function updatePlayerState(state: number) {
			isPlaying = state === 1;
			// Keep paused video and its controls visible; cover loading/buffering frames.
			showThumbnail = state !== 1 && state !== 2;
		}

		function initializePlayer() {
			if (disposed || player || !youtubeWindow.YT?.Player) return;

			player = new youtubeWindow.YT.Player(iframe, {
				events: {
					onReady: (event) => updatePlayerState(event.target.getPlayerState()),
					onStateChange: (event) => updatePlayerState(event.data),
					onError: () => updatePlayerState(-1)
				}
			});
		}

		function onAPIReady() {
			previousReady?.();
			initializePlayer();
		}

		if (youtubeWindow.YT?.Player) {
			initializePlayer();
		} else {
			youtubeWindow.onYouTubeIframeAPIReady = onAPIReady;
			if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
				const script = document.createElement('script');
				script.src = 'https://www.youtube.com/iframe_api';
				script.async = true;
				document.head.appendChild(script);
			}
		}

		return () => {
			disposed = true;
			cancelAnimationFrame(openFrame);
			player?.destroy();
			if (youtubeWindow.onYouTubeIframeAPIReady === onAPIReady) {
				youtubeWindow.onYouTubeIframeAPIReady = previousReady;
			}
		};
	});
</script>

<article
	class="fixed right-2 bottom-17 left-2 z-20 overflow-hidden rounded-lg border border-neutral-200 shadow-2xl sm:right-4 sm:left-auto sm:w-md lg:bottom-18"
>
	<!-- Header -->
	<header class="flex h-12 items-center justify-between gap-3 border-none bg-white px-3">
		<div class="flex min-w-0 items-center gap-3">
			<!-- YouTube icon -->
			<div
				class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white"
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
					<div
						class="equalizer flex h-4 w-6 shrink-0 items-end justify-between gap-0.5"
						class:playing={isPlaying}
						aria-hidden="true"
					>
						<span class="w-2 rounded-t bg-blue-500"></span>
						<span class="w-2 rounded-t bg-blue-500"></span>
						<span class="w-2 rounded-t bg-blue-500"></span>
						<span class="w-2 rounded-t bg-blue-500"></span>
					</div>
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
			class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-600
			transition-colors hover:bg-neutral-100 hover:text-neutral-900"
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
			'relative grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none',
			isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
		]}
	>
		<div class="min-h-0 overflow-hidden" inert={!isOpen}>
			<!-- Size the transition independently so the player stays anchored to its bottom. -->
			<div class="aspect-video w-full" aria-hidden="true"></div>
			<div class="absolute bottom-0 left-0 aspect-video w-full bg-white">
				<iframe
					bind:this={iframe}
					class="absolute inset-0 block h-full w-full border-0"
					title="DZRH Live Broadcast"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
				<img
					src={thumbnailSrc}
					alt=""
					class="pointer-events-none absolute inset-0 h-full w-full bg-white object-cover"
					class:invisible={!showThumbnail}
					onerror={() => (thumbnailSrc = fallbackThumbnail)}
				/>
			</div>
		</div>
	</div>
</article>

<style>
	.equalizer span {
		height: 100%;
		transform-origin: bottom;
		animation: equalizer 1s ease-in-out infinite alternate;
		animation-play-state: paused;
	}

	.equalizer.playing span {
		animation-play-state: running;
	}

	.equalizer span:nth-child(2) {
		animation-duration: 1.2s;
		animation-delay: -0.2s;
	}

	.equalizer span:nth-child(3) {
		animation-duration: 0.8s;
		animation-delay: -0.4s;
	}

	.equalizer span:nth-child(4) {
		animation-duration: 1.1s;
		animation-delay: -0.1s;
	}

	@keyframes equalizer {
		0% {
			transform: scaleY(0.2);
		}
		50% {
			transform: scaleY(0.6);
		}
		100% {
			transform: scaleY(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.equalizer.playing span {
			animation-play-state: paused;
		}
	}
</style>
