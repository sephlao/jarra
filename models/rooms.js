const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number
	},
	imgURL: {
		type: String
	},
	tag: {
		type: [String],
		default: 'NEW'
	},
	guest: {
		type: Number,
		default: 1
	},
	isAvailable: {
		type: Boolean,
		default: true
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	}
});

const RoomModel = mongoose.model('Room', roomSchema);

module.exports = RoomModel;
