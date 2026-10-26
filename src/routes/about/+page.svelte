<script lang="ts">
	import { sitePath } from '#lib/paths.ts';

	const sections = [
		{
			heading: 'Our Story',
			body: [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			]
		},
		{
			heading: 'What We Do',
			body: [
				'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
				'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut aliquam, nisl a aliquet gravida, tortor metus fringilla nulla, a lacinia diam eros ac quam.'
			]
		},
		{
			heading: 'Our People',
			body: [
				'Vestibulum risus metus, luctus sed, tristique ac, imperdiet quis, sem. Mauris dictum massa quis magna. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.',
				'Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.'
			]
		}
	];
</script>

<svelte:head>
	<title>About DZRH | DZRH</title>
	<meta
		name="description"
		content="Learn about DZRH — the station, what we do, and the people behind the news."
	/>
</svelte:head>

<article class="mx-auto w-full max-w-3xl min-w-0">
	<h1
		class="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl"
	>
		About DZRH
	</h1>

	<p class="text-lg leading-relaxed text-neutral-700">
		DZRH delivers the latest news, public affairs, entertainment, and information from the
		Philippines and around the world. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
		do eiusmod tempor incididunt ut labore et dolore magna aliqua.
	</p>

	{#each sections as section (section.heading)}
		<section
			class="mt-10"
			aria-labelledby={`about-${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
		>
			<h2
				id={`about-${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
				class="mb-3 text-xl font-extrabold text-neutral-900 uppercase sm:text-2xl"
			>
				{section.heading}
			</h2>

			{#each section.body as paragraph (paragraph)}
				<p class="mt-4 leading-relaxed text-neutral-700">{paragraph}</p>
			{/each}
		</section>
	{/each}

	<section class="mt-10 border-t border-neutral-200 pt-6">
		<h2 class="text-xl font-extrabold text-neutral-900 uppercase sm:text-2xl">Get in Touch</h2>
		<p class="mt-4 leading-relaxed text-neutral-700">
			Have a story tip or a question? Visit our <a
				href={sitePath('/contact')}
				class="font-medium text-red-700 hover:underline">contact page</a
			> to reach the DZRH team.
		</p>
	</section>
</article>
