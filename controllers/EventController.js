/* eslint-disable no-unused-vars */
const Event = require('../models/EventModel');

exports.createEvent = async (req, res) => {
	try {
		await Event.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'Event created successfully',
		});
	} catch (err) {
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}
};
exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find()
			.populate({ path: 'category', select: 'label description' })
			.populate({
				path: 'organiser',
				select: 'name profilePicture description',
			});

		res.status(200).json({
			status: 'success',
			result: events.length,
			data: events,
		});
	} catch (err) {
		console.log(err);
	}
};
