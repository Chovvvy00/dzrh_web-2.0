<script lang="ts">
	import AdBanner from '#lib/components/ads/AdBanner.svelte';
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
	} from '#lib/data/articles.ts';
</script>

<!-- Desktop Mode -->
<div class="hidden min-w-0 gap-8 lg:grid">
	<div class="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
		<BreakingNews article={breakingNews} />
		<Headlines articles={headlines} />
	</div>

	<section class="min-w-0">
		<div class="grid gap-x-4 gap-y-10 md:grid-cols-2">
			<NewsCategory title="Nation" articles={nationArticles} href="/nation" />
			<NewsCategory title="Entertainment" articles={entertainmentArticles} href="/entertainment" />

			<NewsCategory title="World" articles={worldArticles} href="/world" />
			<NewsCategory title="Metro Manila" articles={metroManilaArticles} href="/metro-manila" />
		</div>

		<section
			class="relative mx-auto my-4 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
		>
			<AdBanner isTestMode={true} showPlaceholder={true} />
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
			<AdBanner isTestMode={true} showPlaceholder={true} />
		</section>
	</section>
</div>

<!-- Mobile Mode -->
<div class="flex min-w-0 flex-col gap-6 pb-8 sm:pb-10 lg:hidden">
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

	<section class="relative mx-auto h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182">
		<AdBanner isTestMode={true} showPlaceholder={true} />
	</section>

	<!-- News Categories -->
	<section class="min-w-0">
		<div class="grid grid-cols-1 gap-6 sm:gap-8">
			<NewsCategory title="Nation" articles={nationArticles} href="/nation" />

			<NewsCategory title="Entertainment" articles={entertainmentArticles} href="/entertainment" />

			<NewsCategory title="World" articles={worldArticles} href="/world" />

			<NewsCategory title="Metro Manila" articles={metroManilaArticles} href="/metro-manila" />
		</div>

		<!-- Advertisement -->
		<section
			class="relative mx-auto my-6 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
		>
			<AdBanner isTestMode={true} showPlaceholder={true} />
		</section>

		<div class="grid grid-cols-1 gap-6 sm:gap-8">
			<NewsCategory title="Province" articles={provinceArticles} href="/province" />

			<NewsCategory title="Asia" articles={asiaArticles} href="/asia" />

			<NewsCategory title="Business" articles={businessArticles} href="/business" />

			<NewsCategory title="Lifestyle" articles={lifestyleArticles} href="/lifestyle" />
		</div>

		<!-- Advertisement -->
		<section
			class="relative mx-auto my-6 h-12.5 w-[320px] max-w-full overflow-hidden sm:h-22.5 sm:w-182"
		>
			<AdBanner isTestMode={true} showPlaceholder={true} />
		</section>
	</section>
</div>
