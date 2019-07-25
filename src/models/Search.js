import axios from 'axios';
import getPseudoRecipes from './pseudoResults'; // pseudo recipes
import { proxy, key } from '../config';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		try {
			const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
			//getPseudoRecipes(this.query);
			this.results = res.data.recipes;

		} catch (error) {}
		
	}
}