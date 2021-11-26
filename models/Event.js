const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
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
		reference: {
			type: String,
			trim: true,
		},
	},
	{ _id: false }
);

const pricingScheman = mongoose.Schema(
	{
		label: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		value: {
			type: Number,
		},
	},
	{ _id: false }
);

const eventSchema = mongoose.Schema({
	title: {
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
	coverPhotos: {
		type: String,
		required: true,
	},
	dates: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	eventCapacity: {
		type: Number,
		required: true,
	},
	time: [
		{
			startinTime: {
				type: String,
				required: true,
			},
			endingTime: {
				type: String,
				required: true,
			},
		},
	],
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
	pricing: [{ type: pricingScheman }],
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	},
	organiser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organisation',
	},
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
