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
		let available = summary.clientHeight - pixels(style.paddingTop) - pixels(style.paddingBottom);
		for (const child of content.children) {
			if (
				child instanceof HTMLElement &&
				child !== title &&
				child !== excerpt &&
				child.offsetHeight
			) {
				available -= child.offsetHeight + margins(child);
			}
		}
		available -= margins(title);
		const titleLine = pixels(getComputedStyle(title).lineHeight);
		if (!titleLine) return;

		clamp(title, 100);
		const naturalLines = Math.ceil((title.scrollHeight - 1) / titleLine);
		const excerptLine = excerpt ? pixels(getComputedStyle(excerpt).lineHeight) : 0;
		const excerptMargin = excerpt ? margins(excerpt) : 0;
		const reserveExcerpt =
			excerptLine > 0 && available >= 2 * titleLine + excerptMargin + excerptLine;
		const titleBudget = available - (reserveExcerpt ? excerptMargin + excerptLine : 0);
		const titleLines = Math.max(1, Math.min(naturalLines, 6, Math.floor(titleBudget / titleLine)));
		clamp(title, titleLines);

		if (excerpt) {
			const remaining = available - titleLines * titleLine - excerptMargin;
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
