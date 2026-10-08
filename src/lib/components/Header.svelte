<script lang="ts">
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
		{ name: 'YouTube', href: '#', icon: 'youtube' },
		{ name: 'TikTok', href: '#', icon: 'tiktok' },
		{ name: 'Messenger', href: '#', icon: 'messenger' },
		{ name: 'Threads', href: '#', icon: 'threads' },
		{ name: 'X', href: '#', icon: 'x' },
		{ name: 'Facebook', href: '#', icon: 'facebook' }
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
	let scrollY = $state(0);
	let mobileUtilityHidden = $state(false);

	$effect(() => {
		// Separate thresholds prevent flicker as collapsing the bar changes the scroll position.
		if (scrollY > 96) mobileUtilityHidden = true;
		else if (scrollY <= 16) mobileUtilityHidden = false;
	});

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

<svelte:window bind:scrollY onkeydown={handleKeydown} />

<header>
	<div class="lg:hidden">
		<div class="flex h-17.5 items-center justify-between gap-4">
			<a href={sitePath('/')} aria-label="DZRH home" onclick={closeMobileMenu}>
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
						class="absolute top-1 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-700 ease-in-out group-data-[open=true]:translate-y-1.75 group-data-[open=true]:rotate-45 motion-reduce:transition-none"
					></span>
					<span
						class="absolute top-2.75 left-0 h-0.5 w-6 rounded-full bg-current transition-[opacity,transform] duration-700 ease-in-out group-data-[open=true]:scale-x-0 group-data-[open=true]:opacity-0 motion-reduce:transition-none"
					></span>
					<span
						class="absolute top-4.5 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-700 ease-in-out group-data-[open=true]:-translate-y-1.75 group-data-[open=true]:-rotate-45 motion-reduce:transition-none"
					></span>
				</span>
			</button>
		</div>

		<div
			id="mobile-navigation"
			data-open={mobileMenuOpen}
			inert={!mobileMenuOpen}
			aria-hidden={!mobileMenuOpen}
			class="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-700 ease-in-out data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 motion-reduce:transition-none"
		>
			<div class="min-h-0 overflow-hidden">
				<div class="border-t border-gray-200 py-3">
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
								<Icon name={icon} class="h-3.5 w-3.5" />
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
			class="grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-200 ease-in-out data-[hidden=true]:grid-rows-[0fr] data-[hidden=true]:opacity-0 motion-reduce:transition-none"
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
									<span>{mobileName ?? name}</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</div>

	<div class="hidden lg:block">
		<!-- Header content logo, main nav and social links -->
		<div class="flex h-17.5 items-center justify-between px-4">
			<div>
				<a href={sitePath('/')}>
					<img src={logo} alt="DZRH Logo" class="h-10 w-auto" />
				</a>
			</div>

			<nav aria-label="Primary navigation">
				<ul class="flex items-center gap-4">
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

			<div class="flex items-center gap-2">
				<div class="flex items-center gap-1.5">
					{#each socialLinks as { name, href, icon } (name)}
						<a
							{href}
							aria-label={name}
							target="_blank"
							rel="noopener noreferrer"
							class="flex size-7 items-center justify-center rounded-full border border-black bg-transparent text-black transition-all duration-200 hover:bg-black hover:text-white xl:size-9"
						>
							<Icon name={icon} class="h-3.5 w-3.5" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Utility Navigation -->
		<nav aria-label="Utility navigation" class="w-full border-b border-neutral-200">
			<ul class="flex flex-nowrap items-center justify-end gap-2">
				{#each utilityLinks as { name, href: path, icon } (name)}
					<li class="shrink-0">
						<a
							href={sitePath(path)}
							class="group flex min-h-11 items-center justify-center
								gap-2 rounded-lg px-3 py-2
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
		</nav>
	</div>
</header>
