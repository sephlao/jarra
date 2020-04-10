// for general routes that require a user to be authenticated
const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) next();
	else res.redirect('/login');
};

// for routes only admin can access!
const isAdmin = (req, res, next) => {
	const { currentUser } = req.session;
	if (currentUser && currentUser.accountType === 'ADMIN') next();
	else res.redirect('/login');
};

module.exports = {
	isAuthenticated,
	isAdmin
};
