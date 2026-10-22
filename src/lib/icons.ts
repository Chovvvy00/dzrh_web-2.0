// Keep collection-specific names here so UI components use application aliases.
export const icons = {
	play: 'mdi:play',
	pause: 'mdi:pause',
	'play-circle-outline': 'mdi:play-circle-outline',
	'pause-circle-outline': 'mdi:pause-circle-outline',
	'volume-high': 'mdi:volume-high',
	'volume-mute': 'mdi:volume-mute',
	close: 'mdi:close',
	'alert-circle': 'mdi:alert-circle',
	loading: 'mdi:loading',
	lottery: 'fluent:lottery-24-filled',
	facebook: 'simple-icons:facebook',
	threads: 'simple-icons:threads',
	tiktok: 'simple-icons:tiktok',
	x: 'simple-icons:x',
	youtube: 'simple-icons:youtube',
	'crystal-ball': 'twemoji:crystal-ball',
	'open-book': 'twemoji:open-book',
	messenger: 'simple-icons:messenger',
	cloud: 'emojione:sun-behind-cloud',
	search: 'akar-icons:search',
	instagram: 'bi:instagram',
	link: 'mdi:link-variant',
	check: 'mdi:check',
	email: 'mdi:email-outline',
	whatsapp: 'simple-icons:whatsapp',
	telegram: 'simple-icons:telegram',
	share: 'mdi:share-variant-outline',
	'chevron-down': 'mdi:chevron-down'
} as const;

export type IconName = keyof typeof icons;
