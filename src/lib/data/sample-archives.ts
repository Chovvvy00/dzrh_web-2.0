import type { Article } from '#lib/types/article.ts';
import {
	nationArticles,
	entertainmentArticles,
	worldArticles,
	metroManilaArticles,
	provinceArticles,
	asiaArticles,
	businessArticles,
	lifestyleArticles,
	headlines
} from './sample-articles.ts';

// Demo-only records let every archive preview the lead, grid, and older-article states.
// Replace these arrays with category articles from the CMS, newest first.
function sampleArchive(slug: string, title: string, seed: Article[]): Article[] {
	const olderStories = [
		'The stories behind the headlines',
		'A closer look at the latest developments',
		'Key updates from across the community',
		'What you need to know this week',
		'People and perspectives in focus',
		'The week in review',
		'Conversations that matter',
		'In the spotlight: stories worth following',
		'Looking ahead to the coming week',
		'From the archives: a look back',
		'Exploring the bigger picture',
		'Voices from the community',
		'The latest news, explained'
	];

	return [
		...seed,
		...olderStories.map((headline, index) => ({
			id: `${slug}-archive-${index + 1}`,
			title: `${title}: ${headline}`,
			slug: `sample-${slug}-archive-${index + 1}`,
			image: seed[index % seed.length].image,
			excerpt: `Sample ${title.toLowerCase()} coverage from the DZRH archive. A closer look at the people, events, and stories behind the headlines.`,
			datePosted: `${index + 8} days ago`
		}))
	];
}

export const categoryArchives = {
	nation: {
		title: 'Nation',
		description:
			'The latest national headlines, public affairs, and stories from across the Philippines.',
		articles: sampleArchive('nation', 'Nation', nationArticles)
	},
	entertainment: {
		title: 'Entertainment',
		description: 'Your daily dose of entertainment, culture, and the people making headlines.',
		articles: sampleArchive('entertainment', 'Entertainment', entertainmentArticles)
	},
	world: {
		title: 'World',
		description: 'Global headlines and perspectives on the stories shaping our world.',
		articles: sampleArchive('world', 'World', worldArticles)
	},
	'metro-manila': {
		title: 'Metro Manila',
		description: 'News, community updates, and everyday stories from around the metro.',
		articles: sampleArchive('metro-manila', 'Metro Manila', metroManilaArticles)
	},
	province: {
		title: 'Province',
		description: 'Local voices and regional headlines from communities across the country.',
		articles: sampleArchive('province', 'Province', provinceArticles)
	},
	asia: {
		title: 'Asia',
		description: 'Regional developments and the stories connecting our Asian neighbors.',
		articles: sampleArchive('asia', 'Asia', asiaArticles)
	},
	business: {
		title: 'Business',
		description: 'Business, markets, and the economy. Follow the stories behind the numbers.',
		articles: sampleArchive('business', 'Business', businessArticles)
	},
	lifestyle: {
		title: 'Lifestyle',
		description: 'Fresh perspectives on everyday living, travel, food, and well-being.',
		articles: sampleArchive('lifestyle', 'Lifestyle', lifestyleArticles)
	},
	sports: {
		title: 'Sports',
		description:
			'The latest sporting headlines, competition highlights, and stories beyond the game.',
		articles: sampleArchive(
			'sports',
			'Sports',
			headlines.slice(0, 3).map((article, index) => ({
				...article,
				id: `sports-${index + 1}`,
				title: `Sample sports headline ${index + 1}`,
				slug: `sample-sports-${index + 1}`,
				excerpt: 'Sample sports coverage from the DZRH newsroom.'
			}))
		)
	}
};
