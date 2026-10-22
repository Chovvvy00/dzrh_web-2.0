<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '#lib/components/Icon.svelte';
	import type { IconName } from '#lib/icons.ts';

	type Props = {
		/** Absolute URL of the article being shared. */
		url: string;
		title: string;
		/** Preserves compatibility with inline and hero-rail placements. */
		layout?: 'row' | 'rail';
	};

	let { url, title, layout = 'row' }: Props = $props();
	const componentId = $props.id();
	const menuId = `${componentId}-share-options`;
	let root: HTMLDetailsElement;
	let trigger: HTMLElement;
	let open = $state(false);
	let canShare = $state(false);
	let copyStatus = $state('');
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	// The first two destinations are always visible; the rest appear in the dropdown.
	let shareLinks = $derived<{ label: string; icon: IconName; href: string }[]>([
		{
			label: 'Facebook',
			icon: 'facebook',
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
		},
		{
			label: 'X',
			icon: 'x',
			href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
		},
		{
			label: 'WhatsApp',
			icon: 'whatsapp',
			href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`
		},
		{
			label: 'Telegram',
			icon: 'telegram',
			// https://core.telegram.org/widgets/share
			href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
		},
		{
			label: 'Email',
			icon: 'email',
			href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
		}
	]);

	onMount(() => {
		canShare = typeof navigator.share === 'function';
	});

	$effect(() => {
		// Reset the dropdown when navigating between posts without remounting.
		void url;
		open = false;
		copied = false;
		copyStatus = '';
		return () => clearTimeout(resetTimer);
	});

	function close(restoreFocus = false) {
		// Native details toggles before its queued `toggle` event updates the binding.
		if (root) root.open = false;
		open = false;
		if (restoreFocus) trigger?.focus();
	}

	function handleOutsideClick(event: PointerEvent) {
		if (root?.open && event.target instanceof Node && !root.contains(event.target)) close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (root?.open && event.key === 'Escape') {
			event.preventDefault();
			close(true);
		}
	}

	function handleFocusout(event: FocusEvent) {
		if (event.relatedTarget instanceof Node && !root.contains(event.relatedTarget)) close();
	}

	async function copyLink() {
		clearTimeout(resetTimer);
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			copyStatus = 'Link copied to clipboard';
		} catch {
			copied = false;
			copyStatus = 'Unable to copy. Copy the article URL from your address bar.';
		}
		resetTimer = setTimeout(() => {
			copied = false;
			copyStatus = '';
		}, 3000);
	}

	async function shareToApp() {
		try {
			await navigator.share({ title, url });
			close(true);
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') return;
			copyStatus = 'Unable to open sharing. Choose a platform or copy the link.';
		}
	}
</script>

<svelte:window onpointerdown={handleOutsideClick} onkeydown={handleKeydown} />

<div
	class="share-actions"
	class:rail={layout === 'rail'}
	role="group"
	aria-label="Share this article"
>
	{#each shareLinks.slice(0, 2) as destination (destination.label)}
		<a
			class="quick-share"
			href={destination.href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Share on ${destination.label}`}
			title={`Share on ${destination.label}`}
		>
			<Icon name={destination.icon} class="h-5 w-5" />
		</a>
	{/each}
	<details bind:this={root} bind:open onfocusout={handleFocusout}>
		<summary
			bind:this={trigger}
			aria-controls={menuId}
			aria-expanded={open}
			aria-label="More share options"
			title="More share options"
		>
			<span class="chevron" class:expanded={open} aria-hidden="true">
				<Icon name="chevron-down" class="h-5 w-5" />
			</span>
		</summary>

		<div id={menuId} class="share-dropdown">
			<p class="dropdown-heading">Share this story</p>
			<ul aria-label="Share destinations">
				{#each shareLinks.slice(2) as destination (destination.label)}
					<li>
						<a
							href={destination.href}
							target={destination.icon === 'email' ? undefined : '_blank'}
							rel="noopener noreferrer"
							onclick={() => close(true)}
						>
							<span class="platform-icon"><Icon name={destination.icon} class="h-5 w-5" /></span>
							<span>{destination.label}</span>
						</a>
					</li>
				{/each}
			</ul>
			<div class="share-tools">
				<button type="button" onclick={copyLink} class:copied>
					<span class="platform-icon"
						><Icon name={copied ? 'check' : 'link'} class="h-5 w-5" /></span
					>
					<span>{copied ? 'Link copied!' : 'Copy link'}</span>
				</button>
				{#if canShare}
					<button type="button" onclick={shareToApp}>
						<span class="platform-icon"><Icon name="share" class="h-5 w-5" /></span>
						<span>More apps…</span>
					</button>
				{/if}
			</div>
			<p role="status" class="share-feedback">{copyStatus}</p>
		</div>
	</details>
</div>

<style>
	.share-actions {
		position: relative;
		display: flex;
		align-items: center;
		gap: 6px;
		width: fit-content;
		padding: 8px;
		border: 1px solid #e2e8f0;
		border-radius: 18px;
		background: #fff;
		box-shadow: 0 4px 16px rgb(16 42 67 / 7%);
		color: #102a43;
	}

	.quick-share,
	summary {
		display: flex;
		width: 44px;
		height: 44px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 12px;
		background: #f8fafc;
		list-style: none;
		cursor: pointer;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover,
	details[open] summary {
		border-color: #fecaca;
		background: #fff1f2;
		color: #b91c1c;
	}

	.chevron {
		transition: transform 150ms;
	}

	.chevron.expanded {
		transform: rotate(180deg);
	}

	.share-dropdown {
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		z-index: 10;
		width: 250px;
		max-width: calc(100vw - 3rem);
		max-height: min(440px, 60dvh);
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 8px;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		background: #fff;
		box-shadow: 0 12px 32px rgb(16 42 67 / 14%);
	}

	.dropdown-heading {
		padding: 8px 10px 12px;
		color: #64748b;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.share-dropdown a,
	.share-dropdown button {
		display: flex;
		width: 100%;
		min-height: 44px;
		align-items: center;
		gap: 12px;
		padding: 6px 10px;
		border-radius: 10px;
		font-size: 14px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
	}

	a:hover,
	button:hover {
		background: #fff1f2;
		color: #b91c1c;
	}

	summary:focus-visible,
	a:focus-visible,
	button:focus-visible {
		outline: 2px solid #b91c1c;
		outline-offset: 2px;
	}

	.platform-icon {
		display: grid;
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		place-items: center;
		border-radius: 8px;
		background: #f8fafc;
	}

	.share-tools {
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px solid #e2e8f0;
	}

	button.copied {
		background: #f0fdf4;
		color: #15803d;
	}

	.share-feedback {
		padding: 8px 10px;
		color: #475569;
		font-size: 12px;
		line-height: 1.5;
	}

	.share-feedback:empty {
		display: none;
	}

	@media (min-width: 1024px) {
		.rail {
			flex-direction: column;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chevron {
			transition: none;
		}
	}
</style>
