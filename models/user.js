let user = require('../data/user'); // fake db
module.exports = {
	getUserInfo() {
		return { ...user };
	},
	setUserInfo(data) {
		return (user = { ...data });
	}
};
