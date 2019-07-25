export default class Likes {
	constructor() {
		this.likesList = [];
	}

	addLike(recipe) {
		const newLike = {
			id: recipe.id,
			title: recipe.title,
			img: recipe.img,
			author: recipe.author
		};

		this.likesList.push(newLike);

		// add like to the localStorage
		this.persistData();

		return newLike;
	}

	deleteLike(recipeId) {
		const index = this.likesList.findIndex(recipe => recipe.id === recipeId);
		this.likesList.splice(index, 1);

		// delete like from the localStorage
		this.persistData();
	}

	isLiked(recipeId) {
		return this.likesList.findIndex(recipe => recipe.id === recipeId) !== -1;
	}

	getNumLikes() {
		return this.likesList.length;
	}

	persistData() {
		localStorage.setItem('likes', JSON.stringify(this.likesList));
	}

	readStorage() {
		const storage = JSON.parse(localStorage.getItem('likes'));

		// update likes data from
		if (storage) this.likesList = storage;
	}
}









