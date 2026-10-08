<script lang="ts">
	import { sitePath } from '#lib/paths.ts';
	import logo from '#lib/assets/logo/dzrh-logo.svg';

	const year = new Date().getFullYear();

	const newsLinks = [
		{ label: 'Nation', href: '/nation' },
		{ label: 'Metro Manila', href: '/metro-manila' },
		{ label: 'World', href: '/world' },
		{ label: 'Entertainment', href: '/entertainment' }
	];

	const dzrhLinks = [
		{ label: 'About DZRH', href: '/about' },
		{ label: 'Contact Us', href: '/contact' },
		{ label: 'Privacy Policy', href: '/privacy-policy' },
		{ label: 'Terms of Use', href: '/terms' }
	];
</script>

<footer class="w-full">
	<!-- Main Footer -->
	<div class="bg-neutral-100">
		<div
			class="mx-auto grid w-full max-w-360 gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-12 lg:px-8 lg:py-12"
		>
			<!-- Brand -->
			<div>
				<a href={sitePath('/')} aria-label="DZRH Home" class="inline-block">
					<img src={logo} alt="DZRH" class="h-14 w-auto sm:h-16" />
				</a>

				<p class="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
					DZRH delivers the latest news, public affairs, entertainment, and information from the
					Philippines and around the world.
				</p>

				<!-- Socials -->
				<div class="mt-5 flex items-center gap-3">
					<a
						href="/"
						aria-label="DZRH on Facebook"
						class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-sm text-white transition-colors hover:bg-red-600"
					>
						FB
					</a>

					<a
						href="/"
						aria-label="DZRH on X"
						class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-sm text-white transition-colors hover:bg-red-600"
					>
						X
					</a>

					<a
						href="/"
						aria-label="DZRH on YouTube"
						class="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-sm text-white transition-colors hover:bg-red-600"
					>
						YT
					</a>
				</div>
			</div>

			<!-- News -->
			<div>
				<h2 class="mb-4 text-sm font-bold tracking-wide text-neutral-900 uppercase">News</h2>

				<ul class="space-y-2.5">
					{#each newsLinks as link (link.href)}
						<li>
							<a
								href={sitePath(link.href)}
								class="text-sm text-neutral-600 transition-colors hover:text-red-600"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- DZRH -->
			<div>
				<h2 class="mb-4 text-sm font-bold tracking-wide text-neutral-900 uppercase">DZRH</h2>

				<ul class="space-y-2.5">
					{#each dzrhLinks as link (link.href)}
						<li>
							<a
								href={sitePath(link.href)}
								class="text-sm text-neutral-600 transition-colors hover:text-red-600"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Bottom Footer -->
	<div class="bg-neutral-900">
		<div
			class="mx-auto flex w-full max-w-360 flex-col gap-2 px-4 py-5 text-sm text-neutral-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
		>
			<p>
				© {year} DZRH. All rights reserved.
			</p>

			<p>Manila Broadcasting Company</p>
		</div>
	</div>
</footer>
