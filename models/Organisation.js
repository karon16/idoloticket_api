const mongoose = require('mongoose');

const adressSchema = mongoose.Schema(
	{
		country: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		town: {
			type: String,
			required: true,
			trim: true,
		},
		quarter: {
			type: String,
			required: true,
			trim: true,
		},
		street: {
			type: String,
			required: true,
			trim: true,
		},
		number: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);

const contributorSchema = mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		rights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Right' }],
	},
	{ _id: false }
);

const organizationSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	profile_picture: {
		type: String,
	},
	cover_image: {
		type: String,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	phone: {
		type: Number,
		validate: {
			validator: function (v) {
				return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/g.test(
					v
				);
			},
			message: '{VALUE} is not a valid 12 digit number!',
		},
		required: true,
	},
	address: {
		type: adressSchema,
		required: true,
	},
	rccm: {
		type: String,
		required: true,
	},
	tax_number: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	ratings: {
		total: { type: Number },
		average: { type: Number },
	},
	contributors: [
		{
			type: contributorSchema,
		},
	],
});

const Organisation = mongoose.model('Organisation', organizationSchema);
module.exports = Organisation;
