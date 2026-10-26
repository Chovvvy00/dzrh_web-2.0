<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import type { IconName } from '#lib/icons.ts';

	type Props = {
		/** Absolute URL of the article being shared. */
		url: string;
		title: string;
		layout?: 'row' | 'rail';
	};

	let { url, title, layout = 'row' }: Props = $props();
	const componentId = $props.id();
	const menuId = `${componentId}-share-options`;
	let menu: HTMLDetailsElement;
	let trigger: HTMLElement;
	let open = $state(false);

	// Add future dropdown destinations here.
	let extraShareLinks = $derived<{ label: string; icon: IconName; href: string }[]>([
		{
			label: 'WhatsApp',
			icon: 'whatsapp',
			href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`
		},
		{
			label: 'X',
			icon: 'x',
			href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
		},
		{
			label: 'Telegram',
			icon: 'telegram',
			href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
		},
		{
			label: 'Email',
			icon: 'email',
			href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
		}
	]);

	function closeMenu(restoreFocus = false) {
		if (menu) menu.open = false;
		open = false;
		if (restoreFocus) trigger?.focus();
	}

	function handleOutsideClick(event: PointerEvent) {
		if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) closeMenu();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (menu?.open && event.key === 'Escape') {
			event.preventDefault();
			closeMenu(true);
		}
	}

	function handleFocusout(event: FocusEvent) {
		if (event.relatedTarget instanceof Node && !menu.contains(event.relatedTarget)) closeMenu();
	}

	let copyStatus = $state('');
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		// Reset feedback when navigating between posts without remounting.
		void url;
		closeMenu();
		copied = false;
		copyStatus = '';
		return () => clearTimeout(resetTimer);
	});

	async function copyLink(destination?: string) {
		closeMenu();
		clearTimeout(resetTimer);
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			copyStatus = destination
				? `Link copied. Open ${destination} and paste it into a conversation.`
				: 'Link copied to clipboard';
		} catch {
			copied = false;
			copyStatus = 'Unable to copy. Copy the article URL from your address bar.';
		}
		resetTimer = setTimeout(() => {
			copied = false;
			copyStatus = '';
		}, 5000);
	}

	async function shareToMessenger() {
		if (typeof navigator.share === 'function') {
			try {
				await navigator.share({ title, url });
				return;
			} catch (error) {
				if (error instanceof Error && error.name === 'AbortError') return;
			}
		}
		await copyLink('Messenger');
	}
</script>

<svelte:window onpointerdown={handleOutsideClick} onkeydown={handleKeydown} />

<div
	class="share-actions"
	class:rail={layout === 'rail'}
	role="group"
	aria-label="Share this article"
>
	<a
		class="quick-share"
		href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Share on Facebook"
		title="Share on Facebook"
	>
		<Icon name="facebook" class="h-5 w-5" />
	</a>
	<button
		type="button"
		class="quick-share"
		onclick={shareToMessenger}
		aria-label="Share via Messenger"
		title="Choose Messenger in your device share menu, or copy the link for Messenger"
	>
		<Icon name="messenger" class="h-5 w-5" />
	</button>
	<button
		type="button"
		class="quick-share"
		onclick={() => copyLink('Instagram')}
		aria-label="Copy link for Instagram"
		title="Copy link to share on Instagram"
	>
		<Icon name="instagram" class="h-5 w-5" />
	</button>
	<button
		type="button"
		class="quick-share"
		class:copied
		onclick={() => copyLink()}
		aria-label={copied ? 'Link copied' : 'Copy link'}
		title={copied ? 'Link copied' : 'Copy link'}
	>
		<Icon name={copied ? 'check' : 'link'} class="h-5 w-5" />
	</button>
	<details bind:this={menu} bind:open onfocusout={handleFocusout}>
		<summary
			bind:this={trigger}
			class="quick-share"
			aria-controls={menuId}
			aria-expanded={open}
			aria-label="More share options"
			title="More share options"
		>
			<Icon name="chevron-down" class="h-5 w-5" />
		</summary>
		<div id={menuId} class="share-dropdown">
			<p class="dropdown-heading">More share options</p>
			{#each extraShareLinks as destination (destination.label)}
				<a
					href={destination.href}
					target={destination.icon === 'email' ? undefined : '_blank'}
					rel="noopener noreferrer"
					onclick={() => closeMenu(true)}
				>
					<Icon name={destination.icon} class="h-5 w-5" />
					<span>{destination.label}</span>
				</a>
			{/each}
		</div>
	</details>
	<p role="status" class="share-feedback">{copyStatus}</p>
</div>

<style>
	.share-actions {
		position: relative;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px;
		width: fit-content;
		padding: 8px;
		border: 1px solid #e2e8f0;
		border-radius: 18px;
		background: #fff;
		box-shadow: 0 4px 16px rgb(16 42 67 / 7%);
		color: #102a43;
	}

	.quick-share {
		display: flex;
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		padding: 0;
		border-radius: 12px;
		background: #f8fafc;
		cursor: pointer;
	}

	summary {
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.share-dropdown {
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		z-index: 10;
		width: 250px;
		max-width: calc(100vw - 3rem);
		max-height: 60dvh;
		overflow-y: auto;
		padding: 8px;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 4px 16px rgb(16 42 67 / 14%);
	}

	.dropdown-heading {
		padding: 8px 10px;
		color: #64748b;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
	}

	.share-dropdown a {
		display: flex;
		min-height: 44px;
		align-items: center;
		gap: 12px;
		padding: 8px 10px;
		border-radius: 8px;
		font-size: 14px;
	}

	summary:hover,
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

	button.copied {
		background: #f0fdf4;
		color: #15803d;
	}

	.share-feedback {
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		z-index: 10;
		width: 250px;
		max-width: calc(100vw - 3rem);
		padding: 12px;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		background: #fff;
		box-shadow: 0 4px 16px rgb(16 42 67 / 7%);
		color: #475569;
		font-size: 13px;
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
</style>
