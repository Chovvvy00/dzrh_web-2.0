<script lang="ts">
	import { onMount, tick } from 'svelte';

	let {
		isTestMode = true,
		showPlaceholder = false
	}: { isTestMode?: boolean; showPlaceholder?: boolean } = $props();

	type AdSize = {
		width: number;
		height: number;
		name: string;
		path: string;
		testPath: string | null;
		size: [number, number];
	};

	// Only use documented Google sample sizes in test mode; null entries are live-only.
	// https://developers.google.com/publisher-tag/guides/ad-sizes
	const adSizes: AdSize[] = [
		{
			width: 300,
			height: 250,
			name: 'MREC',
			path: '/139546647/rh-mrec',
			testPath: '/6355419/Travel/Europe/France/Paris',
			size: [300, 250]
		},
		{
			width: 250,
			height: 250,
			name: 'SQUARE',
			path: '/139546647/dzrh-v2-square',
			testPath: null,
			size: [250, 250]
		},
		{
			width: 300,
			height: 600,
			name: 'LARGESKYSCRAPER',
			path: '/139546647/dzrh-v2-halfpage',
			testPath: null,
			size: [300, 600]
		},
		{
			width: 300,
			height: 50,
			name: 'MOBILELEADERBOARD2',
			path: '/139546647/dzrh-v2-mob-lb',
			testPath: null,
			size: [300, 50]
		},
		{
			width: 468,
			height: 60,
			name: 'FULLBANNER',
			path: '/139546647/dzrh-v2-fullbanner',
			testPath: null,
			size: [468, 60]
		},
		{
			width: 320,
			height: 50,
			name: 'MOBILELEADERBOARD',
			path: '/139546647/dzrh-v2-mob-lb2',
			testPath: null,
			size: [320, 50]
		},
		{
			width: 728,
			height: 90,
			name: 'LEADERBOARD',
			path: '/139546647/dzrh-v2-leaderboard',
			testPath: '/6355419/Travel/Europe',
			size: [728, 90]
		},
		{
			width: 970,
			height: 90,
			name: 'LARGELEADERBOARD',
			path: '/139546647/dzrh-v2-leaderboard970',
			testPath: null,
			size: [970, 90]
		}
	];

	let containerEl: HTMLDivElement;
	const elementId = $props.id();
	let selectedAd = $state<AdSize | null>(null);
	let containerWidth = $state(0);
	let containerHeight = $state(0);

	function selectAd(width: number, height: number, testMode: boolean): AdSize | null {
		if (width <= 0 || height <= 0) return null;

		return (
			adSizes
				.filter(
					(ad) => (!testMode || ad.testPath !== null) && ad.width <= width && ad.height <= height
				)
				.sort((a, b) => b.width * b.height - a.width * a.height)[0] ?? null
		);
	}

	$effect(() => {
		const nextAd = selectAd(containerWidth, containerHeight, isTestMode && !showPlaceholder);
		const timer = setTimeout(() => {
			// Reuse the current slot when a resize still selects the same format.
			if (selectedAd?.name !== nextAd?.name) selectedAd = nextAd;
		}, 300);

		return () => clearTimeout(timer);
	});

	$effect(() => {
		const ad = selectedAd;
		const targetAdPath = ad && (isTestMode ? ad.testPath : ad.path);
		if (showPlaceholder || !ad || !targetAdPath) return;

		let cancelled = false;
		let slot: googletag.Slot | null = null;
		window.googletag = window.googletag || { cmd: [] };
		const gpt = window.googletag;

		void tick().then(() => {
			if (cancelled) return;

			gpt.cmd.push(() => {
				// GPT may finish loading after the size changes or the component unmounts.
				if (cancelled || !document.getElementById(elementId)) return;

				slot = gpt.defineSlot(targetAdPath, ad.size, elementId);
				if (!slot) return;

				slot.addService(gpt.pubads());
				gpt.enableServices();
				gpt.display(elementId);
			});
		});

		return () => {
			cancelled = true;
			if (slot) {
				const previousSlot = slot;
				gpt.cmd.push(() => gpt.destroySlots([previousSlot]));
			}
		};
	});

	onMount(() => {
		const observer = new ResizeObserver(([entry]) => {
			if (!entry) return;
			containerWidth = entry.contentRect.width;
			containerHeight = entry.contentRect.height;
		});

		observer.observe(containerEl);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	{#if !showPlaceholder}
		<script
			async
			crossorigin="anonymous"
			src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
		></script>
	{/if}
</svelte:head>

<div
	bind:this={containerEl}
	class="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden"
	class:placeholder-layout={showPlaceholder}
>
	{#if selectedAd}
		{#key selectedAd}
			<div class="grid h-full w-full place-items-center">
				{#if showPlaceholder}
					<div
						class="ad-placeholder"
						role="img"
						aria-label={`Advertisement placeholder, ${selectedAd.width} by ${selectedAd.height} pixels`}
						style:width={`${selectedAd.width}px`}
						style:height={`${selectedAd.height}px`}
					>
						<span class="placeholder-label">Advertisement</span>
						<span class="placeholder-size">{selectedAd.width} × {selectedAd.height}</span>
					</div>
				{:else}
					<div
						id={elementId}
						class="flex items-center justify-center"
						style:width={`${selectedAd.width}px`}
						style:height={`${selectedAd.height}px`}
					></div>
				{/if}
			</div>
		{/key}
	{:else if showPlaceholder}
		<p class="px-3 text-center text-xs text-slate-500">No ad size fits this space.</p>
	{/if}
</div>

<style>
	.placeholder-layout {
		background: #f8fafc;
		outline: 1px dashed #cbd5e1;
		outline-offset: -1px;
	}

	.ad-placeholder {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		border: 1px dashed #94a3b8;
		background: repeating-linear-gradient(-45deg, #e2e8f0, #e2e8f0 8px, #edf2f7 8px, #edf2f7 16px);
		color: #475569;
	}

	.placeholder-label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.placeholder-size {
		font-size: 12px;
		font-weight: 500;
	}
</style>
