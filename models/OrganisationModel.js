const mongoose = require('mongoose');

const adressSchema = mongoose.Schema(
	{
		country: {
			type: String,
			trim: true,
			default: 'DRC',
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		commune: {
			type: String,
			required: true,
			trim: true,
		},
		street: {
			type: String,
			required: true,
			trim: true,
		},
		// street: {
		// 	type: String,
		// 	required: true,
		// 	trim: true,
		// },
		// number: {
		// 	type: Number,
		// 	required: true,
		// },
	},
	{ _id: false }
);

const teamSchema = mongoose.Schema(
	{
		memberInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		memberRights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Right' }],
	},
	{ _id: false }
);

const organizationSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		profileImage: {
			type: String,
		},
		coverImage: {
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
		taxNumber: {
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
		team: [
			{
				type: teamSchema,
			},
		],
	},
	{ timestamps: true }
);

const Organisation = mongoose.model('Organisation', organizationSchema);
module.exports = Organisation;
