const Organisation = require('../models/OrganisationModel');

exports.createOrganisation = async (req, res) => {
	try {
		await Organisation.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'organisation created successfully',
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
