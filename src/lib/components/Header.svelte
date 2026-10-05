<script lang="ts">
	import { resolve } from '$app/paths';
	import logo from '#lib/assets/logo/dzrh-logo.svg';
	import LotteryIcon from '@iconify-svelte/fluent/lottery-24-filled';
	import FacebookIcon from '@iconify-svelte/simple-icons/facebook';
	import ThreadsIcon from '@iconify-svelte/simple-icons/threads';
	import TiktokIcon from '@iconify-svelte/simple-icons/tiktok';
	import XIcon from '@iconify-svelte/simple-icons/x';
	import YoutubeIcon from '@iconify-svelte/simple-icons/youtube';
	import CrystalBallIcon from '@iconify-svelte/twemoji/crystal-ball';
	import OpenBookIcon from '@iconify-svelte/twemoji/open-book';
	import MessengerIcon from '@iconify-svelte/simple-icons/messenger';

	type NavLink = {
		name: string;
		href: string;
	};

	const navLinks: NavLink[] = [
		{ name: 'NATION', href: '/nation' },
		{ name: 'ENTERTAINMENT', href: '/entertainment' },
		{ name: 'WORLD', href: '/world' },
		{ name: 'SPORTS', href: '/sports' },
		{ name: 'LIFESTYLE', href: '/lifestyle' }
	];

	type SocialLink = {
		name: string;
		href: string;
		Icon: typeof FacebookIcon;
	};

	const socialLinks: SocialLink[] = [
		{ name: 'YouTube', href: '#', Icon: YoutubeIcon },
		{ name: 'TikTok', href: '#', Icon: TiktokIcon },
		{ name: 'Messenger', href: '#', Icon: MessengerIcon },
		{ name: 'Threads', href: '#', Icon: ThreadsIcon },
		{ name: 'X', href: '#', Icon: XIcon },
		{ name: 'Facebook', href: '#', Icon: FacebookIcon }
		// { name: 'Instagram', href: '#', Icon: InstagramIcon },
	];

	type UtilityLink = {
		name: string;
		href: string;
		Icon: typeof OpenBookIcon | typeof LotteryIcon | typeof CrystalBallIcon;
	};

	const utilityLinks: UtilityLink[] = [
		{ name: 'Word of the Day', href: '/word-of-the-day', Icon: OpenBookIcon },
		{ name: 'Lottery', href: '/lottery', Icon: LotteryIcon },
		{ name: 'Horoscope', href: '/horoscope', Icon: CrystalBallIcon }
	];

	let mobileMenuOpen = $state(false);
	let mobileMenuButton: HTMLButtonElement;

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
			if (mobileMenuButton?.getClientRects().length) mobileMenuButton.focus();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header>
	<div class="lg:hidden">
		<div class="flex h-17.5 items-center justify-between gap-4">
			<a href={resolve('/')} aria-label="DZRH home" onclick={closeMobileMenu}>
				<img src={logo} alt="DZRH Logo" class="h-10 w-auto" />
			</a>
			<button
				bind:this={mobileMenuButton}
				type="button"
				aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-navigation"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				data-open={mobileMenuOpen}
				class="group flex size-11 items-center justify-center text-black transition-[background-color,transform] duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
			>
				<span class="relative block size-6" aria-hidden="true">
					<span
						class="absolute top-1 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-in-out group-data-[open=true]:translate-y-1.75 group-data-[open=true]:rotate-45 motion-reduce:transition-none"
					></span>
					<span
						class="absolute top-2.75 left-0 h-0.5 w-6 rounded-full bg-current transition-[opacity,transform] duration-200 ease-in-out group-data-[open=true]:scale-x-0 group-data-[open=true]:opacity-0 motion-reduce:transition-none"
					></span>
					<span
						class="absolute top-4.5 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-in-out group-data-[open=true]:-translate-y-1.75 group-data-[open=true]:-rotate-45 motion-reduce:transition-none"
					></span>
				</span>
			</button>
		</div>

		<div
			id="mobile-navigation"
			data-open={mobileMenuOpen}
			inert={!mobileMenuOpen}
			aria-hidden={!mobileMenuOpen}
			class="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-in-out data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 motion-reduce:transition-none"
		>
			<div class="min-h-0 overflow-hidden">
				<div class="border-t border-gray-200 py-3">
					<nav aria-label="Mobile primary navigation">
						<ul class="grid gap-1 sm:grid-cols-2">
							{#each navLinks as link (link.href)}
								<li>
									<a
										href={resolve(link.href)}
										onclick={closeMobileMenu}
										class="flex min-h-11 items-center px-3 text-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-black"
									>
										{link.name}
									</a>
								</li>
							{/each}
							<li>
								<a
									href={resolve('/special-coverage')}
									onclick={closeMobileMenu}
									class="flex min-h-11 items-center justify-center bg-red-600 px-3 text-sm text-white hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
								>
									SPECIAL COVERAGE
								</a>
							</li>
						</ul>
					</nav>

					<div
						class="mt-3 flex flex-wrap items-center justify-center gap-2 border-t border-gray-200 pt-3"
					>
						{#each socialLinks as { name, href, Icon } (name)}
							<a
								{href}
								aria-label={name}
								target="_blank"
								rel="noopener noreferrer"
								class="flex size-11 items-center justify-center rounded-full border border-black bg-transparent text-black transition-all duration-200 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								<Icon class="h-3.5 w-3.5" />
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<nav aria-label="Mobile utility navigation" class="border-y border-gray-200 py-1">
			<ul class="grid grid-cols-3 gap-2">
				{#each utilityLinks as { name, href: path, Icon } (name)}
					<li>
						<a
							href={resolve(path)}
							class="flex min-h-6 items-center justify-center gap-1.5 text-xs hover:underline sm:text-sm"
						>
							<Icon height="1.25em" class="shrink-0" />
							<span class="truncate">{name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="hidden lg:block">
		<!-- Header content logo, main nav and social links -->
		<div class="flex h-17.5 items-center justify-between px-4">
			<div>
				<a href={resolve('/')}>
					<img src={logo} alt="DZRH Logo" class="h-10 w-auto" />
				</a>
			</div>

			<nav aria-label="Primary navigation">
				<ul class="flex items-center gap-4">
					{#each navLinks as link (link.href)}
						<li>
							<a href={resolve(link.href)}>
								{link.name}
							</a>
						</li>
					{/each}
					<li>
						<a href={resolve('/special-coverage')} class="bg-red-600 px-3 py-1 text-white hover:bg-red-500">
							SPECIAL COVERAGE
						</a>
					</li>
				</ul>
			</nav>

			<div class="flex items-center gap-2">
				<div class="flex items-center gap-1.5">
					{#each socialLinks as { name, href, Icon } (name)}
						<a
							{href}
							aria-label={name}
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-7 w-7 items-center justify-center rounded-full border border-black bg-transparent text-black transition-all duration-200 hover:bg-black hover:text-white"
						>
							<Icon class="h-3.5 w-3.5" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Utility nav consisting word of the day, lotto and horoscope -->
		<div class="flex h-8 items-start justify-end">
			<ul class="grid grid-cols-3">
				{#each utilityLinks as { name, href: path, Icon } (name)}
					<li>
						<a
							href={resolve(path)}
							class="flex min-h-8 items-start justify-center gap-1.5 text-xs hover:underline sm:text-sm"
						>
							<Icon height="1.25em" class="shrink-0" />
							<span class="truncate">{name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>
