const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
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
		// number: {
		// 	type: Number,
		// 	required: true,
		// },
		// reference: {
		// 	type: String,
		// 	trim: true,
		// },
	},
	{ _id: false }
);

const pricingSchema = mongoose.Schema(
	{
		label: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		devise: {
			type: String,
		},
		value: {
			type: Number,
		},
	},
	{ _id: false }
);

const eventSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	coverPhoto: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: false,
	},
	eventCapacity: {
		type: Number,
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	isPosted: {
		type: Boolean,
		default: false,
		// required: true,
	},
	media: [
		{
			type: String,
			trim: true,
		},
	],
	location: {
		type: locationSchema,
		required: true,
	},
	eventEmail: {
		type: String,
		trim: true,
		required: true,
	},
	eventPhone: {
		type: String,
		trim: true,
		required: true,
	},
	pricing: [{ type: pricingSchema }],
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	},
	organiser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organisation',
	},
	creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
