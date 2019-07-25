const result = {
	data: {
		recipe: {
			publisher: "All Recipes",
			f2f_url: "http://food2fork.com/view/29159",
			ingredients: [
				"1 pound shredded, cooked chicken",
				"1 (15 ounce) can whole peeled tomatoes, mashed",
				"1-1/2 (10 ounce) can enchilada sauce",
				"1 pinch of red pepper flakes",
				"1 medium onion, chopped",
				"1 can chopped green chile peppers",
				"2 cloves garlic, minced",
				"2 cups water",
				"1 (14.5 ounce) can chicken broth",
				"2 3/4 teaspoons cumin",
				"1 teaspoon chili powder",
				"1 teaspoon salt",
				"1/4 teaspoon black pepper",
				"1 ounces bay leaf",
				"1 (10 ounce) package frozen corn",
				"1 tablespoon chopped cilantro",
				"7 corn tortillas",
				"2+ jalapeno peppers, diced",
				"2 teaspoons to 4 teaspoons sugar",
				"vegetable oil"],
			source_url: "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
			recipe_id: "29159",
			image_url: "http://static.food2fork.com/19321150c4.jpg",
			social_rank: 100,
			publisher_url: "http://allrecipes.com",
			title: "Slow Cooker Chicken Tortilla Soup"
		}
	}
};




export default function(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({id, ...result});
		}, 1000);
	});
}