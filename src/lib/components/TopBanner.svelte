<script lang="ts">
	import mobileBanner from '#lib/assets/banner/mobile.jpg';
	import desktopBanner from '#lib/assets/banner/desktop.jpg';
</script>

<a
	href="https://www.dmap.com.ph/"
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Visit DMAP website"
	class="block w-full bg-white"
>
	<picture>
		<source media="(min-width: 768px)" srcset={desktopBanner} />

		<img src={mobileBanner} alt="DZRH banner" class="w-full object-contain" />
	</picture>
</a>
