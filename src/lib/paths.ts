import { resolve } from '$app/paths';

// Include the deployment base even for placeholder paths without a route yet.
export function sitePath(path: string): string {
	return `${resolve('/')}${path.replace(/^\/+/, '')}`;
}
