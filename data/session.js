let sessionUser = {
    username: null,
    password: null,
    logged: false
  };
  
module.exports = {
	getLoggedUser() {
		return { ...sessionUser };
	},
	setLoggedUser(data) {
		return (sessionUser = { ...data });
	}
};
