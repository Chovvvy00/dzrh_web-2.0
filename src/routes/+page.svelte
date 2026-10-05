<script lang="ts">
	import AdComponent from '#lib/components/AdComponent.svelte';
	import BreakingNews from '#lib/components/sections/BreakingNews.svelte';
	import Featured from '#lib/components/sections/Featured.svelte';
	import Headlines from '#lib/components/sections/Headlines.svelte';
	import MostRead from '#lib/components/sections/MostRead.svelte';
	import NewsCategory from '#lib/components/sections/NewsCategory.svelte';
	import Trending from '#lib/components/sections/Trending.svelte';

	import breakingImage from '#lib/assets/test-images/BreakingNews.jpeg';
	const breakingNews = {
		id: '1',
		title: 'Sample breaking news headline',
		slug: 'sample-breaking-news',
		image: breakingImage,
		excerpt: 'Short description of the breaking news article.'
	};

	import headlineImage from '#lib/assets/test-images/Headlines.jpeg';
	const headlines = [
		{
			id: '2',
			title: 'First headline article',
			slug: 'headline-1',
			image: headlineImage,
			excerpt: 'Short description for the first headline.'
		},
		{
			id: '3',
			title: 'Second headline article',
			slug: 'headline-2',
			image: headlineImage,
			excerpt: 'Short description for the second headline.'
		},
		{
			id: '4',
			title: 'Third headline article',
			slug: 'headline-3',
			image: headlineImage,
			excerpt: 'Short description for the third headline.'
		}
	];

	import nationImage from '#lib/assets/test-images/Nation.jpeg';
	const nationArticles = [
		{
			id: '1',
			title: 'Maecenas ut dolor pellentesque facilisis arcu eu',
			slug: 'sample-article-1',
			image: nationImage
		},
		{
			id: '2',
			title: 'Vestibulum urna pellentesque lorem dolor',
			slug: 'sample-article-2',
			image: nationImage
		},
		{
			id: '3',
			title: 'Pellentesque facilisis arcu vestibulum urna',
			slug: 'sample-article-3',
			image: nationImage
		}
	];

	import entertainmentImage from '#lib/assets/test-images/Entertainment.jpeg';
	const entertainmentArticles = [
		{
			id: '4',
			title: 'Entertainment article number one',
			slug: 'entertainment-article-1',
			image: entertainmentImage
		},
		{
			id: '5',
			title: 'Entertainment article number two',
			slug: 'entertainment-article-2',
			image: entertainmentImage
		},
		{
			id: '6',
			title: 'Entertainment article number three',
			slug: 'entertainment-article-3',
			image: entertainmentImage
		}
	];
</script>

<main class="w-full">
	<div class="w-full">
		<section class="relative mx-auto my-4 h-62.5 w-62.5 overflow-hidden sm:h-22.5 sm:w-182">
			<AdComponent isTestMode={true} showPlaceholder={true} />
		</section>

		<div class="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-[minmax(0,1fr)_280px]">
			<div class="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
				<BreakingNews article={breakingNews} />
				<Headlines articles={headlines} />
			</div>

			<Featured />

			<section class="min-w-0">
				<div class="grid gap-x-4 gap-y-8 md:grid-cols-2">
					<NewsCategory title="Nation" articles={nationArticles} href="/nation" />
					<NewsCategory
						title="Entertainment"
						articles={entertainmentArticles}
						href="/entertainment"
					/>

					<!-- <NewsCategory title="World" />
					<NewsCategory title="Metro Manila" /> -->
				</div>

				<section
					class="relative mx-auto my-4 h-62.5 w-62.5 max-w-full overflow-hidden sm:h-22.5 sm:w-182"
				>
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>

				<!-- <div class="mt-8 grid gap-x-4 gap-y-8 md:grid-cols-2">
					<NewsCategory title="Province" />
					<NewsCategory title="Asia" />

					<NewsCategory title="Business" />
					<NewsCategory title="Lifestyle" />
				</div>

				<AdComponent isTestMode={true} showPlaceholder={true} /> -->
			</section>

			<aside class="min-w-0 space-y-4">
				<Trending />
				<MostRead />
			</aside>
		</div>
	</div>
</main>
