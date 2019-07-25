import { DOMElems } from './base';
import { truncateRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
	document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}`);
};

export const toggleLikesMenu = numLikes => {
	DOMElems.likesMenu.style.visibility = (numLikes === 0) ? 'hidden' : 'visible';
}

export const renderLike = like => {
	const markup = `
		<li>
			<a class="likes__link" href="#${like.id}">
				<figure class="likes__fig">
					<img src="${like.img}" alt="${like.title}">
				</figure>
				<div class="likes__data">
					<h4 class="likes__name">${truncateRecipeTitle(like.title)}</h4>
					<p class="likes__author">${like.author}</p>
				</div>
			</a>
		</li>
	`;
	DOMElems.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = recipeId => {
	const like = DOMElems.likesList.querySelector(`a[href="#${recipeId}"]`).closest('li');
	if (like) like.parentElement.removeChild(like);
};





