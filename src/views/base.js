const elemsStrings = {
	loader: 'loader'
};

export const DOMElems = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	searchBtn: document.querySelector('.search__btn'),
	likesMenu: document.querySelector('.likes__field'),
	likesList: document.querySelector('.likes__list'),
	resultsContainer: document.querySelector('.results'),
	resultsList: document.querySelector('.results__list'),
	resultsPages: document.querySelector('.results__pages'),
	recipeContainer: document.querySelector('.recipe'),
	listList: document.querySelector('.shopping__list')
}

export const loader = {
	render(parent) {
		const loader = `
		<div class="${elemsStrings.loader}">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
		`;
		parent.insertAdjacentHTML('afterbegin', loader);
	},
	clear() {
		const loader = document.querySelector(`.${elemsStrings.loader}`);
		if (loader) {
			loader.remove();
		}
	}
};