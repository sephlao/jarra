module.exports = function filterUserData(u) {
	return {
		id: u._id,
		firstname: u.firstname,
		lastname: u.lastname,
		username: u.username,
		profpic: u.profpic,
		logged: true
	};
};
