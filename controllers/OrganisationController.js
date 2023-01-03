const Organisation = require('../models/OrganisationModel');

exports.createOrganisation = async (req, res) => {
	try {
		const data = await Organisation.create(req.body);
		console.log(data);
		res.status(200).json({
			status: 'success',
			message: 'organisation created successfully',
			id: data._id,
		});
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			// Duplicate username
			return res.status(422).send({
				status: 'fail',
				message: 'organisation already exist, find another name!',
			});
		}
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}
};
exports.getAllOrganisations = async (req, res) => {
	try {
		const organisations = await Organisation.find().populate({
			path: 'team.memberInfo',
			select: 'firstName lastName email',
		});

		res.status(200).json({
			status: 'success',
			result: organisations.length,
			data: organisations,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getUserOrganisations = async (req, res) => {
	try {
		const organisations = await Organisation.find({
			creatorId: req.params.id,
		}).populate({
			path: 'team.memberInfo',
			select: 'firstName lastName email',
		});

		res.status(200).json({
			status: 'success',
			result: organisations.length,
			data: organisations,
		});
	} catch (err) {
		console.log(err);
	}
};
