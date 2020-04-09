const RoomModel = require('../models/rooms');

const getAllRooms = async () => await RoomModel.find();

const getAvailableRooms = async () => RoomModel.find({ isAvailable: true });

const getFeaturedRooms = async () => await RoomModel.find({ tag: 'FEATURED' });

const setNewRoom = async room => {
	try {
		return new RoomModel({ ...room }).save();
	} catch (err) {
		console.error(err); // to-do better error handling *error while updating
	}
};

const getRoomById = async id => await RoomModel.findById({ _id: id });

const updateRoom = async (id, data) => await RoomModel.updateOne({ _id: id }, { ...data });

const removeRoom = async id => await RoomModel.deleteOne({ _id: id });

module.exports = {
	getAllRooms,
	getFeaturedRooms,
	getAvailableRooms,
	setNewRoom,
	getRoomById,
	updateRoom,
	removeRoom
};
