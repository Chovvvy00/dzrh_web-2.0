<script lang="ts">
	import Icon from '@iconify/svelte';

	let isPlaying = $state(false);
	let volume = $state(0.7);
	// let isStationSelectorOpen = $state(false);

	const station = {
		name: 'DZRH',
		program: 'Chillax Time',
		startTime: '1:30 PM',
		endTime: '3:00 PM'
	};

	function togglePlay() {
		isPlaying = !isPlaying;
	}
</script>

<!-- Safari should detect THIS fixed element as white -->
<div class="fixed inset-x-0 bottom-0 z-30 bg-white">
	<!-- Actual radio player -->
	<div
		class="flex h-16 w-full items-center bg-yellow-400 text-blue-950"
	>
		<!-- NOW PLAYING -->
		<div
			class="hidden h-full items-center justify-center rounded-r-full
			bg-blue-950 px-6 font-extrabold whitespace-nowrap
			text-white uppercase xl:flex"
		>
			Now Playing!
		</div>

		<!-- STATION INFO -->
		<div class="flex min-w-0 flex-1 items-center gap-2 px-2 lg:px-4">
			<div class="size-10 shrink-0 rounded-sm bg-white"></div>

			<div
				class="flex min-w-0 flex-col items-start
				lg:flex-row lg:items-center lg:gap-2"
			>
				<p
					class="line-clamp-2 text-sm leading-4 font-extrabold
					uppercase lg:text-base"
				>
					{station.program}
				</p>

				<div class="hidden h-3.5 w-px bg-blue-950 lg:block"></div>

				<p class="text-xs leading-4 whitespace-nowrap lg:text-sm">
					{station.startTime} - {station.endTime}
				</p>
			</div>
		</div>

		<div class="hidden h-12 w-px bg-blue-950 lg:block"></div>

		<!-- PLAY -->
		<button
			type="button"
			aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
			onclick={togglePlay}
			class="flex min-h-11 cursor-pointer items-center justify-center px-3 lg:px-5"
		>
			{#if isPlaying}
				<Icon icon="mdi:pause" class="text-xl" />
			{:else}
				<Icon icon="mdi:play" class="text-xl" />
			{/if}
		</button>

		<div class="hidden h-12 w-px bg-blue-950 lg:block"></div>

		<!-- VOLUME -->
		<div class="hidden px-5 lg:block">
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				bind:value={volume}
				aria-label="Adjust volume"
				class="w-36 cursor-pointer"
			/>
		</div>

		<div class="hidden h-12 w-px bg-blue-950 lg:block"></div>

		<!-- SHARE -->
		<button
			type="button"
			aria-label="Share"
			class="flex min-h-11 cursor-pointer items-center gap-2 px-3 lg:px-5"
		>
			<Icon icon="mdi:share-variant" class="text-xl" />
			<span class="hidden font-medium xl:block">Share</span>
		</button>
	</div>

	<!-- Important: actual white bottom edge -->
	<div class="h-px bg-white" aria-hidden="true"></div>
</div>