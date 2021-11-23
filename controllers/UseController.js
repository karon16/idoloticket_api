/* eslint-disable no-unused-vars */
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
	try {
		const isUser = await User.findOne({ email: req.body.email });
		if (!isUser) {
			req.body.phone * 1;
			await User.create(req.body);
			res.status(200).json({
				status: 'success',
				message: 'user created successfully',
			});
		} else {
			res.status(409).json({
				status: 'Fail',
				message: 'user already exist',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email }).populate(
			'role',
			'label'
		);
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					res.status(401).json({
						status: 'Failure',
						message: 'Authentication failed',
					});
				} else if (result) {
					const token = jwt.sign(
						{ name: user.name, email: user.email, role: user.role },
						process.env.JWT_KEY,
						{ expiresIn: '2h' }
					);
					res.status(200).json({
						status: 'success',
						message: 'Authentcated successfully',
						token,
					});
				} else {
					res.status(401).json({
						status: 'Failure',
						message: 'Authentication failed',
					});
				}
			});
		} else {
			res.status(401).json({
				status: 'Failure',
				message: 'Authentication failed',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}
};
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json({
			status: 'success',
			result: users.length,
			data: users,
		});
	} catch (err) {
		console.log(err);
	}
};
