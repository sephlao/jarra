module.exports = function filterUserData(u) {
	return u
		? {
				id: u._id,
				firstname: u.firstname,
				lastname: u.lastname,
				username: u.username,
				profpic: u.profpic,
				accountType: u.accountType,
				logged: true
		  }
		: null;
};
