import { DOMElems } from './base';

export const getInput = () => DOMElems.searchInput.value;

export const renderResults = (recipes, page = 1, perPage = 10) => {
	const start = (page - 1) * perPage; // number of results on prev pages
	const end = start + perPage;
	recipes.slice(start, end).forEach(renderRecipe);

	renderButtons(page, Math.ceil(recipes.length / perPage));
};

export const blurForm = () => {
	DOMElems.searchInput.blur();
	DOMElems.searchBtn.blur();
};

export const clearResults = () => {
	DOMElems.resultsList.innerHTML = '';
	DOMElems.resultsPages.innerHTML = '';
};

export const highlightSelected = id => {
	// remove highlighting from another result
	const prev = DOMElems.resultsList.querySelector('.results__link--active');
	if (prev) {
		prev.classList.remove('results__link--active');
	}

	const selected = document.querySelector(`a[href="#${id}"]`);
	if (selected) {
		selected.classList.add('results__link--active');
	}
};


function renderRecipe(recipe) {
	const markup = `
	<li>
		<a class="results__link" href="#${recipe.recipe_id}">
			<figure class="results__fig">
				<img src="${recipe.image_url}" alt="${recipe.title}">
			</figure>
			<div class="results__data">
			<h4 class="results__name" title="${recipe.title}">${truncateRecipeTitle(recipe.title)}</h4>
				<p class="results__author">${recipe.publisher}</p>
			</div>
		</a>
	</li>
	`;
	DOMElems.resultsList.insertAdjacentHTML('beforeend', markup);
}


export function truncateRecipeTitle(title, limit = 18) {
	// if title's length is less than limit
	if (title.length <= limit) return title;

	const result = [];
	
	title.split(' ').reduce((acc, word) => {
		if (acc + word.length <= limit) {
			result.push(word);
		}
		
		return acc + word.length + 1; // plus space
	}, 0);

	return result.join(' ') + ' &hellip;';
}


function renderButtons(curPage, numOfPages) {
	const prevBtnHtml = (curPage > 1) ? 
	`<button class="btn-inline results__btn--prev" data-goto="${curPage - 1}">
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-left"></use>
		</svg>
		<span>Page ${curPage - 1}</span>
	</button>` : '';

	const nextBtnHtml = (curPage < numOfPages) ? 
	`<button class="btn-inline results__btn--next" data-goto="${curPage + 1}">
		<span>Page ${curPage + 1}</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-right"></use>
		</svg>
	</button>` : '';

	DOMElems.resultsPages.insertAdjacentHTML('afterbegin', prevBtnHtml + nextBtnHtml);
}



