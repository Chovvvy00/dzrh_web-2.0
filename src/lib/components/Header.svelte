<script lang="ts">
	// import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import Icon from '#lib/components/Icon.svelte';
	import type { IconName } from '#lib/icons.ts';
	import { sitePath } from '#lib/paths.ts';
	import logo from '#lib/assets/logo/dzrh-logo.svg';

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
		icon: IconName;
	};

	const socialLinks: SocialLink[] = [
		{ name: 'YouTube', href: 'https://youtube.com/@dzrhdigital', icon: 'youtube' },
		{ name: 'Facebook', href: 'https://facebook.com/dzrhnews', icon: 'facebook' },
		{ name: 'Instagram', href: 'https://instagram.com/dzrhdigital', icon: 'instagram' },
		{ name: 'X', href: 'https://x.com/dzrhnews', icon: 'x' },
		{ name: 'TikTok', href: 'https://tiktok.com/@dzrhnews', icon: 'tiktok' }
	];

	type UtilityLink = {
		name: string;
		href: string;
		icon: IconName;
		mobileName?: string;
	};

	const utilityLinks: UtilityLink[] = [
		{ name: 'Weather', href: '/weather', icon: 'cloud' },
		{
			name: 'Word of the Day',
			href: '/word-of-the-day',
			icon: 'open-book'
		},
		{
			name: 'Lottery',
			href: '/lottery',
			icon: 'lottery',
			mobileName: 'Lotto'
		},
		{
			name: 'Horoscope',
			href: '/horoscope',
			icon: 'crystal-ball'
		}
	];

	let mobileMenuOpen = $state(false);
	let mobileMenuButton: HTMLButtonElement;
	let mobileNav = $state<HTMLDivElement | null>(null);
	let searchPill = $state<HTMLDivElement | null>(null);
	let scrollY = $state(0);
	let mobileUtilityHidden = $state(false);
	let isOpen = $state(false);
	let inputRef = $state<HTMLInputElement | null>(null);

	$effect(() => {
		// Separate thresholds prevent flicker as collapsing the bar changes the scroll position.
		if (scrollY > 96) mobileUtilityHidden = true;
		else if (scrollY <= 120) mobileUtilityHidden = false;
	});

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function closeSearch() {
		isOpen = false;
		inputRef?.blur();
	}

	async function toggleSearch() {
		if (isOpen) {
			closeSearch();
			return;
		}

		isOpen = true;
		// Only one panel open at a time keeps the header stable.
		mobileMenuOpen = false;

		// If opening, wait for the DOM to update, then focus the input.
		await tick();
		// preventScroll stops focusing the field from moving the page.
		inputRef?.focus({ preventScroll: true });
	}

	function toggleMobileMenu() {
		if (mobileMenuOpen) {
			closeMobileMenu();
			return;
		}

		mobileMenuOpen = true;
		// Close the search so its pill cannot resize underneath the open menu.
		closeSearch();
	}

	// Clicking away closes the panels. The listener replaces the old input blur handler and
	// only exists while something is open. It never fires inside the toggles, otherwise the
	// hamburger would close the menu on pointerdown and reopen it again on click.
	$effect(() => {
		if (!mobileMenuOpen && !isOpen) return;

		function handleOutsidePointerDown(event: PointerEvent) {
			if (!(event.target instanceof Node)) return;
			if (searchPill?.contains(event.target)) return;
			if (mobileMenuButton?.contains(event.target)) return;
			if (mobileNav?.contains(event.target)) return;

			mobileMenuOpen = false;
			// Same rule as before: an empty search field collapses when you click away.
			if (inputRef && inputRef.value === '') closeSearch();
		}

		document.addEventListener('pointerdown', handleOutsidePointerDown);
		return () => document.removeEventListener('pointerdown', handleOutsidePointerDown);
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
			if (mobileMenuButton?.getClientRects().length) mobileMenuButton.focus();
		}
	}
</script>

<svelte:window bind:scrollY onkeydown={handleKeydown} />

