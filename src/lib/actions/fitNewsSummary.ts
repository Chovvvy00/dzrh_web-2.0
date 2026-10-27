/** Fit a title and excerpt into a desktop summary whose height is set by its card. */
export function fitNewsSummary(summary: HTMLElement) {
	const content = summary.querySelector<HTMLElement>('.summary-content');
	const title = summary.querySelector<HTMLElement>('.summary-title');
	const excerpt = summary.querySelector<HTMLElement>('.summary-excerpt');
	if (!content || !title) return;

	const pixels = (value: string) => Number.parseFloat(value) || 0;
	const margins = (element: HTMLElement) => {
		const style = getComputedStyle(element);
		return pixels(style.marginTop) + pixels(style.marginBottom);
	};
	const clear = () => {
		title.style.removeProperty('-webkit-line-clamp');
		title.style.removeProperty('line-clamp');
		excerpt?.style.removeProperty('display');
		excerpt?.style.removeProperty('-webkit-line-clamp');
		excerpt?.style.removeProperty('line-clamp');
	};
	const clamp = (element: HTMLElement, lines: number) => {
		element.style.setProperty('-webkit-line-clamp', String(lines));
		element.style.setProperty('line-clamp', String(lines));
	};
	const fit = () => {
		// Mobile cards keep their natural height and existing typography.
		if (getComputedStyle(summary).containerType !== 'size') {
			clear();
			return;
		}

		const style = getComputedStyle(content);
		let available =
			summary.getBoundingClientRect().height -
			pixels(style.paddingTop) -
			pixels(style.paddingBottom);
		for (const child of content.children) {
			if (
				child instanceof HTMLElement &&
				child !== title &&
				child !== excerpt &&
				child.offsetHeight
			) {
				available -= child.getBoundingClientRect().height + margins(child);
			}
		}
		available -= margins(title);
		const titleLine = pixels(getComputedStyle(title).lineHeight);
		if (!titleLine) return;

		// Give the title all available lines before using leftover space for the excerpt.
		title.style.setProperty('-webkit-line-clamp', 'unset');
		title.style.setProperty('line-clamp', 'unset');
		const naturalLines = Math.round(title.getBoundingClientRect().height / titleLine);
		const titleLines = Math.max(1, Math.min(naturalLines, Math.floor(available / titleLine)));
		clamp(title, titleLines);

		const excerptLine = excerpt ? pixels(getComputedStyle(excerpt).lineHeight) : 0;
		const excerptMargin = excerpt ? margins(excerpt) : 0;

		if (excerpt) {
			const remaining = available - title.getBoundingClientRect().height - excerptMargin;
			const excerptLines = excerptLine ? Math.max(0, Math.floor(remaining / excerptLine)) : 0;
			excerpt.style.display = excerptLines > 0 ? '-webkit-box' : 'none';
			clamp(excerpt, Math.max(1, excerptLines));
		}
	};

	const observer = new ResizeObserver(fit);
	observer.observe(summary);
	let active = true;
	void document.fonts.ready.then(() => {
		if (active) fit();
	});
	fit();
	return {
		destroy() {
			active = false;
			observer.disconnect();
			clear();
		}
	};
}
