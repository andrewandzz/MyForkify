import { DOMElems } from './base';

export const renderItem = item => {
	const markup = `
		<li class="shopping__item" data-itemid="${item.id}">
			<div class="shopping__count">
				<input type="number" value="${item.quantity}" step="${item.quantity}" class="shopping__count--value" min="0">
				<p>${item.unit}</p>
			</div>
			<p class="shopping__description">${item.ingredient}</p>
			<button class="shopping__delete btn-tiny">
				<svg>
					<use href="img/icons.svg#icon-circle-with-cross"></use>
				</svg>
			</button>
		</li>
	`;
	DOMElems.listList.insertAdjacentHTML('beforeend', markup);
}

export const deleteItem = id => {
	const item = DOMElems.listList.querySelector(`li[data-itemid="${id}"]`);
	if (item) item.parentElement.removeChild(item);
}