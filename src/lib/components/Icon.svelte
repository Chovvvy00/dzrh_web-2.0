<script lang="ts">
	import Iconify from '@iconify/svelte';
	import type { IconProps } from '@iconify/svelte';
	import type { SVGAttributes } from 'svelte/elements';
	import { icons, type IconName } from '#lib/icons.ts';

	type Props = Omit<SVGAttributes<SVGSVGElement> & IconProps, 'icon' | 'name'> & {
		name: IconName;
	};

	let { name, ...props }: Props = $props();
</script>

<Iconify icon={icons[name]} {...props} />
