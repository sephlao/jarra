const filterUserData = u => {
	return u
		? {
				id: u._id,
				firstname: u.firstname,
				lastname: u.lastname,
				username: u.username,
				profpic: u.profpic,
				email: u.email,
				phonenumber: u.phonenumber,
				accountType: u.accountType,
				logged: true
		  }
		: null;
};

module.exports = filterUserData;
