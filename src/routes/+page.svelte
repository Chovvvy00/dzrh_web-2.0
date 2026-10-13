<script lang="ts">
	import AdComponent from '#lib/components/AdComponent.svelte';
	import BreakingNews from '#lib/components/sections/BreakingNews.svelte';
	import Featured from '#lib/components/sections/Featured.svelte';
	import Headlines from '#lib/components/sections/Headlines.svelte';
	import MostRead from '#lib/components/sections/MostRead.svelte';
	import NewsCategory from '#lib/components/sections/NewsCategory.svelte';
	import Trending from '#lib/components/sections/Trending.svelte';

	import {
		breakingNews,
		headlines,
		nationArticles,
		entertainmentArticles,
		worldArticles,
		metroManilaArticles,
		provinceArticles,
		asiaArticles,
		businessArticles,
		lifestyleArticles
	} from '#lib/data/sample-articles.ts';
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

			<section class="relative mx-auto mb-4 h-12.5 w-[320px] sm:h-22.5 sm:w-182 max-w-full overflow-hidden">
				<AdComponent isTestMode={true} showPlaceholder={true} />
			</section>

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

					<NewsCategory title="Metro Manila" articles={metroManilaArticles} href="/metro-manila" />
				</div>

				<!-- Advertisement -->
				<section class="relative mx-auto my-6 h-12.5 w-[320px] sm:h-22.5 sm:w-182 max-w-full overflow-hidden">
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>

				<div class="grid grid-cols-1 gap-8">
					<NewsCategory title="Province" articles={provinceArticles} href="/province" />

					<NewsCategory title="Asia" articles={asiaArticles} href="/asia" />

					<NewsCategory title="Business" articles={businessArticles} href="/business" />

					<NewsCategory title="Lifestyle" articles={lifestyleArticles} href="/lifestyle" />
				</div>

				<!-- Advertisement -->
				<section class="relative mx-auto my-6 h-12.5 w-[320px] sm:h-22.5 sm:w-182 max-w-full overflow-hidden">
					<AdComponent isTestMode={true} showPlaceholder={true} />
				</section>
			</section>
		</div>
	</div>
</main>
