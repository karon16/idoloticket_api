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

exports.getAllCategories = async (req, res) => {
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

exports.getEventCategories = async (req, res) => {
	try {
		const catagories = await Category.find({ type: 'event' });

		res.status(200).json({
			status: 'success',
			result: catagories.length,
			data: catagories,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getOrganisationCategorys = async (req, res) => {
	try {
		const catagories = await Category.find({ type: 'organisation' });

		res.status(200).json({
			status: 'success',
			result: catagories.length,
			data: catagories,
		});
	} catch (err) {
		console.log(err);
	}
};
