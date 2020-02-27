const rooms = require('../data/rooms'); // fake db
module.exports = {
	getAllProducts() {
		return rooms.data;
	},
	getFeaturedProducts() {
		return rooms.data.slice(0, 3);
	}
};
