const Organisation = require('../models/Organisation');

exports.createOrganisation = async (req, res) => {
	try {
		await Organisation.create(req.body);
		res.status(200).json({
			status: 'success',
			message: 'organisation created successfully',
		});
	} catch (err) {
		res.status(404).json({
			status: 'error',
			message: err,
		});
	}
};
exports.getAllOrganisations = async (req, res) => {
	try {
		const organisations = await Organisation.find().populate({
			path: 'contributors.user',
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
