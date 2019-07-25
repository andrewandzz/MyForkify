import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { DOMElems, loader } from './views/base';
import './mathExtend';

/* Global state object
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/
const state = {
	prevQuery: ''
};



/*
	SEARCH CONTROLLER
*/
async function controlSearch() {
	// 1. get search query from searchView
	const query = searchView.getInput();

	// also ignore if query the same
	if (query && query !== state.prevQuery) {
		// 2. create new search object and add it to state
		state.search = new Search(query);
		state.prevQuery = query;

		// 3. prepare UI for results
		// 3.1 clear results list
		searchView.clearResults();
		// 3.2 show loader icon
		loader.render(DOMElems.resultsContainer);

		try {
			// 4. get recipes
			await state.search.getResults();

			// 5. render results on UI
			searchView.renderResults(state.search.results);
		} catch (error) {
			console.log(error);
			alert('Error searching qeury!');
		}
		// 5.1. remove loader icon
		loader.clear();
	}

	// 7. blur input field
	searchView.blurForm();
};



/*
	RECIPE CONTROLLER
*/
async function controlRecipe() {
	// 1. get recipe ID from the url
	const id = window.location.hash.slice(1);

	if (id) {
		// 2. create new recipe object and add it to state
		state.recipe = new Recipe(id);

		// 3. prepare the UI for changes
		recipeView.clearRecipe();
		// show loader icon
		loader.render(DOMElems.recipeContainer);

		// highlight selected
		searchView.highlightSelected(id);

		try {
			// 4. get recipe data
			await state.recipe.getRecipe();

			// parse ingredients
			state.recipe.parseIngredients();

			// 5. calculate time and servings
			state.recipe.calcTime();
			state.recipe.calcServings();

			// 6. render recipe
			recipeView.renderRecipe(
				state.recipe,
				state.likes.isLiked(id)
			);
			// remove loader icon
			loader.clear();
			
		} catch (error) {
			console.log(error);
			alert('Error loading recipe!');
		}
	}
}



/*
	LIST CONTROLLER
*/
function controlList() {
	// create a new list object if we don't have one yet
	if (!state.list) state.list = new List();

	// add each ingredient to the List and to the UI
	state.recipe.ingredients.forEach(ingredient => {
		const item = state.list.addItem(ingredient);
		listView.renderItem(item);
	});
}



/*
	LIKES CONTROLLER
*/
function controlLikes() {
	if (!state.likes.isLiked(state.recipe.id)) {
		// add liked recipe to the state
		const newLike = state.likes.addLike(state.recipe);

		// toggle the like button icon
		likesView.toggleLikeBtn(true);

		// add liked recipe to the UI
		likesView.renderLike(newLike);

	} else {
		// delete recipe from the state
		state.likes.deleteLike(state.recipe.id);
		
		// toggle the like button icon
		likesView.toggleLikeBtn(false);

		// delete recipe from the UI
		likesView.deleteLike(state.recipe.id);
	}

	likesView.toggleLikesMenu(state.likes.getNumLikes());
}

/*
	EVENT LISTENERS
*/
window.addEventListener('hashchange', controlRecipe);

window.addEventListener('load', controlRecipe);

DOMElems.searchForm.addEventListener('submit', event => {
	event.preventDefault();
	controlSearch();
});

DOMElems.resultsPages.addEventListener('click', event => {
	const button = event.target.closest('.btn-inline');
	if (button) {
		const page = parseInt(button.dataset.goto);
		searchView.clearResults();
		searchView.renderResults(state.search.results, page);
	}
});

// recipe increse or decrease servings buttons click handler
DOMElems.recipeContainer.addEventListener('click', event => {
	if (event.target.closest('.btn-decrease')) {
		// decriase servings
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (event.target.closest('.btn-increase')) {
		// increase servings
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (event.target.closest('.recipe__btn--add')) {
		// add ingredients to the shopping list
		controlList();
	} else if (event.target.closest('.recipe__love')) {
		// add the recipe to likes
		controlLikes();
	}
});

DOMElems.listList.addEventListener('click', event => {
	const id = event.target.closest('.shopping__item').dataset.itemid;

	if (event.target.matches('.shopping__delete, .shopping__delete *')) {
		// handle deleting an item
		state.list.deleteItem(id);
		listView.deleteItem(id);
	} else if (event.target.matches('.shopping__count--value')) {
		// handle updating the quantity
		state.list.updateItemQuantity(id, parseFloat(event.target.value, 10));
	}
});

// get liked recipes from the localStorage
window.addEventListener('load', () => {
	state.likes = new Likes();
	state.likes.readStorage();
	// likes menu button
	likesView.toggleLikesMenu(state.likes.getNumLikes());

	// render saved in the localStorage liked recipes
	state.likes.likesList.forEach(likesView.renderLike);
});







