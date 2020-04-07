const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	birthday: {
		type: Date,
		required: false
	},
	phonenumber: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	accountType: {
		type: String,
		default: 'REGULAR'
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	}
});

userSchema.pre('save', function(next) {
	bcrypt
		.genSalt(10)
		.then(salt => {
			bcrypt
				.hash(this.password, salt)
				.then(hash => {
					this.password = hash;
					next();
				})
				.catch(er => console.error(`Error while hashing password ${err}`));
		})
		.catch(er => console.error(`Error while salthing${err}`));
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
