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
			id: '1',
			title: 'First headline article',
			slug: 'headline-1',
			image: headlineImage,
			excerpt: 'Short description for the first headline.',
			datePosted: '2 seconds ago'
		},
		{
			id: '2',
			title: 'Second headline article',
			slug: 'headline-2',
			image: headlineImage,
			excerpt: 'Short description for the second headline.',
			datePosted: '2 seconds ago'
		},
		{
			id: '3',
			title: 'Third headline article',
			slug: 'headline-3',
			image: headlineImage,
			excerpt: 'Short description for the third headline.',
			datePosted: '15 seconds ago'
		},
		{
			id: '4',
			title: 'Fourth headline article',
			slug: 'headline-1',
			image: headlineImage,
			excerpt: 'Short description for the first headline.',
			datePosted: '4 minutes ago'
		},
		{
			id: '5',
			title: 'Fifth headline article',
			slug: 'headline-2',
			image: headlineImage,
			excerpt: 'Short description for the second headline.',
			datePosted: '1 hour ago'
		},
		{
			id: '6',
			title: 'Sixth headline article',
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
			image: nationImage,
			datePosted: '50 seconds ago'
		},
		{
			id: '2',
			title: 'Vestibulum urna pellentesque lorem dolor',
			slug: 'sample-article-2',
			image: nationImage,
			datePosted: '5 hours ago'
		},
		{
			id: '3',
			title: 'Pellentesque facilisis arcu vestibulum urna',
			slug: 'sample-article-3',
			image: nationImage,
			datePosted: '2 days ago'
		}
	];

	import entertainmentImage from '#lib/assets/test-images/Entertainment.jpeg';
	const entertainmentArticles = [
		{
			id: '4',
			title: 'Entertainment article number one',
			slug: 'entertainment-article-1',
			image: entertainmentImage,
			datePosted: '16 seconds ago'
		},
		{
			id: '5',
			title: 'Entertainment article number two',
			slug: 'entertainment-article-2',
			image: entertainmentImage,
			datePosted: '18 hours ago'
		},
		{
			id: '6',
			title: 'Entertainment article number three',
			slug: 'entertainment-article-3',
			image: entertainmentImage,
			datePosted: '2 days ago'
		}
	];

	import worldImage from '#lib/assets/test-images/World.jpeg';
	const worldArticles = [
		{
			id: '4',
			title: 'World Article number one',
			slug: 'world-article-1',
			image: worldImage,
			datePosted: 'yesterday'
		},
		{
			id: '5',
			title: 'World Article number two',
			slug: 'world-article-2',
			image: worldImage,
			datePosted: '2 days ago'
		},
		{
			id: '6',
			title: 'World Article number three',
			slug: 'world-article-3',
			image: worldImage,
			datePosted: '4 days ago'
		}
	];

	import metroManilaImage from '#lib/assets/test-images/Metro-Manila.jpeg';
	const metroManilaArticles = [
		{
			id: '4',
			title: 'Metro Manila Article number one',
			slug: 'metro-manila-article-1',
			image: metroManilaImage,
			datePosted: '24 seconds ago'
		},
		{
			id: '5',
			title: 'Metro Manila Article number two',
			slug: 'metro-manila-article-2',
			image: metroManilaImage,
			datePosted: '56 seconds ago'
		},
		{
			id: '6',
			title: 'Metro Manila Article number three',
			slug: 'metro-manila-article-3',
			image: metroManilaImage,
			datePosted: '23 hours ago'
		}
	];

	import provinceImage from '#lib/assets/test-images/Province.jpg';
	const provinceArticles = [
		{
			id: '4',
			title: 'Province Article number one',
			slug: 'Province article-1',
			image: provinceImage,
			datePosted: '13 seconds ago'
		},
		{
			id: '5',
			title: 'Province Article number two',
			slug: 'Province article-2',
			image: provinceImage,
			datePosted: '16 seconds ago'
		},
		{
			id: '6',
			title: 'Province Article number three',
			slug: 'Province article-3',
			image: provinceImage,
			datePosted: '2 days ago'
		}
	];

	import AsiaImage from '#lib/assets/test-images/Asia.webp';
	const asiaArticles = [
		{
			id: '4',
			title: 'Province Article number one',
			slug: 'Province article-1',
			image: AsiaImage,
			datePosted: '1 hour ago'
		},
		{
			id: '5',
			title: 'Province Article number two',
			slug: 'Province article-2',
			image: AsiaImage,
			datePosted: '5 hours ago'
		},
		{
			id: '6',
			title: 'Province Article number three',
			slug: 'Province article-3',
			image: AsiaImage,
			datePosted: '13 hours ago'
		}
	];

	import businessImage from '#lib/assets/test-images/Business.jpg';
	const businessArticles = [
		{
			id: '4',
			title: 'Province Article number one',
			slug: 'Province article-1',
			image: businessImage,
			datePosted: '14 seconds ago'
		},
		{
			id: '5',
			title: 'Province Article number two',
			slug: 'Province article-2',
			image: businessImage,
			datePosted: '55 seconds ago'
		},
		{
			id: '6',
			title: 'Province Article number three',
			slug: 'Province article-3',
			image: businessImage,
			datePosted: '7 hours ago'
		}
	];

	import lifestyleImage from '#lib/assets/test-images/Lifestyle.jpg';
	const lifestyleArticles = [
		{
			id: '4',
			title: 'Province Article number one',
			slug: 'Province article-1',
			image: lifestyleImage,
			datePosted: '16 hours ago'
		},
		{
			id: '5',
			title: 'Province Article number two',
			slug: 'Province article-2',
			image: lifestyleImage,
			datePosted: '3 days ago'
		},
		{
			id: '6',
			title: 'Province Article number three',
			slug: 'Province article-3',
			image: lifestyleImage,
			datePosted: '1 week ago'
		}
	];
