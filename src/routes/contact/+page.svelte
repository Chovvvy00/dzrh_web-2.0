<script lang="ts">
	const contacts = [
		{
			heading: 'Newsroom',
			lines: ['newsroom@dzrh.example', '(02) 1234-5678']
		},
		{
			heading: 'Advertising',
			lines: ['advertising@dzrh.example', '(02) 1234-5679']
		},
		{
			heading: 'Studio Address',
			lines: ['123 Example Street', 'Malate, Manila 1004', 'Philippines']
		}
	];
</script>

<svelte:head>
	<title>Contact Us | DZRH</title>
	<meta
		name="description"
		content="Get in touch with the DZRH newsroom, advertising team, and studio."
	/>
</svelte:head>

<article class="mx-auto w-full max-w-7xl min-w-0">
	<h1
		class="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-neutral-950 sm:text-4xl xl:text-5xl"
	>
		Contact Us
	</h1>

	<p class="text-lg leading-relaxed text-neutral-700">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
		laboris nisi ut aliquip ex ea commodo consequat.
	</p>

	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each contacts as contact (contact.heading)}
			<section
				class="border border-neutral-200 bg-neutral-50 p-5"
				aria-labelledby={`contact-${contact.heading.toLowerCase().replace(/\s+/g, '-')}`}
			>
				<h2
					id={`contact-${contact.heading.toLowerCase().replace(/\s+/g, '-')}`}
					class="text-sm font-bold tracking-wide text-neutral-900 uppercase"
				>
					{contact.heading}
				</h2>

				<address class="mt-3 space-y-1 text-sm leading-relaxed text-neutral-700 not-italic">
					{#each contact.lines as line (line)}
						<p>{line}</p>
					{/each}
				</address>
			</section>
		{/each}
	</div>

	<section class="mt-10 border-t border-neutral-200 pt-6">
		<h2 class="text-xl font-extrabold text-neutral-900 uppercase sm:text-2xl">Story Tips</h2>
		<p class="mt-4 leading-relaxed text-neutral-700">
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
			pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum. Reach the newsroom at the email or phone number above.
		</p>
	</section>
</article>