<header>

	<!-- Mobile view -->
	<div class="relative lg:hidden">
		<div class="flex h-17.5 items-center justify-between gap-4">
			<div>
				<a href={sitePath('/')} aria-label="DZRH home" onclick={closeMobileMenu}>
					<img src={logo} alt="DZRH Logo" class="h-10 w-auto -ml-1" />
				</a>
			</div>

			<div class="flex items-center justify-center">
				<div class="flex items-center">
					<div
						class="flex h-10 items-center overflow-hidden rounded-full border
						bg-white transition-all duration-300 ease-in-out
						{isOpen
							? 'w-56 gap-1 border-gray-300 px-2 shadow-sm'
							: 'w-10 border-transparent hover:bg-gray-100'}"
						bind:this={searchPill}
					>
						<!-- Search Button -->
						<button
							onclick={toggleSearch}
							type="button"
							aria-label={isOpen ? 'Close search' : 'Open search'}
							aria-expanded={isOpen}
							class="flex size-8 shrink-0 items-center justify-center rounded-full
							text-gray-500 transition-colors
							hover:text-gray-900"
						>
							<Icon name="search" height="1.2em" />
						</button>

						<!-- Search Input -->
						<input
							bind:this={inputRef}
							type="search"
							placeholder="Search..."
							aria-label="Search"
							tabindex={isOpen ? 0 : -1}
							class="min-w-0 flex-1 rounded-2xl bg-transparent
							text-sm text-gray-900 placeholder-gray-400 transition-opacity
							duration-200 outline-none focus:ring-0 focus:outline-none
							{isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}"
						/>
					</div>
				</div>

				<button
					bind:this={mobileMenuButton}
					type="button"
					aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-navigation"
					onclick={toggleMobileMenu}
					data-open={mobileMenuOpen}
					class="group flex size-11 items-center justify-center text-black transition-[background-color,transform] duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
				>
					<span class="relative block size-6" aria-hidden="true">
						<span
							class="absolute top-1 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-600 ease-in-out group-data-[open=true]:translate-y-1.75 group-data-[open=true]:rotate-45 motion-reduce:transition-none"
						></span>
						<span
							class="absolute top-2.75 left-0 h-0.5 w-6 rounded-full bg-current transition-[opacity,transform] duration-600 ease-in-out group-data-[open=true]:scale-x-0 group-data-[open=true]:opacity-0 motion-reduce:transition-none"
						></span>
						<span
							class="absolute top-4.5 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-600 ease-in-out group-data-[open=true]:-translate-y-1.75 group-data-[open=true]:-rotate-45 motion-reduce:transition-none"
						></span>
					</span>
				</button>
			</div>
		</div>

		<!--
			Overlays the page instead of pushing it down: expanding this in-flow made the
			document taller and scroll anchoring scrolled the whole page downward.
		-->
		<div
			id="mobile-navigation"
			bind:this={mobileNav}
			data-open={mobileMenuOpen}
			inert={!mobileMenuOpen}
			aria-hidden={!mobileMenuOpen}
			class="absolute inset-x-0 top-17.5 z-10 grid max-h-[calc(100dvh-4.375rem)] grid-rows-[0fr] overflow-y-auto overscroll-contain bg-white opacity-0 shadow-sm transition-[grid-template-rows,opacity] duration-400 ease-in-out data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 motion-reduce:transition-none"
		>
			<div class="min-h-0 overflow-hidden">
				<div class="border-y border-gray-200 py-3">
					<nav aria-label="Mobile primary navigation">
						<ul class="grid gap-1 sm:grid-cols-2">
							{#each navLinks as link (link.href)}
								<li>
									<a
										href={sitePath(link.href)}
										onclick={closeMobileMenu}
										class="flex min-h-11 items-center px-3 text-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-black"
									>
										{link.name}
									</a>
								</li>
							{/each}
							<li>
								<a
									href={sitePath('/special-coverage')}
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
						{#each socialLinks as { name, href, icon } (name)}
							<a
								{href}
								aria-label={name}
								target="_blank"
								rel="noopener noreferrer"
								class="flex size-11 items-center justify-center rounded-full border border-black bg-transparent text-black transition-all duration-200 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								<Icon name={icon} class="h-5 w-5" />
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div
			data-hidden={mobileUtilityHidden}
			inert={mobileUtilityHidden}
			aria-hidden={mobileUtilityHidden}
			class="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-400 ease-in-out data-[hidden=true]:grid-rows-[0fr] data-[hidden=true]:opacity-0 motion-reduce:transition-none"
		>
			<div class="min-h-0 overflow-hidden">
				<nav aria-label="Mobile utility navigation" class="border-y border-gray-200 py-1">
					<ul class="grid grid-cols-4 gap-1">
						{#each utilityLinks as { name, href: path, icon, mobileName } (name)}
							<li class="min-w-0">
								<a
									href={sitePath(path)}
									class="flex h-full min-h-11 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1 text-center text-[11px] leading-tight text-neutral-700 hover:bg-neutral-100 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-black sm:text-xs"
								>
									<Icon name={icon} width="20" height="20" class="shrink-0" aria-hidden="true" />
									<span class="block w-full min-w-0 truncate text-center">{mobileName ?? name}</span
									>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</div>

	<!-- Desktop view -->
	<div class="hidden lg:block">
		<!-- Header content logo, main nav and social links -->
		<div class="grid h-10 grid-cols-[1fr_3fr_1fr] items-center justify-between pt-3.5">
			
			<!-- Logo -->
			<div class="-m-1.5">
				<a href={sitePath('/')}>
					<img src={logo} alt="DZRH Logo" class="h-10 w-auto" />
				</a>
			</div>
			
			<!-- Category Nav -->
			<nav aria-label="Primary navigation">
				<ul class="flex items-center justify-center gap-4">
					{#each navLinks as link (link.href)}
						<li>
							<a href={sitePath(link.href)}>
								{link.name}
							</a>
						</li>
					{/each}
					<li>
						<a
							href={sitePath('/special-coverage')}
							class="bg-red-600 px-3 py-1 text-white hover:bg-red-500"
						>
							SPECIAL COVERAGE
						</a>
					</li>
				</ul>
			</nav>

			<!-- Search -->
			<div class="relative">
				<Icon
					name="search"
					height="1.1em"
					class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
				/>
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Search news..."
					class="w-full rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pr-4 pl-10 text-sm text-neutral-800 placeholder-neutral-400 transition-all duration-200 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
				/>
			</div>
		</div>

		<!-- Utility Navigation -->
		<nav
			aria-label="Utility navigation"
			class="flex w-full justify-between border-b border-neutral-200 pt-4"
		>
			<ul class="-ml-3 flex flex-nowrap items-center justify-end">
				{#each utilityLinks as { name, href: path, icon } (name)}
					<li class="shrink-0">
						<a
							href={sitePath(path)}
							class="group flex min-h-11 items-center justify-center
								gap-1 rounded-lg px-3 py-2
								text-sm font-medium whitespace-nowrap
								text-neutral-600 transition-colors duration-200
								hover:bg-neutral-100 hover:text-blue-900"
						>
							<Icon
								name={icon}
								height="1.25em"
								class="shrink-0 transition-colors group-hover:text-blue-900"
							/>

							<span>{name}</span>
						</a>
					</li>
				{/each}
			</ul>

			<div class="flex items-center">
				<div class="flex items-center gap-1.5">
					{#each socialLinks as { name, href, icon } (name)}
						<a
							{href}
							aria-label={name}
							target="_blank"
							rel="noopener noreferrer"
							class="flex size-6 items-center justify-center rounded-full border border-black bg-transparent text-black transition-all duration-200 hover:bg-black hover:text-white"
						>
							<Icon name={icon} height="0.85em" />
						</a>
					{/each}
				</div>
			</div>
		</nav>
	</div>
</header>
