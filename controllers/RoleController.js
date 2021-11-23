/* eslint-disable no-unused-vars */
const Role = require('../models/Role');

exports.createRole = async (req, res) => {
	try {
		await Role.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'role created successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getAllRoles = async (req, res) => {
	try {
		const roles = await Role.find();
		res.status(200).json({
			status: 'success',
			result: roles.length,
			data: roles,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};
