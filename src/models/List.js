import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(item) {
		const newItem = {
			id: uniqid(),
			quantity: item.quantity,
			unit: item.unit,
			ingredient: item.ingredient
		};
		this.items.push(newItem);
		return newItem;
	}

	deleteItem(id) {
		const index = this.items.findIndex(item => item.id === id);

		this.items.splice(index, 1);
	}

	updateItemQuantity(id, newQuantity) {
		this.items.find(item => item.id === id).quantity = newQuantity;
	}
}