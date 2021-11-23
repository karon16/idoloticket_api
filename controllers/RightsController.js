/* eslint-disable no-unused-vars */
const Right = require('../models/RightModel');

exports.createRight = async (req, res) => {
	try {
		await Right.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'right created successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getAllRights = async (req, res) => {
	try {
		const rights = await Right.find();
		res.status(200).json({
			status: 'success',
			result: rights.length,
			data: rights,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
