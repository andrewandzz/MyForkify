import axios from 'axios';
import getPseudoRecipe from './pseudoRecipe';
import { proxy, key } from '../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
			//getPseudoRecipe(this.id);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {}
	}

	calcTime() {
		const numOfIngred = this.ingredients.length;
		const periods = Math.ceil(numOfIngred / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		this.ingredients = this.ingredients.map(str => {
			let quantity 	= 1,
				unit 		= '',
				ingredient 	= '';

			str = str.toLowerCase();

			// 1. remove parenthesis
			str = str.replace(/\(.+\)\s/, '');


			// 2. find fraction (3/4, 1/2)
			let fraction = str.match(/\d*[\s-]?\d+\/\d+/);
			if (fraction) {
				// SET QUANTITY
				quantity = Math.fractionToNumber(fraction[0]);
				// remove fraction from the string
				str = str.replace(fraction[0], '').trim();
			} else {
				// exception when 2+, we just remove +
				str = str.replace(/(\d+)\+(?=\s)/, '$1');
				
				// 3. put number into the result array
				let number = str.match(/\d+.?\d*/);
				if (number) {
					// SET QUANTITY
					quantity = +number[0];
					// remove number from the string
					str = str.replace(number[0], '').trim();
				}
			}
			

			// 4. uniform units and save it in 'unit'
			const units = new Map();
			units.set(/\btablespoon(?:s)?\b/, 'tbsp');
			units.set(/\bteaspoon(?:s)?\b/, 'tsp');
			units.set(/\bounce(?:s)?\b/, 'oz');
			units.set(/\bcup(?:s)?\b/, 'cup');
			units.set(/\bpound(?:s)?\b/, 'pnd');
			units.set(/\bcan(?:s)?\b/, 'can');
			units.set(/\bslice(?:s)?\b/, 'slc');
			units.set(/\bquart(?:s)?\b/, 'qrt');
			units.set(/\bpackage(?:s)?\b/, 'pkg');
			units.set(/\bpinch(?:s)?\b/, 'pnch');
			units.set(/\bg\b/, 'g');
			units.set(/\bkg\b/, 'kg');


			for (let [key, value] of units) {
				if (str.search(key) !== -1) {
					unit = value;
					str = str.replace(key, '').trim();
					break;
				}
			}

			// SET INGREDIENT
			ingredient = str;

			return {quantity, unit, ingredient};
		});
	}

	updateServings(type) {
		// serveings
		const newServings = (type === 'inc') ? this.servings + 1 : this.servings - 1;
		
		// ingredients
		this.ingredients.forEach(ingredient => {
			// by default all the quantities are for 4 servings
			ingredient.quantity = ingredient.quantity / this.servings * newServings;
		});

		this.servings = newServings;
	}
}







