/* eslint-disable no-unused-vars */
const Category = require('../models/CategoryModel');

exports.createCategory = async (req, res) => {
	try {
		await Category.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'category created successfully',
		});
	} catch (err) {
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}
};

exports.getAllCategorys = async (req, res) => {
	try {
		const catagories = await Category.find();

		res.status(200).json({
			status: 'success',
			result: catagories.length,
			data: catagories,
		});
	} catch (err) {
		console.log(err);
	}
};