</script>

<main class="w-full">
	<div class="w-full">
		<section class="relative mx-auto my-4 h-12.5 w-[320px] overflow-hidden sm:h-22.5 sm:w-182">
			<AdComponent isTestMode={true} showPlaceholder={true} />
		</section>

		<!-- Desktop Mode -->
		<div class="mt-8 hidden grid-cols-1 gap-x-6 gap-y-8 lg:grid lg:grid-cols-[minmax(0,1fr)_280px]">
			<div class="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
				<BreakingNews article={breakingNews} />
				<Headlines articles={headlines} />
			</div>

			<Featured />

			<section class="min-w-0">
				<div class="grid gap-x-4 gap-y-10 md:grid-cols-2">
					<NewsCategory title="Nation" articles={nationArticles} href="/nation" />
					<NewsCategory
						title="Entertainment"
						articles={entertainmentArticles}
						href="/entertainment"
					/>

					<NewsCategory title="World" articles={worldArticles} href="/world" />
					<NewsCategory title="Metro Manila" articles={metroManilaArticles} href="/metro-manila" />
				</div>

				<section
					class="relative mx-auto my-4 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
				>
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>

				<div class="mt-8 grid gap-x-4 gap-y-8 md:grid-cols-2">
					<NewsCategory title="Province" articles={provinceArticles} href="/province" />
					<NewsCategory title="Asia" articles={asiaArticles} href="/asia" />

					<NewsCategory title="Business" articles={businessArticles} href="/business" />
					<NewsCategory title="Lifestyle" articles={lifestyleArticles} href="/lifestyle" />
				</div>

				<section
					class="relative mx-auto my-4 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
				>
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>
			</section>

			<aside class="min-w-0 space-y-4">
				<Trending />
				<MostRead />

				<section class="relative mx-auto mb-4 h-62.5 w-75 max-w-full overflow-hidden">
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>
			</aside>
		</div>

		<!-- Mobile Mode -->
		<div class="mt-8 flex flex-col gap-6 lg:hidden">
			<!-- Breaking News -->
			<BreakingNews article={breakingNews} />

			<!-- Headlines -->
			<Headlines articles={headlines} />

			<!-- Featured -->
			<Featured />

			<!-- Trending -->
			<Trending />

			<!-- Most Read -->
			<MostRead />

			<!-- News Categories -->
			<section class="min-w-0">
				<div class="grid grid-cols-1 gap-8">
					<NewsCategory title="Nation" articles={nationArticles} href="/nation" />

					<NewsCategory
						title="Entertainment"
						articles={entertainmentArticles}
						href="/entertainment"
					/>

					<NewsCategory title="World" articles={worldArticles} href="/world" />

					<NewsCategory
						title="Metro Manila"
						articles={metroManilaArticles}
						href="/metro-manila"
					/>
				</div>

				<!-- Advertisement -->
				<section class="relative mx-auto my-6 h-12.5 w-[320px] max-w-full overflow-hidden">
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>

				<div class="grid grid-cols-1 gap-8">
					<NewsCategory title="Province" articles={provinceArticles} href="/province" />

					<NewsCategory title="Asia" articles={asiaArticles} href="/asia" />

					<NewsCategory title="Business" articles={businessArticles} href="/business" />

					<NewsCategory title="Lifestyle" articles={lifestyleArticles} href="/lifestyle" />
				</div>

				<!-- Advertisement -->
				<section class="relative mx-auto my-6 h-12.5 w-[320px] max-w-full overflow-hidden">
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>
			</section>
		</div>
	</div>
</main>
